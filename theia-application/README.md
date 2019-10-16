## Example Theia Application

---

### Overview

The `theia-application` folder contains the `package.json` of an example Theia application with every extension
present in the `browser-app` example in the main [repository](https://github.com/eclipse-theia/theia).

The application is built during CI, and generates a `yarn.lock` from which the `yarn audit` command will
use when auditing the application for any security vulnerabilities.
