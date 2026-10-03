<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Running here (Base44 dev environment)

The app runs through `docker-compose.base44.yml`: one `node:22` service, the repo
bind-mounted at `/app`, `npm ci` on startup, then `next dev` on port 3000.

```bash
docker compose -f docker-compose.base44.yml up -d      # start
docker compose -f docker-compose.base44.yml logs -f web # watch the dev server
```

Notes that are not obvious from the manifests:

- There is no backend, database or external service, and no environment
  variables are required to run. Nothing here needs credentials.
- `next dev` writes and re-adds the `nextjs-agent-rules` block at the top of this
  file. Keep it; content below it is preserved.
- Next.js 16 blocks dev assets and HMR from origins other than `localhost`, so
  the preview origin is allowed in `next.config.ts` via `allowedDevOrigins`,
  built from `BASE44_PUBLIC_HOST_SUFFIX` (passed into the service by compose).
  If the preview loads but hot reload never fires, check for "Blocked
  cross-origin request" in the service logs first.
- `NODE_ENV` must not be `production` in the service, or Next skips dev mode.
- The container healthcheck fetches `/` with Node's built-in `fetch`; the
  `node:22` image has no curl or wget.
