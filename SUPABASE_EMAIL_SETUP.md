# REVIVAL OF V Email Setup

The storefront uses Supabase Auth for account emails and Supabase Edge Functions plus Resend for transactional emails. Keep all Resend credentials on Supabase; do not put them in the Vite `.env` or Vercel frontend variables.

## 1. Verify the sending domain in Resend

1. Create a Resend account and add a domain you control.
2. Add the DNS records Resend provides and wait until the domain is verified.
3. Create a Resend API key with permission to send email.
4. Choose sender addresses on that verified domain, for example `orders@your-domain.com` and `news@your-domain.com`.

## 2. Configure Supabase Auth email delivery

In Supabase Dashboard, open **Authentication -> SMTP Settings** and enable custom SMTP:

- Host: `smtp.resend.com`
- Port: `465` (or `587` with STARTTLS)
- Username: `resend`
- Password: your Resend API key
- Sender email: an address on the verified domain
- Sender name: `REVIVAL OF V`

Then open **Authentication -> URL Configuration**:

- Set **Site URL** to the deployed storefront origin, such as `https://your-store-domain.com`.
- Add the deployed storefront origin to **Redirect URLs**.
- For local development, also allow `http://localhost:5173/**`.

The forgot-password form calls Supabase `resetPasswordForEmail`. The reset email link redirects to `/?auth=reset-password`; the storefront then accepts the recovery session and lets the customer set a new password. You can customize the recovery email subject and body under **Authentication -> Email Templates -> Reset Password**. Use Supabase's `{{ .ConfirmationURL }}` link in that template.

## 3. Deploy order and newsletter email functions

From the project root, link the Supabase CLI to project `fgcizeertupxnmpediic` if it is not linked already, then set the Resend secrets and deploy both functions:

```sh
supabase link --project-ref fgcizeertupxnmpediic
supabase secrets set RESEND_API_KEY=re_xxx EMAIL_FROM="REVIVAL OF V <hello@your-domain.com>" ORDER_EMAIL_FROM="REVIVAL OF V <orders@your-domain.com>" NEWSLETTER_EMAIL_FROM="REVIVAL OF V <news@your-domain.com>"
supabase functions deploy order-confirmation
supabase functions deploy newsletter-welcome
```

`order-confirmation` reads the saved order from Supabase and checks that the supplied email matches the order before sending. `newsletter-welcome` checks that an active consent record exists before sending. If delivery fails, order placement or saved newsletter consent remains successful; the browser logs the email function error.

Supabase Edge Functions provide `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in their runtime. Do not copy the service role key into frontend configuration or expose it to customers.

## 4. Test the three email flows

1. Request a password reset from the storefront sign-in page and open the email link on the deployed or allowed local origin.
2. Submit the newsletter form after checking its consent checkbox; a new subscriber receives a welcome email.
3. Place a test order using an inbox you control; order confirmation is sent to the checkout email.

Check **Supabase -> Edge Functions -> Logs** and **Resend -> Emails** if a message does not arrive. Also check spam and confirm the sender domain is verified.
