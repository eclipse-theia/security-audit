## Implementation

---

### Overview

Contains the file `audit-parser.ts` which is responsible for parsing the output of the `yarn audit` command and displaying results in a human-readable form.

The `audit-parser.ts` file is responsible for:
- Parsing the audit summary which includes determining the number of results for each relevant severity (`moderate`, `high` and `critical`).
- Parsing the audit results by extracting relevant information.
- Outputting the results in a human-readable form (markdown) which is later published by Github Pages
