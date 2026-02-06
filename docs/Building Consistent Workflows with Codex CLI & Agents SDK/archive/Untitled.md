## Concept refinement

### Core idea

* `PROJECT.md` is the **only variable input** that changes between projects.
* `.agent/skills/` contains reusable **skills** (role-equivalents) that:

  * read a declared set of files from the repo
  * write declared outputs back into the repo
  * **never call other skills**
* `orchestrator/` contains one or more orchestrator prompts that:

  * define the workflow
  * run skills in sequence (and optionally re-run with feedback)
  * enforce gating criteria (file presence + minimal content checks)
  * optionally support “pause points” for human intervention

### Invariants (what makes the framework reusable)

* Stable repo layout and file naming
* Stable skill I/O contracts
* Stable orchestration gates and decision rules
* `PROJECT.md` swap changes the game, not the process

---

## Revised `AGENTS.md`


---
name: AGENTS.md
---

# Agentic Repo Protocol (Codex Orchestrator + Skills)

## Purpose

This repository is designed to execute a repeatable “project brief → implemented artifact” workflow using a single top-level Orchestrator prompt and a set of reusable task skills.

The workflow must remain project-agnostic. Swapping `PROJECT.md` should be sufficient to produce a different single-page browser game while keeping the same orchestration + skills infrastructure.

## Canonical Repo Structure

```
.agent/skills/          # Reusable task skills (project-agnostic where feasible)
orchestrator/           # Orchestrator prompts (define workflow, gating, intervention points)
AGENTS.md               # This protocol (authoritative)
PROJECT.md              # Project brief (the primary variable input)
README.md               # Human-facing overview + run instructions
```

## Operating Model

### Roles

- **Orchestrator (top-level)**:
  - The only entity that defines workflow order, gating, retries, and escalation to the user.
  - Invokes skills by name (from `.agent/skills/`) and supplies explicit inputs and expected outputs.
  - Verifies deliverables exist and satisfy minimum criteria before moving to the next step.

- **Skills (task agents)**:
  - Pure executors. Each skill receives explicit Inputs + Instructions from the Orchestrator.
  - Skills must not invoke or “handoff to” other skills.
  - Skills read/write files only within the repository working tree.

### No lateral coupling

Skills must not:
- reference “handoff” actions (e.g., transfer_to_*),
- instruct other roles to do work,
- assume other skills will “know” context not in files.

All coordination happens through the Orchestrator via files in the repo.

## Mandatory Repo Discovery Steps

Before writing or modifying any files, you must:

1. Read and operationalize:
   - `AGENTS.md` (this file)
   - `README.md`
   - `PROJECT.md`

2. Discover skills and orchestration assets:
   - enumerate `.agent/skills/`
   - enumerate `orchestrator/`
   - identify the orchestrator prompt to run (if not specified, default to a main entrypoint prompt)

3. Establish the working rules for this run:
   - identify allowed output directories (e.g., `frontend/`, `design/`, etc.)
   - identify whether commits/PR steps are enabled by the orchestrator prompt

## Skill Contract (Required)

Every skill in `.agent/skills/` must be written so it can be invoked independently.

Each skill must define:

- **Name**: stable identifier used by the Orchestrator
- **Objective**: what it is responsible for producing
- **Inputs**: explicit file paths relative to repo root (authoritative source of truth)
- **Deliverables**: explicit file paths the skill must create/update
- **Constraints**:
  - Do not change unrelated files.
  - Do not invent requirements that are not in the Inputs.
  - If information is missing or contradictory, stop and report issues (see below).

### Reporting Issues (Required)

If a skill cannot proceed due to ambiguity, missing inputs, or contradictions, it must:

- Write a short issue report to one of:
  - `reports/<skill_name>_REPORT.md` (preferred), or
  - append to `ORCHESTRATOR_NOTES.md` (if `reports/` is not enabled)

The report must include:
- Missing/ambiguous items
- The minimal question(s) that must be answered
- A “proposed default” (optional), clearly labeled as a proposal, not a decision

Then the skill must stop without speculative implementation.

## Orchestrator Contract (Required)

Orchestrator prompts live in `orchestrator/` and are the only place workflow logic is defined.

Orchestrator responsibilities:

1. **Select workflow** based on `PROJECT.md` scope (frontend-only vs optional backend).
2. **Invoke skills** with explicit Inputs/Deliverables and any run constraints.
3. **Gate progress** after each skill:
   - verify required files exist
   - verify the files minimally satisfy intent (e.g., non-empty, contains required sections)
   - read any skill reports and resolve via:
     - user intervention, or
     - re-run the same skill with clarified instruction, or
     - explicit recorded assumptions (only the orchestrator may choose to accept defaults)

