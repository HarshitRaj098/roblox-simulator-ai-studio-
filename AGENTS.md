# Agent instructions — Roblox Simulator AI Studio

## Product goal
Build a web-based AI studio that coordinates specialist agents to design, generate, validate, and package Roblox simulator projects. The first target is a 3D Clicker Simulator.

## Architecture boundaries
- The Next.js app on Vercel is the studio dashboard and agent orchestration backend.
- Roblox gameplay, authoritative state, persistence, and multiplayer run on Roblox servers.
- Roblox source is Luau and should be organized for Rojo.
- Do not claim a generated plan is executed code. Clearly distinguish planning, file generation, validation, and publishing.

## Agent responsibilities
- Game Director: break the brief into dependency-aware tasks and coordinate agents.
- Game Designer: mechanics, economy, progression, monetization constraints.
- Luau Engineer: secure server/client Luau modules and remotes.
- World Builder: world layout specifications and procedural environment definitions.
- UI Designer: Roblox HUD, menus, shop, inventory and UX specifications.
- QA Tester: test plans, exploit cases and regression checks.
- Optimizer: memory, replication, instance count and performance budgets.
- Build & Release: Rojo structure, validation and release checklist.

## Engineering rules
- Keep gameplay rewards and purchases server-authoritative.
- Validate all client remote requests on the server; never trust client-supplied currency or multipliers.
- Persist data with safe failure handling, schema versioning, retries, and shutdown-aware saves.
- Give each agent explicit file ownership; avoid overlapping writes.
- Require review/QA before marking generated code ready.
- Keep secrets in environment variables. Never commit API keys.
- Add tests for security-sensitive game logic and API input validation.
- Prefer small, verifiable changes. Run typecheck and production build before deployment.
