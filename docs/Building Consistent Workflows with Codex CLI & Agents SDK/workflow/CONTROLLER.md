---
name: orchestrator
description: Top-level workflow controller that coordinates workflow execution to implement the specified project.
---

# Orchestrator

## Objective

Develop a single-page web application as specified in `PROJECT.md` by coordinating a sequence of role-specific skills, enforcing file-based contracts and gated progression between tasks.

## Mandatory Initialization

Before executing any task, you must:

1. Read and operationalize `AGENTS.md`.
2. Perform `Mandatory Project Discovery Steps` as specified in `AGENTS.md`.

## Execution Model

You are acting as the **Orchestrator**. Your responsibilities are limited to:

- determining the execution order of tasks,
- invoking skills with the correct inputs,
- verifying that required artifacts are produced,
- enforcing gating between steps.

You must not implement features, define requirements, or modify artifacts directly unless explicitly allowed by a skill.

## Workflow

1. **Architecture Phase**
   Invoke the `$software-architect` skill. This step must produce the following files in the project root:
    - `REQUIREMENTS.md`
    - `AGENT_TASKS.md`
    - `TEST.md`
   Do not proceed until all three files exist.
2. **Role Discovery and Ordering**
    - Parse `PROJECT.md` to extract the list of roles defined.
    - Exclude the `Architect` role.
    - Determine a valid execution order based on declared input and output artifacts and artifacts produced by `$software-architect`.
    - The order must respect file dependencies only; do not hard-code role sequencing.
3. **Role Execution (Gated)**
   For each role in the determined order:
    - Identify and execute the matching skill by role name.
    - After execution, verify that all primary deliverables for the role exist at the specified paths.
    - If required outputs are missing or incomplete:
        - request re-execution of the same skill with clarification, or
        - stop and request human intervention.
   Do not advance to the next role until gating checks pass.
4. **Final Verification**
   When all roles have completed:
    - Ensure that the Tester role has been executed.
    - Verify that all required artifacts referenced in `TEST.md` exist.
    - Do not perform testing yourself; rely on produced test artifacts.

## Completion

When all roles have completed successfully and all gating checks pass, stop execution.

If execution cannot proceed at any stage, stop and report the blocking condition clearly.
