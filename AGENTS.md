# Agents

This document describes the Claude Code subagents available in this repository. Subagents run in isolated context windows and are automatically delegated tasks by Claude Code based on their descriptions.

> **Note for Claude Code:** Claude Code reads `CLAUDE.md`, not `AGENTS.md` directly. The project `CLAUDE.md` imports this file via `@AGENTS.md`. See [Claude Code memory docs](https://code.claude.com/docs/en/memory) for details.

---

## How Agents Work

Agents are defined as Markdown files with YAML frontmatter in `.claude/agents/`. Each agent has:

- A **name** — unique identifier used when invoking the agent
- A **description** — tells Claude Code when to delegate to this agent
- A **tools** list — restricts which tools the agent can use
- A **model** — the Claude model to use (defaults to inherited)
- A **system prompt** — the agent's expertise and instructions (body of the file)

Claude Code automatically delegates tasks to the most appropriate agent based on the task description matching the agent's `description` field.

---

## Project Agents

### `site-analyzer`

**File:** `.claude/agents/site-analyzer.md`
**Model:** Sonnet
**Tools:** Read, WebFetch, Bash (read-only), Glob, Grep

**Purpose:** Crawls a live website and produces a fully-populated `site.config.json`. Use this agent when onboarding a new site or verifying that config is still accurate after a site redesign.

**When Claude Code invokes it:**
- Running `/analyze-site`
- User asks to "analyze the site" or "update site config"
- The `site.config.json` has empty `expectedNavItems`

**What it does:**
1. Resolves the canonical URL (follows redirects)
2. Navigates with `networkidle` wait (handles SPAs)
3. Dismisses cookie banners before inspection
4. Extracts nav items: text and hrefs
5. Detects contact forms (looks for email input fields)
6. Infers industry from heading and paragraph copy
7. Sets `skipVisual` only if site has animations that can't be paused
8. Sets `auth.required` if any page redirects to a login URL
9. Outputs a validated `site.config.json` + issues checklist

**Outputs:**
- Updated `site.config.json` with all fields populated
- Issues checklist (missing meta description, no HTTPS, broken nav links, etc.)
- Confidence assessment (High / Medium / Low)

---

### `test-generator`

**File:** `.claude/agents/test-generator.md`
**Model:** Sonnet
**Tools:** Read, Write, Edit, Glob, Grep, Bash, WebFetch

**Purpose:** Reads a populated `site.config.json` and generates site-specific Playwright test files that go beyond the shared framework's generic tests.

**When Claude Code invokes it:**
- Running `/generate-full-suite`
- User asks to "generate tests for" a specific page or feature
- A site has unique functionality not covered by the generic test suites
- Writing regression tests for a recently discovered bug

**What it does:**
1. Reads `site.config.json` to understand the site structure
2. Identifies gaps in the shared test suites
3. Plans test scenarios before writing code
4. Generates or updates page object classes in `src/pages/`
5. Writes spec files in `tests/custom/<scenario-name>.spec.ts`
6. Tags all tests with `@custom` plus relevant suite tags
7. Verifies TypeScript compiles cleanly

**Generated file conventions:**
- Location: `tests/custom/<kebab-case-description>.spec.ts`
- One `describe` block per page or feature area
- Tags: `@custom` + `@smoke`/`@navigation`/etc.
- No fixed timeouts over 500ms
- No form submissions
- JSDoc comment explaining what and why

---

## Invoking Agents Explicitly

To invoke an agent directly in a Claude Code session:

```
Use the site-analyzer agent to crawl http://www.emaginesolutionstech.com
```

```
Use the test-generator agent to write tests for the homepage hero section
```

Claude Code will delegate to the agent automatically when the task description matches.

---

## Adding a New Agent

1. Create a `.md` file in `.claude/agents/` with YAML frontmatter:

```markdown
---
name: my-agent
description: One-sentence description of when Claude should delegate to this agent
tools: Read, Glob, Grep
model: sonnet
---

You are a specialized agent for...
```

2. The agent is available immediately in the current session (no restart needed when using `/agents`).
3. Check it into version control so the whole team benefits.

See the [Claude Code subagents docs](https://code.claude.com/docs/en/sub-agents) for all supported frontmatter fields.
