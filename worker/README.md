# BrindleWood forms Worker

Takes a form from the website, checks it is a person (Cloudflare Turnstile) and posts it to a
private Discord staff channel. It stores nothing, so there is nothing to maintain.

## One-time setup (about 15 minutes)

1. **Discord:** in a private staff channel, open *Edit Channel > Integrations > Webhooks > New Webhook*
   and copy the webhook URL. Treat it like a password.
2. **Cloudflare > Turnstile:** add a site for `brindlewood.net`. Copy the **site key** (public) and
   the **secret key** (private).
3. **Cloudflare > Workers & Pages > Create > Worker.** Name it `brindlewood-forms`, deploy, then
   *Edit code*, paste in `index.js` from this folder and deploy.
4. In the Worker, *Settings > Variables and Secrets*:
   - Text: `ALLOWED_ORIGINS` = `https://brindlewood.net`
   - Secret: `TURNSTILE_SECRET` = the Turnstile secret key
   - Text: `DISCORD_THREAD_ID` = the forum post's ID (only if the channel is a forum)
   - Secret: `DISCORD_WEBHOOK_URL` = the webhook URL
5. Optional: *Settings > Domains and Routes* > add `forms.brindlewood.net`.
6. In `src/content/site.json` set `formsUrl` to the Worker address and `turnstileSiteKey` to the site key.
   Until both are set, the Contact page tells visitors to use Discord.

## Changing the forms

The fields are listed in `src/content/forms.ts` (what visitors see) and in `index.js` (what the
Worker accepts). Change both together.

## Testing

`node worker/test.mjs`
