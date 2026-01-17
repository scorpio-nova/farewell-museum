## Context
A subset of UI components (sidebar, sonner, toaster, and the toast helper) already exist in `mindfulness-app-design` with more polished styles. We have previously copied the shared helper infrastructure; now we need to swap the actual component implementations.

## Goals / Non-Goals
- Goals:
  - Replace the four components with their design versions
  - Keep page behavior and props unchanged
  - Validate the replacement through the build
- Non-Goals:
  - Rewriting component logic or adding new behavior
  - Touching other UI files beyond the targeted ones

## Decisions
- Decision: Copy files byte-for-byte from the design project
  - Reason: Ensures styles match without manually porting them
- Decision: Keep existing hooks and helper exports in place
  - Reason: Avoid breaking consumers that rely on the current `useToast` contract

## Risks / Trade-offs
- Risk: Styles might rely on assets or utilities not yet present
  - Mitigation: Confirm dependencies (`cn`, Radix, sonner) already installed and path aliases established
- Risk: Slight behavioral differences
  - Mitigation: Manual sanity checks after build
