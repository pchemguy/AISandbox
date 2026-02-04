# Setup

> [!WARNING]
> 
> To use Codex skill installer, internet access must be enabled in the environment settings.

# Commands

## List Installed Skills

`List installed skills`

## List Available Skills

`List skills`: list skills available from https://github.com/openai/skills/tree/main/skills/.curated

## Install Skill from OpenAI Repo


|                     |                                                                                |
| ------------------- | ------------------------------------------------------------------------------ |
| **Repo**            | https://github.com/openai/skills                                               |
| **Note**            | Directly reference ".experimental" or ".curated" within `/skills`              |
| **Prompt Template** | `$skill-installer install the {SKILL_NAME} skill from the {COLLECTION} folder` |

where

- `$skill-installer`: calls a preinstalled `.system` skill (`.system/skill-installer`)
- `{COLLECTION}`: either `.experimental` or `.curated` as appropriate.
- `{SKILL_NAME}`: skill name and name of subfolder.

Example prompt:

```
$skill-installer install the create-plan skill from the .experimental folder
```

calls the `$skill-installer` skill to install OpenAI `create-plan` skill from located in `skills/.experimental/create-plan` within https://github.com/openai/skills.
