# Cal.com consultation booking

The `/consultation` page embeds the firm's two supplied events using `@calcom/embed-react` 1.5.3. The package supports React 19. No appointment API, database, credentials or custom confirmation flow is introduced.

## Event configuration

| Option                       | Duration   | Event URL                                                  |
| ---------------------------- | ---------- | ---------------------------------------------------------- |
| Online Legal Consultation    | 30 minutes | https://cal.com/labrat-pkwb0d/online-legal-consultation    |
| In-Person Legal Consultation | 30 minutes | https://cal.com/labrat-pkwb0d/in-person-legal-consultation |

Edit the event definitions in `src/lib/appointments.ts` if the supplied URLs change. Both public pages returned HTTP 200 during implementation. The online event displayed Cal Video; the in-person event displayed the Fort office address.

## Important dashboard settings

**Both public events exposed `requiresConfirmation: false` during live inspection on 24 October 2026.** Their descriptions mention firm confirmation, but descriptions do not enforce it. No dashboard settings were changed by this integration.

Before using the website for manual appointment requests, the account owner must:

1. Open each event in Cal.com, go to Advanced settings, enable **Requires Confirmation**, configure it for every request rather than only a notice-window condition, and save. Do this separately for both events. Follow [Cal.com's official setup guide](https://cal.com/blog/reclaim-your-time-setting-up-requires-confirmation-in-cal-com).
2. Verify the host/availability timezone is **Asia/Kolkata**, and that the working schedule matches Monday–Saturday, 10:30 a.m.–7:30 p.m. IST. Cal.com may display converted times in the visitor's timezone; the website does not override that choice.
3. Verify 30-minute duration, lead time, buffers and connected calendars for conflict checking.
4. Confirm Cal Video/joining instructions for the online event, and the exact Fort office address for the in-person event.
5. Replace the public organizer name **Labrat** and its avatar with approved firm branding in Cal.com. The website does not rewrite provider-controlled identity.
6. Keep booking questions minimal and avoid requesting sensitive case information.
7. Check request-received, approval, rejection and cancellation/rescheduling emails and links. Use the firm's own test booking to verify that requests stay pending until approved and that both parties receive the intended status messages. No booking was submitted during implementation.

The site describes the firm's intended confirmation policy, and leaves actual status and emails to Cal.com. It does not claim that a slot selection is a confirmed consultation. There is no custom success handler: Cal.com's `bookingSuccessfulV2` event can represent an unconfirmed booking, as described in [the official event reference](https://cal.com/help/embedding/embed-events).

## Frontend implementation

- `appointment-booking.tsx`: reuses the existing Radix tabs and design tokens for responsive appointment cards. Selection supports pointer and keyboard input, keeps focus on the selected control, and pairs each active calendar with its exact external URL.
- TanStack Router's `ClientOnly` plus React lazy loading and Suspense defer the browser-dependent component until after hydration. Other pages do not initialize Cal.com.
- `cal-booking-embed.tsx`: isolates each mounted calendar with a unique namespace, applies light/navy provider theming, and subscribes to the documented `linkReady` and `linkFailed` events. Subscriptions and timers are cleaned up on unmount.
- The calendar uses the provider's automatic height adjustments rather than clipping the form or imposing a large fixed iframe height. Narrow screens naturally stack the provider's calendar and slot list.
- A scoped observer supplies a descriptive iframe title because this SDK version honors `iframeAttrs.id` but otherwise uses a generic frame title.
- Loading guidance changes after 15 seconds when a script is blocked or slow. Late readiness is still accepted. Provider load/render failures retain the direct booking link, and both event URLs are available without JavaScript.
- Existing telephone/email alternatives, office hours, fees, SEO and navigation remain available. Rescheduling guidance now mentions provider email links when available as well as direct contact.

## Verification

- `npm test`: 19 passing tests, including six focused booking tests covering SSR, both exact event/fallback URLs, switching back and forth, keyboard selection, provider failures and stalled-load recovery/cleanup.
- `npx tsc --noEmit`: passes.
- `npm run lint`: zero errors; six existing Fast Refresh export warnings in generated UI components.
- `npm run build`: passes for the existing TanStack Start/Nitro Cloudflare target.
- Real Chromium checks loaded both events at 1440, 768, 375 and 320 pixels. Neither the parent page nor the embedded page overflowed horizontally.
- Live checks covered correct event/fallback pairs, descriptive iframe titles, keyboard selection, repeated navigation away/back, JavaScript-disabled links and blocked-script guidance. No page errors were recorded.
- Both public event flows were checked through slot selection and the details form, then returned using Back without entering information or submitting a request.
- Approval emails, final booking status and cancellation/rescheduling after submission require an owner-run test once the dashboard configuration is corrected.
