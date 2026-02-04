# Repo Notes

## Obsidian Access to dot-Directory Objects

As Obsidian is not capable of properly handling dot-FS objects, but also links and junctions, the simplest workaround is to rename original directories, adding  dummy names (e.g., `$_.system` to access `.system` contents) and creating directory junction with the original name (`.system`) pointing to the renamed directory. Because GitHub desktop on Windows apparently does not handle directory junctions in any special way, adding `$_.*` to `.gitignore` results in an identical remote repository (showing original dot directories only). This workaround is not great as this artificial structure is not preserved in the remote repo (perhaps, hooks can make managing this approach somewhat simpler, but I am not really familiar with this functionality).
