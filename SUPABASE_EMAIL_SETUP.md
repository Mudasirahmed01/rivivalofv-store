# Order Email Notifications

Deploy the Supabase Edge Function:

```bash
supabase functions deploy order-confirmation
supabase secrets set RESEND_API_KEY=re_xxx ORDER_EMAIL_FROM="REVIVAL OF V <orders@your-domain.com>"
```

The frontend calls the function after an order is saved. If email delivery fails, the order remains successful and the failure is logged.

For production, verify the sending domain in Resend and use a real `ORDER_EMAIL_FROM` address. Never put `RESEND_API_KEY` in Vite `.env` or browser code.
