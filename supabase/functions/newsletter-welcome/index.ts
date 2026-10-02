import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { email } = await request.json();
    const resendKey = Deno.env.get('RESEND_API_KEY');
    const fromEmail = Deno.env.get('NEWSLETTER_EMAIL_FROM') || Deno.env.get('EMAIL_FROM');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!resendKey || !fromEmail || !supabaseUrl || !serviceRoleKey) throw new Error('Missing Resend sender or Supabase server configuration');
    if (typeof email !== 'string' || !email.includes('@')) throw new Error('A valid email is required');

    const normalizedEmail = email.trim().toLowerCase();
    const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
    const { data: subscriber, error: subscriberError } = await supabase
      .from('newsletter_subscribers')
      .select('email, consent, unsubscribed_at')
      .eq('email', normalizedEmail)
      .maybeSingle();
    if (subscriberError) throw subscriberError;
    if (!subscriber?.consent || subscriber.unsubscribed_at) {
      return new Response(JSON.stringify({ error: 'Active newsletter consent was not found.' }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: fromEmail,
        to: [normalizedEmail],
        subject: 'Welcome to REVIVAL OF V',
        html: '<div style="margin:0;background:#f5f5f3;padding:32px 12px;font-family:Arial,sans-serif;color:#171717"><div style="max-width:600px;margin:auto;background:#fff;padding:32px"><p style="font-size:12px;letter-spacing:3px;font-weight:bold">REVIVAL OF V</p><h1 style="font-size:24px;margin:28px 0 8px">You are on the list.</h1><p style="color:#666;line-height:1.7">Thanks for subscribing. We will send occasional product news and special offers to this address.</p><p style="margin-top:28px;color:#777;font-size:12px">You are receiving this because you explicitly subscribed on our website.</p></div></div>',
      }),
    });
    if (!response.ok) throw new Error(await response.text());

    return new Response(JSON.stringify({ sent: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Email failed' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
