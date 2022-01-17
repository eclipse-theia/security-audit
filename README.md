<div align='center'>
<br />
<img src='https://raw.githubusercontent.com/eclipse-theia/security-audit/master/assets/logo.svg?sanitize=true' alt='theia logo' width='125'>

<h2>THEIA - SECURITY AUDIT</h2>

<div>

[<img src="https://raw.githubusercontent.com/eclipse-theia/security-audit/master/assets/gh-pages.png" alt="github pages" width="150px"/>](https://eclipse-theia.github.io/security-audit/)

[![Build](https://github.com/eclipse-theia/security-audit/workflows/Build%20and%20Deploy%20GitHub%20Page/badge.svg?branch=master)](https://github.com/eclipse-theia/security-audit/actions)
</div>


</div>

## Overview

The repository performs automatic `audit` scans to an example Theia application in an attempt
to determine if there are any potential security vulnerabilities present.

## Implementation
- Scans are performed on a an application found under `theia-application` by using the command
`yarn audit`.
- Scans report security vulnerabilities with severity `moderate` or higher (`moderate`, `high` and `critical`).
- The output of scans are parsed, and are then displayed for Github Pages to publish.
