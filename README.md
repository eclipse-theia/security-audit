<div align='center'><br /><img src="https://raw.githubusercontent.com/eclipse-theia/security-audit/master/assets/security-header.png" width="400px"/></div>

### Security Audit - 28/3/2024 at 0:04 UTC
-- -

#### Scan Summary

| Moderate | High | Critical |
|:---|:---|:---|
| 3 | 0 | 0 |


#### Scan Details

| Security Vulnerability | Module Name | Severity | Version | Vulnerable Versions | Patched Versions | Recommendation | Path |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| [NPM IP package incorrectly identifies some private IP addresses as public](https://github.com/advisories/GHSA-78xj-cgh5-2h22) | ip (dependency) | moderate | 2.0.0 | =2.0.0 | >=2.0.1 | Upgrade to version 2.0.1 or later | node-gyp>make-fetch-happen>socks-proxy-agent>socks>ip |
| [follow-redirects' Proxy-Authorization header kept across hosts](https://github.com/advisories/GHSA-cxjh-pqwp-8mfp) | follow-redirects (dependency) | moderate | 1.15.5 | <=1.15.5 | >=1.15.6 | Upgrade to version 1.15.6 or later | lerna>nx>axios>follow-redirects |
| [Express.js Open Redirect in malformed URLs](https://github.com/advisories/GHSA-rv95-896h-c2vc) | express (dependency) | moderate | 4.18.2 | <4.19.2 | >=4.19.2 | Upgrade to version 4.19.2 or later | @theia/core>express |