4. **Human intervention friendliness**
   - Orchestrator must support “pause points” after each gate, so the workflow can be executed
     stepwise with minimal overhead.

## Assumptions Policy

- Skills must not silently assume product decisions.
- If assumptions are needed, they must be surfaced in reports.
- The Orchestrator may accept and record assumptions in a designated place, such as:
  - `REQUIREMENTS.md` → `Assumptions` section, and/or
  - `ASSUMPTIONS.md` (optional)

Assumptions must be explicit and reviewable.

## File and Directory Rules

- Treat the repository as the system of record.
- Use relative paths from repo root.
- Create directories only if:
  - allowed by the orchestrator prompt, and
  - required for declared deliverables.

Default allowed output directories (unless orchestrator overrides):
- `design/`, `frontend/`, `backend/`, `tests/`, `reports/`

## Minimal Quality Bar

- Outputs must be small, readable, and beginner-friendly.
- Keep dependencies minimal (prefer none).
- Do not add “nice-to-have” features not required by `PROJECT.md` and derived requirements.

## Portability Goal

The framework must remain reusable across multiple game briefs by swapping `PROJECT.md`.
Avoid hard-coding game-specific details into reusable skills unless the skill is explicitly
scoped as project-specific.

## If Instructions Conflict

Priority order:
1. `AGENTS.md`
2. selected orchestrator prompt in `orchestrator/`
3. skill prompt in `.agent/skills/`
4. `PROJECT.md` / `README.md` (as content inputs)

If `PROJECT.md` conflicts with orchestrator/skills, the Orchestrator must stop and request clarification
or record an explicit decision before continuing.



## Skill Contract (Required)

Every skill in `.agent/skills/` must be written so it can be invoked independently.

Each skill must define:

- **Name**: stable identifier used by the Orchestrator
- **Objective**: what it is responsible for producing
- **Inputs**: explicit file paths relative to repo root (authoritative source of truth)
- **Deliverables**: explicit file paths the skill must create/update
- **Constraints**:
  - Do not change unrelated files.
  - Do not invent requirements that are not in the Inputs.
  - If information is missing or contradictory, stop and report issues (see below).
    
    
## Orchestrator Contract (Required)

Orchestrator prompts live in `orchestrator/` and are the only place workflow logic is defined.

Orchestrator responsibilities:

1. **Select workflow** based on `PROJECT.md` scope (frontend-only vs optional backend).
2. **Invoke skills** with explicit Inputs/Deliverables and any run constraints.
3. **Gate progress** after each skill:
   - verify required files exist
   - verify the files minimally satisfy intent (e.g., non-empty, contains required sections)
   - read any skill reports and resolve via:
     - user intervention, or
     - re-run the same skill with clarified instruction, or
     - explicit recorded assumptions (only the orchestrator may choose to accept defaults)

4. **Human intervention friendliness**
   - Orchestrator must support "pause points" after each gate, so the workflow can be executed
     stepwise with minimal overhead.


---
---

Good — this is already structurally sound. What you need now is **tightening, de-ambiguation, and enforcement language**, not conceptual expansion. Below I’ll:

1. Refine **AGENTS.md** so it is *strict, operational, and unambiguous*.
2. Refine **DEV_STRATEGY.md** to:

   * remove redundancy,
   * clearly define the **single-agent + skills** model,
   * eliminate any remaining multi-agent ambiguity,
   * formalize constraints (no coupling, file-based dataflow).

I will **not** introduce new concepts unless necessary.

---

## Refined `AGENTS.md`

Your current version is good but slightly permissive and informal. The goal of `AGENTS.md` is to act as a **hard execution contract**.

### Key improvements

* Make “BLOCKED” behavior precise and testable
* Clarify that *no file writes* are allowed before discovery
* Explicitly state that skills and orchestrator must obey this file

### Revised version

~~~
---
name: AGENTS.md
---

# Mandatory Project Discovery Protocol

This file defines **mandatory execution constraints** for all agent activity
(orchestrator or skill-level). These rules are non-negotiable.

## Mandatory Project Discovery Steps

Before writing, modifying, or deleting **any** files, the agent must:

1. Read and operationalize the following files (if present):
   - `AGENTS.md` (this file)
   - `README.md`
   - `PROJECT.md`
   - `DEV_STRATEGY.md`

2. Discover available skills:
   - Enumerate `.agent/skills/`
   - Identify skill names and their declared input/output contracts

3. Identify the active orchestration entrypoint:
   - Enumerate `orchestrator/`
   - Determine which orchestrator prompt is being executed

## Blocking Conditions

If **any required file** listed above is missing, inaccessible, or unreadable:

- The agent **must not** perform any task execution.
- The agent **must not** write or modify any files.
- The agent must immediately stop and output:

