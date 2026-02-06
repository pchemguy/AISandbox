---
name: AGENTS.md
---

# Agentic Repo Protocol (Codex Orchestrator + Skills)

## Purpose

This project defines a repeatable framework workflow that provides and alternative implementation to multi-agent execution, where task-specific agents are replaced with agent skills.

Within multiagent environment, the workflow is split into well-defined development / progression phases. Each phase may encompass a focused task or a group of related tasks. Each phase or task is handled by a dedicated task agent, taking a certain input and producing task-related output possibly to be used as input for other tasks. The workflow is, in turn, started by a managing agent. While in multiagent environment, agents might hand off their output to other agents according to workflow, the present project does not allow direct interaction between individual tasks. Instead, a workflow is modeled using the star (hub and spokes) topology. At the center is the main prompt (or a sequence of prompts) passed to a coding agent. The main prompt instructs the agent to act as a workflow orchestrator/manager/director. This role is directly analogous to the managing agent tasked to orchestrate execution of other task-specific agents. Individual tasks, however, are no longer framed as specialized agents. Instead, each task is framed as an agent skill. The agent acting as a managing agent follows the workflow, which references skills instead of delegating a task to a separate task agent. The workflow defines input/output of individual tasks. Anything that needs to be passed between tasks is passed as file artifacts within the project directory. Whatever input individual skills should expect, they should load from either predefined files within the project directory or following a predefined discovery logic acting on the project directory. While skills may still refer to other more general skills, direct inter-skill coupling must be minimized.

The workflow shall remain project-agnostic. Initial project-specific information is placed in `PROJECT.md`, which is read by orchestrator at the beginning. Swapping `PROJECT.md` should be sufficient to produce a different single-page browser game while keeping the same orchestration + skills infrastructure.  Because there is actually a single agent and a single context, all bootstrapping information must be available throughout the entire workflow.

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
  - Skills must not invoke or "handoff to" other skills.
  - Skills read/write files only within the repository working tree.

### No lateral coupling

Skills must not:
- reference "handoff" actions (e.g., transfer_to_*),
- instruct other roles to do work,
- assume other skills will "know" context not in files.

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
- A "proposed default" (optional), clearly labeled as a proposal, not a decision

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
   - Orchestrator must support "pause points" after each gate, so the workflow can be executed
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
- Do not add "nice-to-have" features not required by `PROJECT.md` and derived requirements.

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
