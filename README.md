# RSB Legal Associates & Consultants

The firm's informational website and consultation enquiry frontend, originally generated with [Lovable](https://lovable.dev/projects/2a771b94-f1c5-43f3-861f-8749b3fcb3f9).

Built with React 19, TypeScript, TanStack Start/Router, Vite and Tailwind CSS 4. TanStack Start provides SSR; do not treat this as a plain static Vite application. The Lovable Vite configuration supplies the framework plugins.

## Development

Use a recent Node.js release compatible with Vite 8 and Bun for the committed lockfile:

```sh
bun install --frozen-lockfile
bun run dev
bun run test
bunx tsc --noEmit
bun run lint
bun run build
```

`npm run` also runs the scripts after dependencies are installed. Dependency changes are recorded in `bun.lock` and `package-lock.json`.

Pages live in `src/routes/`; shared site components live in `src/components/site/`. Edit firm content in `src/lib/site.ts`. `src/routeTree.gen.ts` is generated automatically. The logo and available team portraits are local assets extracted from the supplied source document; the intern's photograph remains unavailable.

See [the Phase 1 audit](docs/phase-1-audit.md) for findings, implementation details and remaining decisions. Consultation requests support the two Cal.com embeds as well as telephone/email. See [Cal.com setup and verification](docs/calcom-booking.md), especially the required manual-confirmation dashboard settings. Verified Maps links and deployment remain later work. Legal drafts and firm content require approval before publication.

Commits pushed to the connected branch sync with Lovable. Preserve published Git history and keep that branch working.
