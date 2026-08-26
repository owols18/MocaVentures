<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# MOCA Ventures Project

This repository contains the official website redesign for MOCA Ventures.

Project type:
- Premium corporate website
- Built with Next.js
- TypeScript
- Tailwind CSS
- App Router

The website should reflect a high-end, architectural, modern, and editorial visual identity.

The project must prioritize:
- Clean and maintainable code
- Responsive design
- Performance
- Accessibility
- Reusable components
- Consistent visual design
- Stable build behavior
- Static-hosting compatibility where possible

## Visual Source of Truth

The approved MOCA Ventures Illustrator/PDF design is the visual source of truth.

Codex must:
- Implement the approved design faithfully.
- Not redesign, reinterpret, simplify, or "improve" approved layouts unless explicitly requested.
- Preserve approved spacing, hierarchy, typography, colors, proportions, and responsive behavior.
- Treat screenshots and QA feedback supplied during implementation as authoritative for the current task.
- Avoid introducing decorative effects, animations, layout changes, or visual patterns that were not explicitly approved.

## Working Rules for Codex

- Work incrementally and make only the changes requested in the current task.
- Do not implement future sections or features unless explicitly requested.
- Before modifying existing code, inspect the relevant files and understand the current structure.
- Preserve existing functionality unless the requested task requires changing it.
- Prefer small, focused changes over large refactors.
- Do not introduce new dependencies unless explicitly approved.
- Do not remove files, components, styles, or functionality without explicit instruction.
- Keep TypeScript types strict and avoid unnecessary use of `any`.
- Follow the existing Next.js App Router architecture.
- Reuse existing components and patterns when appropriate instead of duplicating code.
- Do not modify unrelated sections while working on a local task.
- Preserve approved responsive behavior at all existing breakpoints.
- Prefer CSS/layout solutions before adding JavaScript for layout, sticky behavior, responsive behavior, or scroll interactions.
- Do not add continuous scroll tracking unless explicitly approved.
- Respect `prefers-reduced-motion` for decorative motion and reveal effects.
- Do not add GSAP, Lenis, Framer Motion, or similar animation/scroll libraries unless explicitly approved.

## Editorial Content Architecture

Editorial content should remain separated from presentation whenever the project already provides a content architecture.

Use:
- `content/home.json` for editable Home editorial copy.
- `content/projects/*.json` for project editorial data.
- `data/projects.ts` for the server/build-side project loader and project selection logic.

Codex must:
- Avoid duplicating editorial copy inside JSX when the content already belongs in a JSON content source.
- Keep project cards dynamic and data-driven.
- Never hardcode Home project lists when `getLatestProjects(...)` can provide them.
- Generate project links from the project slug rather than storing duplicate href values in project JSON.
- Preserve the existing draft/published project rules and project validation architecture.

## Server / Client Boundaries

Project data loading uses server/build-only logic.

Codex must:
- Keep `data/projects.ts` and filesystem-based project discovery on the server/build side.
- Never import Node filesystem-dependent project logic into a Client Component.
- Keep Client Components minimal and isolated to interaction that genuinely requires browser APIs.
- Preserve compatibility with future static build/export requirements where technically possible.

## Responsive Strategy

The official QA reference states are:

- Mobile Portrait: `390px`
- Mobile Landscape: `844 x 390`
- Tablet Portrait: `834px`
- Tablet Landscape: `1194px`
- Desktop Compact: `1440px`
- Desktop Main: `1920 x 1080`
- Large Desktop / Studio Display QA: `2560 x 1440`

Desktop Main at `1920px` is the primary desktop visual reference.

Codex must:
- Keep `1440px` fully functional and visually intentional.
- Scale progressively toward `1920px`.
- Continue controlled growth toward `2560px`.
- Avoid making layouts grow indefinitely on very large screens.
- Avoid applying a global `max-width: 1440px` to the site.
- Allow visual media to use more viewport width than editorial text where appropriate.
- Keep editorial copy widths controlled for readability.
- Prefer fluid CSS using `clamp()`, percentages, `calc()`, CSS custom properties, or appropriate breakpoint interpolation where useful.

## Mobile Landscape Priority Rule

Mobile Landscape has a specific priority behavior.

The rule:

