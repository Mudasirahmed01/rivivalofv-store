import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { email, orderId } = await request.json();
    const resendKey = Deno.env.get('RESEND_API_KEY');
    const fromEmail = Deno.env.get('ORDER_EMAIL_FROM') || Deno.env.get('EMAIL_FROM');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!resendKey || !fromEmail || !supabaseUrl || !serviceRoleKey) throw new Error('Missing Resend sender or Supabase server configuration');
    if (typeof email !== 'string' || typeof orderId !== 'string') throw new Error('Email and order ID are required');

    const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id, customer_email, items, subtotal, discount, shipping, tax, total, payment_method')
      .eq('id', orderId)
      .maybeSingle();
    if (orderError) throw orderError;
    if (!order || order.customer_email?.toLowerCase() !== email.trim().toLowerCase()) {
      return new Response(JSON.stringify({ error: 'Order not found for this email.' }), { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const escapeHtml = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[character] || character));
    const itemRows = (Array.isArray(order.items) ? order.items : []).map((item: any) => {
      const title = escapeHtml(item.product?.title || item.title || 'Item');
      const quantity = Number(item.quantity) || 1;
      const size = item.selectedSize ? ` · Size ${escapeHtml(item.selectedSize)}` : '';
      const unitPrice = Number(item.product?.price ?? item.price) || 0;
      return `<tr><td style="padding:12px 0;border-bottom:1px solid #e8e8e8">${title}${size}</td><td style="padding:12px 0;border-bottom:1px solid #e8e8e8;text-align:center">${quantity}</td><td style="padding:12px 0;border-bottom:1px solid #e8e8e8;text-align:right">Rs ${(unitPrice * quantity).toLocaleString('en-PK')}</td></tr>`;
    }).join('');
    const orderNumber = escapeHtml(order.id);
    const total = Number(order.total) || 0;
    const paymentMethod = escapeHtml(order.payment_method || 'Cash on delivery');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: fromEmail,
        to: [order.customer_email],
        subject: `Order confirmed | REVIVAL OF V #${orderNumber}`,
        html: `<div style="margin:0;background:#f5f5f3;padding:32px 12px;font-family:Arial,sans-serif;color:#171717"><div style="max-width:600px;margin:auto;background:#fff;padding:32px"><p style="font-size:12px;letter-spacing:3px;font-weight:bold">REVIVAL OF V</p><h1 style="font-size:24px;margin:28px 0 8px">Thank you for your order.</h1><p style="color:#666">We have received your order and will prepare it shortly.</p><p style="margin:24px 0"><strong>Order #${orderNumber}</strong></p><table style="width:100%;border-collapse:collapse;font-size:14px"><thead><tr><th style="text-align:left;padding:10px 0">Item</th><th>Qty</th><th style="text-align:right">Price</th></tr></thead><tbody>${itemRows}</tbody></table><div style="margin-top:20px;text-align:right"><p>Subtotal: Rs ${(Number(order.subtotal) || 0).toLocaleString('en-PK')}</p><p>Shipping: Rs ${(Number(order.shipping) || 0).toLocaleString('en-PK')}</p><p>Tax: Rs ${(Number(order.tax) || 0).toLocaleString('en-PK')}</p><p style="font-size:18px;font-weight:bold">Total: Rs ${total.toLocaleString('en-PK')}</p></div><p style="margin-top:24px;color:#666">Payment: ${paymentMethod}</p><p style="margin-top:28px;color:#666;font-size:13px">Need help? Reply to this email and our team will assist you.</p></div></div>`,
      }),
    });
    if (!response.ok) throw new Error(await response.text());

    return new Response(JSON.stringify({ sent: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Email failed' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
