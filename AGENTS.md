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

## Working Rules for Codex

- Work incrementally and make only the changes requested in the current task.
- Do not implement future sections or features unless explicitly requested.
- Before modifying existing code, inspect the relevant files and understand the current structure.
- Preserve existing functionality unless the requested task requires changing it.
- Prefer small, focused changes over large refactors.
- Do not introduce new dependencies unless they are necessary for the requested task.
- Do not remove files, components, styles, or functionality without explicit instruction.
- Keep TypeScript types strict and avoid unnecessary use of `any`.
- Follow the existing Next.js App Router architecture.
- Reuse components when appropriate instead of duplicating code.

## Files Codex May Modify

Codex may modify:
- Files inside `app/`
- Files inside `public/`
- Reusable components created for this project
- Stylesheets used by the website
- TypeScript and configuration files when required by the current task

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
- Install or remove dependencies without explicit instruction
- Rename or delete project files without explicit instruction
- Perform broad refactors unrelated to the current task
- Change the project architecture without explicit approval

## Codex Workflow

For every task, Codex should follow this workflow:

1. Read the user's current request carefully.
2. Inspect the relevant project files before making changes.
3. Make only the changes required for the current task.
4. Keep the implementation small and focused.
5. Preserve existing functionality and styling unless the task explicitly requires changes.
6. After making changes, review the modified files for obvious errors.
7. Clearly summarize what was changed.
8. Do not continue with additional tasks unless explicitly requested.