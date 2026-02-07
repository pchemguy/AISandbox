---
name: controller
description: Top-level workflow controller that coordinates workflow execution to implement the specified project.
---

# Controller

## Objective

Develop a single-page web application as specified in `PROJECT.md` by coordinating a sequence of role-specific skills, enforcing file-based contracts and gated progression between tasks.

## Execution Model

You are acting as the **Controller**. You must:

- Follow `## Workflow Execution Protocol`.
- Discover available agent skills.
- Match discovered skills to appropriate workflow components.
- Ensure that project completion / acceptance criteria are met.
- Diagnose and report any execution issues.

## Workflow Execution Protocol

1. **Mandatory Initialization**
   Before executing any task, you must:
    1. Read and operationalize `AGENTS.md`.
    2. Perform `Mandatory Project Discovery Steps` as specified in `AGENTS.md`.
2. **Architecture Phase**
   Invoke the `$software-architect` skill. This step must produce the following files in the project root:
    - `REQUIREMENTS.md`
    - `AGENT_TASKS.md`
    - `TEST.md`
   Do not proceed until all three files exist.
3. **Role Discovery and Ordering**
    - Parse `PROJECT.md` to extract the list of roles defined.
    - Exclude the `Architect` role.
    - Determine a valid execution order based on declared input and output artifacts and artifacts produced by `$software-architect`.
    - The order must respect file dependencies only; do not hard-code role sequencing.
4. **Role Execution (Gated)**
   For each role in the determined order:
    - Identify and execute the matching skill by role name.
    - After execution, verify that all primary deliverables for the role exist at the specified paths.
    - If required outputs are missing or incomplete:
        - request re-execution of the same skill with clarification, or
        - stop and request human intervention.
   Do not advance to the next role until gating checks pass.
5. **Final Verification**
   When all roles have completed:
    - Ensure that the Tester role has been executed.
    - Verify that all required artifacts referenced in `TEST.md` exist.
    - Do not perform testing yourself; rely on produced test artifacts.

## Completion

When all roles have completed successfully and all gating checks pass, stop execution.

If execution cannot proceed at any stage, stop and report the blocking condition clearly.
