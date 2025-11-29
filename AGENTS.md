# Repository Guidelines

## Project Structure & Module Organization

- `src/` holds the app code: `pages/` for routed views, `components/` and `ui-fragments/` for shared UI, `hooks/` and `context/` for state, `utils/` for helpers, and `assets/` for static media.
- `public/` serves static files; `build/` is generated output.
- Testing files live alongside code as `*.test.js`; snapshot artifacts live in `__snapshots__/`.

## Build, Test, and Development Commands

- `npm start` (or `yarn start`): run the app locally via CRACO at http://localhost:3000.
- `npm run build`: production bundle into `build/` using `craco.config.js` overrides.
- `npm test`: Jest in watch mode with React Testing Library setup (`src/setupTests.js`).
- `npm run lint`: ESLint with project rules; auto-fixes common issues.

## Coding Style & Naming Conventions

- JavaScript/React with 2-space indentation, trailing commas per Prettier (enforced via lint-staged on commit).
- Prefer functional components and React Hooks; place component files in `PascalCase` (e.g., `Card.js`), utilities in `camelCase`.
- Prefer functional programming approach.
- Tailwind is enabled through PostCSS 7 compat; keep design tokens in `tailwind.config.js` and `theme.js`. Use CSS-in-JS (`@emotion`) only when utility classes are insufficient.
- Keep module paths aligned with `jsconfig.json` base paths; avoid deep relative imports when an alias exists.

## Testing Guidelines

- Use Jest + React Testing Library (`@testing-library/react`) for UI and sinon for isolated logic when needed.
- Name tests after the unit under test (`Component.test.js`, `utility.test.js`); co-locate with implementation.
- For UI, prefer behavior-focused assertions (role/text queries) and snapshot tests only for stable visual shells.
- Run `npm test` before pushing; add coverage for new branches and error paths.

## Commit & Pull Request Guidelines

- Commit messages follow the existing style: short imperative lines, optional scopes (`feat(scope): ...`, `fix(scope): ...`).
- Before opening a PR, ensure `npm test` and `npm run lint` pass and the app builds.
- PRs should include a concise summary, linked issue or task ID, and screenshots/GIFs for UI changes. Mention any new env vars or config steps in the description.

## Environment & Tooling Notes

- Install dependencies with `npm ci` for reproducible builds (lockfile is present). Run `npm run prepare` once to enable Husky hooks locally.
- Store environment variables in a `.env` file (not committed); check existing `.env` references before adding new keys.
