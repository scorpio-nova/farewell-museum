# Change: Replace specific UI components with design copy

## Why
The design copy provides a richer visual treatment for several shared components, but the current implementation still uses the older styles. To keep the UI aligned with the copied assets, we need to replace those component files while preserving the existing logic.

## What Changes
- Replace `sidebar.tsx`, `sonner.tsx`, `toaster.tsx`, and `use-toast.ts` in `src/components/ui` with the versions from `mindfulness-app-design/components/ui`
- Keep the existing TypeScript interfaces and hooks in place so pages continue to work unchanged
- Regenerate validation artifacts (build, stories, etc.) to ensure the replacements compile with the new dependencies
- Update `openspec/specs/ui-components/spec.md` with a scenario that explicitly references the replaced files to document the visual change

## Impact
- Affected capabilities: `ui-components`
- Affected code:
  - `src/components/ui/sidebar.tsx`
  - `src/components/ui/sonner.tsx`
  - `src/components/ui/toaster.tsx`
  - `src/components/ui/use-toast.ts`
  - `openspec/specs/ui-components/spec.md` (new scenario)
