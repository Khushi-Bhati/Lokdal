# TODO

## Current issue: Build EPERM unlink on .next/server

- [ ] Identify why `.next/server/app/api/contact-requests` is being deleted while still locked (dev server running, parallel build, Windows/OneDrive lock).
- [ ] Check currently configured Next scripts (dev/build) and ensure only one Next process is running.
- [ ] Provide a safe clean strategy: stop Next processes, kill stray node processes, remove `.next` with retries, then re-run `npm run build`.
- [ ] If still failing, change Next config to disable incremental builds (set `incremental: false`) and/or adjust output directory to reduce lock conflicts.
- [ ] If location is the root cause: move project out of OneDrive and rerun build.
- [ ] Re-run build and confirm error is gone.

