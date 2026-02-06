---
name: DEV_STRATEGY.md
---

# Agentic Repo Protocol (Codex Orchestrator + Skills)

## Operating Model

This project defines a repeatable framework workflow that provides and alternative implementation to multi-agent execution, where task-specific agents are replaced with agent skills.

Within multiagent environment, the workflow is split into well-defined development / progression phases. Each phase may encompass a focused task or a group of related tasks. Each phase or task is handled by a dedicated task agent, taking a certain input and producing task-related output possibly to be used as input for other tasks. The workflow is, in turn, started by a managing agent. While in multiagent environment, agents might hand off their output to other agents according to workflow, the present project does not allow direct interaction between individual tasks. Instead, a workflow is modeled using the star (hub and spokes) topology. At the center is the main prompt (or a sequence of prompts) passed to a coding agent. The main prompt instructs the agent to act as a workflow orchestrator/manager/director. This role is directly analogous to the managing agent tasked to orchestrate execution of other task-specific agents. Individual tasks, however, are no longer framed as specialized agents. Instead, each task is framed as an agent skill. The agent acting as a managing agent follows the workflow, which references skills instead of delegating a task to a separate task agent. The workflow defines input/output of individual tasks. Anything that needs to be passed between tasks is passed as file artifacts within the project directory. Whatever input individual skills should expect, they should load from either predefined files within the project directory or following a predefined discovery logic acting on the project directory. While skills may still refer to other more general skills, direct inter-skill coupling must be minimized.

The workflow shall remain project-agnostic. Initial project-specific information is placed in `PROJECT.md`, which is read by orchestrator at the beginning. Swapping `PROJECT.md` should be sufficient to produce a different single-page browser game while keeping the same orchestration + skills infrastructure.  Because there is actually a single agent and a single context, all bootstrapping information must be available throughout the entire workflow.

