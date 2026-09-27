import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { email, order } = await request.json();
    const resendKey = Deno.env.get('RESEND_API_KEY');
    const fromEmail = Deno.env.get('ORDER_EMAIL_FROM');
    if (!resendKey || !fromEmail) throw new Error('Missing RESEND_API_KEY or ORDER_EMAIL_FROM');
    if (!email || !order?.id) throw new Error('Email and order are required');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: fromEmail,
        to: [email],
        subject: `Order confirmed - ${order.id}`,
        html: `<h2>Thank you for your order</h2><p>Your order <strong>${order.id}</strong> has been received.</p><p>Total: Rs ${Number(order.total).toLocaleString('en-PK')}</p><p>Payment method: Cash on Delivery</p>`,
      }),
    });
    if (!response.ok) throw new Error(await response.text());

    return new Response(JSON.stringify({ sent: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Email failed' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
