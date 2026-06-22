# TODO

## Upcoming events cards: different images
- [ ] Understand how events are fetched and where images are rendered (upcoming-events page + UpcomingEventsSection/UpcomingEvents).
- [ ] Decide strategy: prefer `event.image` from DB; if missing, assign distinct fallback images per card.
- [ ] Implement mapping for fallback images (use a rotating list of `/assets/*.jpg` paths).
- [ ] Ensure Next/Image works (provide string paths; handle empty/undefined).
- [ ] Update any additional upcoming events UI that currently reuses a single fallback.
- [ ] Run `npm run lint` and `npm run build` (or `next dev` sanity check).

