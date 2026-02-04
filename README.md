# Repo Notes

## Obsidian Access to dot-Directory Objects

As Obsidian is not capable of properly handling dot-FS objects, the simplest workaround is to create directory junctions with dummy name, e.g., `$_.system` junction to access `.system` contents. `$_.*` is then added to `.gitignore`.

