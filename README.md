<div align='center'>
<br />
<img src='https://raw.githubusercontent.com/theia-ide/security-audit/master/assets/logo.svg?sanitize=true' alt='theia logo' width='125'>

<h2>THEIA - SECURITY AUDIT</h2>

<div>

[<img src="https://raw.githubusercontent.com/theia-ide/security-audit/master/assets/gh-pages.png" alt="github pages" width="150px"/>](https://theia-ide.github.io/security-audit/)

[<img src="https://api.travis-ci.com/theia-ide/security-audit.svg?branch=master" alt="travis status"/>](https://travis-ci.com/theia-ide/security-audit/builds)

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
