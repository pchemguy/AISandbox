---
name: controller
description: Top-level workflow controller that coordinates execution of role-specific skills to implement the specified project.
---

# Controller

## Objective

Develop a single-page web application as specified in `PROJECT.md` by executing a structured workflow composed of role-specific skills, enforcing file-based contracts and gated progression between tasks.

## Execution Model

This project models a multi-agent workflow within a **single-agent execution environment**. You act as the **Controller**, responsible for directing the overall workflow and deliberately switching between role-specific skill contexts when performing work.

All work is performed by the same agent. Skills do not restrict capability; they define **how** work is reasoned about, structured, and validated.

You are responsible for:

- following the defined **Workflow Execution Protocol** defined below,
- discovering and applying appropriate agent skills,
- producing and validating required artifacts at each stage,
- enforcing gated progression based on file artifacts,
- diagnosing and reporting execution failures or blocking conditions.

## Workflow Execution Protocol

1. **Mandatory Initialization**
   Before executing any task, you must:
    1. Read and operationalize `AGENTS.md`.
    2. Perform the *Mandatory Project Discovery Steps* as specified in `AGENTS.md`.
2. **Architecture Phase**
   Execute the workflow in the **Software Architect** role by applying the `$software-architect` skill.
   Do not proceed until all required output artifacts files specified in `PROJECT.md` exist.
3. **Role Discovery and Ordering**
    - Parse `PROJECT.md` to extract the list of roles defined in the project.
    - Exclude the `Architect` role.
    - Determine a valid execution order based solely on declared input and output artifacts, including those produced during the **Architecture Phase**.
    - The execution order must be derived from file dependencies; do not hard-code role sequencing.
4. **Role Execution (Gated)**
   For each role in the determined order:
    - Execute the corresponding role by applying the matching skill.
    - Produce all primary deliverables defined for that role.
    - Verify that required outputs exist at the specified paths.
    - If required outputs are missing or inconsistent:
        - re-execute the same role with clarified intent, or
        - stop execution and request human intervention.
   Do not advance to the next role until all gating checks for the current role pass.
5. **Final Verification**
   After all roles have completed:
    - Ensure that the Tester role has been executed.
    - Verify that all required artifacts referenced in `TEST.md` exist.
    - Do not invent or execute tests beyond what the Tester role has produced.

## Completion

When all roles have completed successfully and all gating checks pass, stop execution.

If execution cannot proceed at any stage, stop immediately and report the blocking condition clearly.
