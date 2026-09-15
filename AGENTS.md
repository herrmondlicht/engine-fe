# engine-fe contributor guide

## Scope and stack

This repository is the Engine web client. It is a React 16 application built with CRACO, React Router v5, Tailwind PostCSS 7 compatibility, Emotion, SWR, and Jest/React Testing Library. Use npm and the committed `package-lock.json`.

## Repository layout

- `src/index.js` is the browser entry point. `src/App.js` installs the router and global providers.
- `src/appRoutes.js` defines the application route metadata. Route screens live in `src/pages/`.
- `src/components/` holds domain-level reusable components; `src/ui-fragments/` holds shared primitive UI elements.
- `src/hooks/` contains reusable behavior, and `src/context/` contains providers and shared state.
- `src/utils/engineAPI/` creates API clients. `src/utils/` also contains storage, validation, formatting, and route helpers.
- `src/test-utils/` provides shared test helpers. Tests are co-located as `*.test.js`; snapshots are in `__snapshots__/` directories.
- `src/theme.js`, `tailwind.config.js`, and `src/index.css` define the visual system. Static assets are in `src/assets/` and `public/`.

`jsconfig.json` sets `src` as the import base. Prefer its existing aliases such as `components`, `pages`, `context`, and `utils` over deep relative imports.

## Setup and development

1. Install dependencies with `npm ci`.
2. Copy `.env.example` to `.env` and set `REACT_APP_API_SERVICE` to the target API base URL. Browser-exposed CRA variables must use the `REACT_APP_` prefix; do not place secrets in them.
3. Start the development server with `npm start` and open the URL printed by CRACO (normally `http://localhost:3000`).

The API client adds the stored bearer token for protected resources and redirects to `/login` for the configured authentication error. Keep API route definitions and the client behavior aligned with the backend contract.

## Code conventions

- Use functional components and hooks, following the existing JavaScript and 2-space formatting style.
- Name React component files in `PascalCase`; name hooks with a `use` prefix and utilities in `camelCase`.
- Use Tailwind utilities and the shared Tailwind/theme tokens first. Use Emotion when the existing utility and token approach cannot express the required styling.
- Keep route definitions in `src/appRoutes.js`, use the existing providers for cross-cutting state, and preserve the established `AuthorizedRoute` behavior for protected screens.
- ESLint uses React recommendations, Google style, and Prettier. The hooks exhaustive-dependencies rule is an error; resolve dependency issues instead of suppressing them without a clear reason.

## Architecture: dependency injection and SOLID

- Preserve the factory-based injection pattern for code that depends on APIs, storage, browser services, or other collaborators. Existing examples include `createLogin(engineAPI, storageAPI)`, `createCustomerCarList({ engineAPI })`, and `createStorageAPI(storage)`.
- Export the factory or creator so tests and callers can supply stubs, then create the production default with real dependencies in the same module or a composition boundary. Avoid burying replaceable dependencies in module-level state.
- Keep React components and hooks focused on presentation, interaction, or one piece of application behavior. Put transport and persistence behind injected API or storage collaborators; avoid direct Axios, `window`, or storage access in code that should be independently testable.
- Use Context for scoped UI state and provider composition, not as a catch-all service locator. When a provider is needed, keep its contract narrow and include it in `App.js` and `test-utils/renderWithProviders.js` as appropriate.
- Depend on the smallest interface needed by a component or hook. Prefer composing small creators and hooks over broad utilities, inheritance-like abstractions, or condition-heavy components.
- In tests, inject API/storage stubs and use the shared provider renderer where needed. Test observable behavior instead of implementation details.

## Tests and checks

- Add or update behavior-focused React Testing Library tests beside the affected code. Query by role, label, or visible text where practical.
- Run a focused test with `CI=true npm test -- --watchAll=false path/to/file.test.js`.
- Run the full test suite without watch mode with `CI=true npm test -- --watchAll=false`.
- Run `npm run build` for changes that could affect the production bundle or configuration.
- `npm run lint` runs ESLint with `--fix` and can modify files. Use it deliberately and review its diff. For a non-mutating lint check, run `npx eslint ./src`.

Husky runs `lint-staged` on commits, applying Prettier and ESLint fixes to staged JavaScript files. Review the resulting changes before committing.

## Change discipline

Keep UI changes accessible and responsive, and update snapshots only when the rendered change is intentional. Do not commit `.env` files, credentials, or generated `build/` output. Before handoff, run the smallest relevant test or check and note any validation that requires a running API or browser-based manual verification.
