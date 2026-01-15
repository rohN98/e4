# SOP: Essential OS Execution (v4.0.7)

## Phase 1: Hosting on GitHub Pages
1. Ensure all files are in the repository root.
2. In GitHub Settings > Pages, ensure the source is set to "Deploy from a branch" (usually `main`).
3. **CRITICAL**: Because GitHub uses subdirectories (e.g., `rohn98.github.io/E2/`), the `start_url` in `manifest.json` MUST be `./index.html`.

## Phase 2: PWABuilder Eligibility
1. Open [PWABuilder.com](https://www.pwabuilder.com).
2. Enter your URL: `https://rohn98.github.io/E2/`.
3. If validation fails:
   - Check if `icon.jpg` is exactly 512x512.
   - Check if `sw.js` is loading (Network tab in DevTools).
4. Click **"Package for Store"** -> **"Android"**.

## Phase 3: Solving "Stuck on Loading"
- If the screen doesn't clear, check the **Debug Console** at the bottom of the screen.
- If it says `ERR: ...`, it means a dependency (like React) failed to load from the CDN.
- Clear your browser cache and refresh.