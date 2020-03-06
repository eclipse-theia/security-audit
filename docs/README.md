<div align='center'><br /><img src="https://raw.githubusercontent.com/theia-ide/security-audit/master/assets/security-header.png" width="400px"/></div>

### Security Audit - 6/3/2020 at 7:28 UTC
-- -

#### Scan Summary

| Moderate | High | Critical |
|:---|:---|:---|
| 2 | 2 | 0 |


#### Scan Details

| Security Vulnerability | Module Name | Severity | Version | Vulnerable Versions | Patched Versions | Recommendation | Path |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| [Code Injection](https://npmjs.com/advisories/813) | js-yaml (devDependency) | high | 3.7.0 | <3.13.1 | >=3.13.1 | Upgrade to version 3.13.1. | @theia/cli>@theia/application-manager>css-loader>cssnano>postcss-svgo>svgo>js-yaml |
| [Arbitrary File Write](https://npmjs.com/advisories/1217) | decompress (devDependency) | high | 4.2.0 | >=0.0.0 | <0.0.0 | No fix is currently available. Consider using an alternative package until a fix is made available. | @theia/plugin-dev>@theia/plugin-ext>decompress |
| [Denial of Service](https://npmjs.com/advisories/788) | js-yaml (devDependency) | moderate | 3.7.0 | <3.13.0 | >=3.13.0 | Upgrade to version 3.13.0. | @theia/cli>@theia/application-manager>css-loader>cssnano>postcss-svgo>svgo>js-yaml |
| [Cross-Site Scripting](https://npmjs.com/advisories/1426) | serialize-javascript (devDependency) | moderate | 1.9.1 | <2.1.1 | >=2.1.1 | Upgrade to version 2.1.1 or later. | @theia/cli>@theia/application-manager>@theia/compression-webpack-plugin>serialize-javascript |

