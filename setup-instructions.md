# Project Setup Instructions: shadcn, Tailwind, & TypeScript

This document outlines the steps required to configure TypeScript, Tailwind CSS, and shadcn CLI in this project, and explains the folder structures.

---

## 1. Establishing Tailwind CSS Support
The current project has Tailwind CSS v4 configured via `@tailwindcss/vite` plugin.
If starting from scratch or re-installing:
1. Install Tailwind package and Vite plugin:
   ```bash
   npm install tailwindcss @tailwindcss/vite
   ```
2. Add the plugin to your `vite.config.js` or `vite.config.ts`:
   ```javascript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import tailwindcss from '@tailwindcss/vite'

   export default defineConfig({
     plugins: [react(), tailwindcss()],
   })
   ```
3. Import Tailwind in your entry CSS file (`src/index.css`):
   ```css
   @import "tailwindcss";
   ```

---

## 2. Enabling TypeScript Support
Vite parses `.ts` and `.tsx` files natively, but to gain type checking, editor support, and compiler validations, install TypeScript:

1. Install TypeScript and typing definitions:
   ```bash
   npm install -D typescript @types/react @types/react-dom @types/node
   ```
2. Create the TypeScript configuration files in the root:
   
   **`tsconfig.json`**:
   ```json
   {
     "compilerOptions": {
       "target": "ES2022",
       "useDefineForClassFields": true,
       "lib": ["DOM", "DOM.Iterable", "ES2022"],
       "module": "ESNext",
       "skipLibCheck": true,

       /* Bundler mode */
       "moduleResolution": "bundler",
       "allowImportingTsExtensions": true,
       "resolveJsonModule": true,
       "isolatedModules": true,
       "noEmit": true,
       "jsx": "react-jsx",

       /* Linting */
       "strict": true,
       "noUnusedLocals": true,
       "noUnusedParameters": true,
       "noFallthroughCasesInSwitch": true,

       /* Path Aliasing */
       "baseUrl": ".",
       "paths": {
         "@/*": ["./src/*"]
       }
     },
     "include": ["src"]
   }
   ```

3. Update files to `.ts`/`.tsx` extensions, and run verification:
   ```bash
   npx tsc --noEmit
   ```

---

## 3. Configuring shadcn CLI
shadcn/ui provides highly customizable UI primitives directly into your codebase. To initialize:

1. Run the shadcn init command:
   ```bash
   npx shadcn@latest init
   ```
2. During initialization, select the following configuration values:
   - **Style**: Default
   - **Base color**: Slate / Zinc / Neutral (we use a custom dark theme)
   - **CSS variables for colors**: Yes
   - **Tailwind CSS config file**: (N/A for Tailwind v4, CLI detects Vite integration)
   - **Import alias for components**: `@/components`
   - **Import alias for utils**: `@/lib/utils`

This creates a `components.json` configuration file at the root.

---

## 4. Importance of the `/components/ui` Folder Structure

A default path like `/components/ui` (or `@/components/ui` resolving to `src/components/ui` in Vite) is important for several reasons:

1. **Automation & shadcn CLI Integration**: 
   The shadcn CLI relies on the `components.json` layout paths to automatically install atomic primitives (e.g., button, dialog, accordion) into `components/ui`. This ensures they don't overwrite or clutter your high-level pages, custom sections, or logic components.
   
2. **Separation of Concerns**:
   - `components/ui/` stores atomic, reusable elements (primitives) that act as building blocks.
   - `components/` stores complex, page-specific compositions or layout wrappers (such as `ClientMarquee` or `StepsShowcase`).
   
3. **Alias Configuration & Clean Imports**:
   By standardizing the path to `@/components/ui`, you prevent "relative import hell" (such as `../../../components/ui/button.tsx`) and guarantee that if you transfer components between projects, the import paths remain fully functional and clean.
