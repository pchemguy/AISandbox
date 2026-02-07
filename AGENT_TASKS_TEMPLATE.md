---
name: AGENT_TASKS.md
usage:
  - One section per role listed in PROJECT.md Components (excluding Architect).
  - _Allowed Work Area_ is the key enforcement mechanism - it prevents cross-role file edits and keeps tasks isolated.
  - _Primary Deliverables_ must match `PROJECT.md` _OUTPUT ARTIFACTS_ and should be treated as a contract.
  - _Acceptance Criteria_ should be consistent with (but not duplicate excessively) `TEST.md`. Think - role-local subset.
---

# Agent Tasks

## Project

- **Name**: {project_name}
- **Source**: Derived from `PROJECT.md`
- **Purpose**: Define per-role executable task contracts (inputs, outputs, constraints)

## Global Constraints

These constraints apply to all roles unless a role section explicitly tightens them:

- Use only project artifacts as source of truth (`PROJECT.md`, `REQUIREMENTS.md`, `TEST.md`, `AGENT_TASKS.md`, and role outputs).
- Do not introduce features not required by `PROJECT.md` / `REQUIREMENTS.md`.
- Prefer small, readable files; avoid unnecessary complexity.
- Persist cross-task information only via repository files.

---

## Role: {ROLE_NAME}

### Objective

{1-3 sentences. Derived from `PROJECT.md` Components table, refined for executability.}

### Allowed Work Area

- **Directory**: `{relative_dir}/`
- **May create additional files here**: Yes (only if needed to complete the role's task)
- **May modify files outside this directory**: No (except the required primary outputs if they live elsewhere, but prefer local)

### Inputs

The following files are the only authoritative inputs for this role:

- `{PROJECT_ROOT}/...`
- `{PROJECT_ROOT}/...`

If any required input is missing or contradictory, stop and report to the Controller.

### Primary Deliverables

These outputs are mandatory. Do not substitute other artifacts for them.

- `{PROJECT_ROOT}/{path/to/required_output_1}` - {purpose}
- `{PROJECT_ROOT}/{path/to/required_output_2}` - {purpose}

### Auxiliary Artifacts (Optional)

Only create these if necessary to complete the task or to make it auditable:

- `{relative_dir}/{optional_file}` - {purpose}
- (If none are expected, write "None".)

### Task Breakdown

{Short, actionable steps. Keep this minimal; this is not orchestration.  
If multiple subtasks are required, list them as a small set of ordered actions.}

### Acceptance Criteria

{Concrete checks specific to this role, aligned with `TEST.md`.  
Prefer outcomes over implementation details.}

### Non-Goals

Explicitly out of scope for this role:

- {example non-goal}
- {example non-goal}

### Completion Report

When complete, ensure:

- all primary deliverables exist at the specified paths
- outputs satisfy acceptance criteria
- any assumptions are explicitly written into the relevant artifact(s)

Optionally write a brief `{relative_dir}/STATUS.md` summarizing what was done and any open issues.
