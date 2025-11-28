# Project Setup & Structure Documentation

## Directory Structure

The project follows a strict directory structure to separate live code, AI processing areas, and documentation.

- **`public/`**: Contains the live application code (HTML, CSS, JS).
- **`AI_KOREKSI/`**: Input folder for AI processing. Files to be edited are copied here from `public/`.
- **`AI_HASIL/`**: Output folder for AI processing. Finished files are saved here before integration.
- **`backup/`**: Stores backups of critical files.
- **`tools/`**: Scripts and utility tools.
- **`docs/`**: Project documentation and change logs.

## Workflow Rules

1.  **Editing**: Copy file from `public/` -> `AI_KOREKSI/`.
2.  **Processing**: AI edits the file in `AI_KOREKSI/`.
3.  **Output**: AI saves the result to `AI_HASIL/`.
4.  **Integration**: Move file from `AI_HASIL/` -> `public/` (maintaining path structure).

## Initial Setup Log

- Created root directories.
- Initialized `task.md` and `implementation_plan.md`.
