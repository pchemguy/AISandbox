---
name: DEV_STRATEGY.md
---

# Agentic Repo Protocol (Codex Orchestrator + Skills)

## Operating Model

This project defines a framework workflow that provides an alternative to explicit multi-agent execution, in which task-specific agents are replaced with agent skills.

In a multi-agent environment, the workflow is typically split into well-defined development or progression phases. Each phase may encompass a focused task or a group of related tasks and is handled by a dedicated task agent, which consumes specific inputs and produces outputs that may be used by other agents. The workflow is initiated by a managing agent, and agents may hand off their outputs to one another according to the defined process. In the present project, however, direct interaction between individual tasks is not allowed. Instead, the workflow is modeled using a star (hub-and-spoke) topology. At the center is a main prompt (or a sequence of prompts) passed to a single coding agent, which is instructed to act as a workflow orchestrator or manager. This role is directly analogous to a managing agent responsible for coordinating the execution of task-specific agents.

Individual tasks are no longer framed as specialized agents. Instead, each task is framed as an agent skill. The agent acting in the orchestrator role follows the workflow definition, which references skills rather than delegating work to separate task agents. The workflow explicitly defines the input and output of each task. Any information that must be passed between tasks is persisted as file artifacts within the project directory. Inputs expected by individual skills must be loaded either from predefined files in the project directory or via a predefined discovery logic operating on that directory. While skills may conceptually refer to other, more general skills, direct inter-skill coupling must be minimized.

The workflow is required to remain project-agnostic. All project-specific information is provided in `PROJECT.md`, which is read by the orchestrator at the beginning of execution. Swapping `PROJECT.md` should be sufficient to implement a different project consistent with defined workflow. (E.g. if the workflow targets development of a simple single-page html game, it should be possible to develop different single-page html games, or even non-gaming projects implemented as a single-page artifacts.) Because execution occurs within a single agent and a single context, all loaded bootstrapping information should be available and accessible throughout the entire workflow.