```css
@media (orientation: landscape) and (max-height: 500px)
```

must take precedence over width-based Tablet rules when applicable.

Codex must:
- Preserve the existing Mobile Landscape-specific layouts.
- Not assume that a wide viewport automatically means Tablet when viewport height is small.
- Verify Mobile Landscape separately during responsive QA whenever the modified section has breakpoint-specific behavior.

## Existing Responsive Behavior

Do not change existing approved breakpoints or responsive behavior unless the current task explicitly requires it.

When modifying shared components or CSS:
- Check for possible regressions in Mobile Portrait.
- Check Mobile Landscape separately.
- Check Tablet Portrait.
- Check Tablet Landscape.
- Check Desktop Compact.
- Check Desktop Main.
- Check Large Desktop when the change affects fluid Desktop scaling.

Task-specific measurements belong in the task prompt and should not be generalized into permanent project rules unless explicitly requested.

## Animation and Scroll Rules

For existing interactive and reveal behavior:

- Prefer native CSS layout and `position: sticky` where appropriate.
- Use `IntersectionObserver` for one-shot viewport reveals when browser detection is required.
- Avoid continuous scroll listeners.
- Avoid JavaScript-calculated sticky positions unless explicitly approved.
- Keep motion subtle and subordinate to the architectural imagery and content.
- Do not introduce scale, rotation, blur, parallax, or shadows unless explicitly requested.
- Preserve natural reverse scrolling behavior for sticky layouts.
- Respect `prefers-reduced-motion`.

Section-specific exceptions must remain local to their breakpoint and component.

## Working Tree Safety

Before modifying files, Codex must inspect the current working tree.

Codex must:
- Preserve existing uncommitted work.
- Never assume uncommitted changes are disposable.
- Never run `git reset`, `git restore`, `git revert`, destructive checkout commands, or equivalent destructive Git operations unless explicitly instructed.
- Never discard or overwrite unrelated work.
- Keep changes limited to the files necessary for the current task.

## Git Rules

Codex must not:
- Commit changes unless explicitly instructed.
- Push changes unless explicitly instructed.
- Modify Git history or Git configuration.
- Create or switch branches unless explicitly instructed.

When a task is complete, report the changed files and stop.

## Files Codex May Modify

Codex may modify, when required by the current task:
- Files inside `app/`
- Files inside `components/`
- Files inside `content/`
- Files inside `data/`
- Files inside `public/`
- Stylesheets used by the website
- TypeScript files used by the website
- Configuration files only when the current task explicitly requires them

Codex must keep changes limited to the files necessary to complete the requested task.

## Files and Areas Codex Must Not Modify Without Explicit Instruction

Codex must not modify:
- `package.json`
- `package-lock.json`
- `.gitignore`
- Git history or Git configuration
- Environment files such as `.env`, `.env.local`, or similar
- Next.js configuration files unless the current task explicitly requires it
- Dependency versions
- Build tooling configuration
- Files outside the `moca-ventures` project directory

Codex must not:
- Install or remove dependencies without explicit instruction.
- Rename or delete project files without explicit instruction.
- Perform broad refactors unrelated to the current task.
- Change the project architecture without explicit approval.

## Validation Rules

After implementation of a meaningful code or styling task, Codex should:

1. Review the modified files for obvious errors.
2. Run:

```bash
npm run lint
npm run build
```

3. Report whether each command passed or failed.
4. Report:
   - files created
   - files modified
   - relevant architectural decisions
   - responsive behavior affected
   - any limitations or unresolved issues

If the task is purely editorial and does not justify a full build, follow the explicit validation requirements in the task prompt.

## Codex Workflow

For every task, Codex should follow this workflow:

1. Read `AGENTS.md`.
2. Read the user's current task carefully.
3. Inspect the current Git working tree.
4. Inspect the relevant project files before making changes.
5. Identify the minimum required file set.
6. Make only the changes required for the current task.
7. Preserve existing functionality and styling unless the task explicitly requires changes.
8. Preserve existing uncommitted work.
9. Review the modified files.
10. Run the requested validation, normally `npm run lint` and `npm run build`.
11. Clearly summarize what was changed.
12. Report all files created and modified.
13. Do not commit unless explicitly instructed.
14. Do not continue with additional tasks unless explicitly requested.