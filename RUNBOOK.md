# Waitlist Function Runbook

## Rotate secrets
```bash
firebase functions:secrets:set SENDGRID_API_KEY
firebase functions:secrets:set MAIL_FROM --data="no-reply@snaggle.fun"
firebase functions:secrets:set MAIL_ADMIN --data="ralphiezagha1@gmail.com"
```

## Check logs
In Firebase console → Functions → `joinWaitlist` → Logs.
Filter for `waitlist_join` or `waitlist_join_error`. No full emails are logged.

## Purge CDN (if Cloudflare in front of Hosting)
Purge `/` and `/index.html` if needed.

## Rollback hosting
Firebase console → Hosting → Releases → Rollback to working release.

## Redeploy
```bash
firebase deploy --only functions:joinWaitlist,hosting
```

## Tag the good commit
```bash
git tag waitlist-ok-$(date +%Y%m%d)
git push --tags
```