```
BLOCKED

Missing or inaccessible artifacts:

* <list of files>
```

```

This makes `AGENTS.md` behave like a **runtime guardrail**, not documentation.

---

## Refined `DEV_STRATEGY.md`

Your current text is conceptually correct but:

* overly verbose,
* partially repetitive,
* still framed in “multi-agent explanation mode” rather than **execution doctrine**.

We want this to read like a **design spec**, not a blog explanation.

### Key improvements

* Collapse explanation into **normative rules**
* Explicitly forbid agent-style delegation
* Formalize the **hub-and-spoke topology**
* Clarify what “skills may refer to other skills” actually means (this is currently ambiguous)

---

### Revised `DEV_STRATEGY.md`

```markdown
---
name: DEV_STRATEGY.md
---

# Agentic Repo Protocol (Single Orchestrator + Skills)

## Purpose

This repository defines a **single-agent execution framework** that emulates
multi-agent development workflows using **agent skills** coordinated by a
top-level **Orchestrator**.

The design intentionally avoids true multi-agent execution, MCP servers, or
direct agent-to-agent interaction.

## Core Execution Model

- There is **exactly one active agent context** at any time.
- This agent is instructed by an **Orchestrator prompt** to execute a workflow.
- The Orchestrator coordinates work by invoking **skills**, not agents.

### Orchestrator

The Orchestrator is responsible for:

- Reading `PROJECT.md` and selecting the appropriate workflow.
- Defining the execution order of skills.
- Supplying each skill with:
  - explicit input files,
  - explicit output expectations,
  - any gating or stopping conditions.
- Verifying that required artifacts exist before advancing the workflow.
- Deciding whether to:
  - re-run a skill with clarification,
  - stop for human intervention,
  - accept and record explicit assumptions.

The Orchestrator is the **only component** allowed to define or alter workflow
structure.

### Skills (Task Skills)

Skills replace task-specific agents.

Each skill is:

- A deterministic task executor.
- Invoked exclusively by the Orchestrator.
- Defined by:
  - declared inputs (files in the project directory),
  - declared outputs (files to be written),
  - explicit constraints.

Skills must not:

- Invoke or reference other skills as active collaborators.
- Assume the existence of artifacts not listed as inputs.
- Make workflow decisions or advance execution phases.

### Data Flow

- All information passed between workflow phases must be persisted as
  **file artifacts** within the project directory.
- No hidden state, memory-based passing, or implicit context sharing is allowed.
- File artifacts are the sole coordination mechanism.

## Topology Constraint

The workflow follows a **star (hub-and-spoke) topology**:

- The Orchestrator is the hub.
- Skills are spokes.
- There is no direct communication between spokes.

This constraint is intentional and must not be relaxed.

## Project Agnosticism

The workflow must remain project-agnostic.

- All project-specific information is supplied via `PROJECT.md`.
- Swapping `PROJECT.md` must be sufficient to produce a different single-page
  browser game without modifying:
  - skills,
  - orchestration logic,
  - repository structure.

## Bootstrapping Rule

Because execution occurs within a single agent context:

- All bootstrapping information must be available via files in the repository.
- Skills must rely exclusively on discovered artifacts and declared inputs.
- No skill may rely on transient conversational context.

## Skill Reuse and Composition

Skills may **reference the existence** of other skills only in a descriptive or
documentation sense.

Skills must not:
- delegate work to other skills,
- assume that another skill has already run unless the Orchestrator explicitly
  guarantees it via input artifacts.

## Summary

This framework prioritizes:

- determinism,
- auditability,
- minimal coupling,
- human-intervenable execution.

It is designed to support both:
- fully automated Codex-driven runs, and
- stepwise, human-gated execution with minimal overhead.
```

---

## Why this is now “framework-grade”

At this point, you have:

* A **hard execution contract** (`AGENTS.md`)
* A **clear architectural doctrine** (`DEV_STRATEGY.md`)
* A clean separation between:

  * *what the workflow is* (orchestrator),
  * *what work is done* (skills),
  * *what varies per project* (`PROJECT.md`)

This is strong enough that:

* you can swap `PROJECT.md`,
* you can pause/restart orchestration,
* you can later automate via containers or PR generation,
* and you have eliminated the conceptual confusion present in the original article.

### Next logical steps (when you’re ready)

1. Define a **PROJECT.md schema/template**
2. Define one **canonical orchestrator entrypoint** (e.g. `orchestrator/main.md`)
3. Normalize a **skill header format** so skills are mechanically discoverable

If you want, next we can:

* harden `PROJECT.md` into a strict, automation-friendly template, or
* refactor one of your skills (e.g., Designer) to be maximally reusable across games.
