/********************************************************************************
 * Copyright (C) 2019 Ericsson
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import * as fs from 'fs';
import * as path from 'path';

/**
 * Representation of a vulnerability scan result.
 */
export interface Result {
    /**
     * The result ID.
     */
    id: number;
    /**
     * The name of the vulnerability (eg: 'Code Injection').
     */
    vulnerabilityName: string;
    /**
     * The name of the dependency.
     */
    moduleName: string;
    /**
     * The current version of the dependency.
     */
    version: string;
    /**
     * The vulnerable versions of the dependency.
     */
    vulnerableVersions: string;
    /**
     * The patched versions of the dependency.
     */
    patchedVersions: string;
    /**
     * The recommended course of action to resolve the vulnerability.
     */
    recommendation: string;
    /**
     * The severity of the vulnerability.
     */
    severity: string;
    /**
     * The internal severity code for the vulnerability (used during sorting).
     */
    severityCode: number;
    /**
     * The dependency path (path in which the dependency is pulled).
     */
    path: string;
    /**
     * Describes if a dependency is a `dependency` or `devDependency`.
     */
    isDev: string;
    /**
     * The URL for additional information.
     */
    url: string;
}

/**
 * The current working directory.
 */
export const dir = path.parse(__dirname);

/**
 * Parse the list of results.
 */
export function parseResults(): Result[] {
    console.log('----------------------\nParsing...\n----------------------\n');
    // Extract the content of the auditing results.
    const auditContent: string = fs.readFileSync(`${dir.dir}/output/audit.jsonl`, 'utf8').trim();
    const results: Result[] = [];
    // Each line in the audit represents a valid JSON object.
    // Filter out any possible blank lines.
    const lines: string[] = auditContent.split('\n').filter(line => line.length > 0);
    console.log(`Extracting Lines (Total ${lines.length})\n`);
    lines.forEach((line, index) => {
        console.log(`  Line #${index + 1}: { ${line.slice(0, 100)}... }`);
    });
    console.log('\nParsing Results...\n');
    for (let i = 0; i < lines.length; i++) {
        try {
            // Parse the JSON object.
            const json = JSON.parse(lines[i]);
            // Determine the type of the audit.
            // The `auditAdvisory` type represents a vulnerability.
            const type: string = json.type;
            if (type === 'auditAdvisory') {
                const id = json.data.resolution.id;
                // Only store one vulnerability for a given ID.
                if (results.some((result: Result) => id === result.id)) {
                    continue;
                }
                // Extract the relevant vulnerability content.
                const result: Result = {
                    id: json.data.resolution.id,
                    vulnerabilityName: escapePipes(json.data.advisory.title),
                    moduleName: escapePipes(json.data.advisory.module_name),
                    vulnerableVersions: escapePipes(json.data.advisory.vulnerable_versions),
                    patchedVersions: escapePipes(json.data.advisory.patched_versions),
                    recommendation: escapePipes(json.data.advisory.recommendation),
                    severity: escapePipes(json.data.advisory.severity),
                    path: escapePipes(json.data.resolution.path),
                    isDev: escapePipes(json.data.resolution.dev),
                    version: escapePipes(json.data.advisory.findings[0].version),
                    severityCode: getSeverityCode(json.data.advisory.severity),
                    url: escapePipes(json.data.advisory.url),
                };
                results.push(result);
            }
        } catch (error) {
            continue;
        }
    }
    // Sort the vulnerabilities based on their severity.
    results.sort((a: Result, b: Result) => compareSeverity(a, b));
    if (!results.length) {
        console.log('No results!');
    } else {
        console.table(results, ['id', 'vulnerabilityName', 'moduleName', 'severity', 'version']);
    }
    return results;
}

/**
 * Build the result table in markdown format.
 */
export function buildResultsTable(): string {
    const results: Result[] = parseResults();
    if (!results.length) {
        return 'No vulnerabilities found!';
    }
    let markdown: string = '';
    // Build the table header.
    markdown += '| Security Vulnerability | Module Name | Severity | Version | Vulnerable Versions | Patched Versions | Recommendation | Path |';
    // Build the table header separator.
    markdown += '\n|:---|:---|:---|:---|:---|:---|:---|:---|:---|:---|\n';
    // Build the table rows.
    results.forEach((i: Result) => {
        markdown += `| [${i.vulnerabilityName}](${i.url}) | ${i.moduleName} (${getDev(i)}) | ${i.severity} | ${i.version} | ${i.vulnerableVersions} | ${i.patchedVersions} | ${i.recommendation} | ${i.path} |\n`;
    });
    return markdown;
}

/**
 * Parse the result determining the overall summary.
 */
export function parseSummary(): Map<number, string> {
    // Get the content of the audit results.
    const content = fs.readFileSync('./output/audit.jsonl', 'utf8');
    // Get the audit results.
    const lines: string[] = content.split('\n').filter(line => line.length > 0);
    // Store a map of IDS and their vulnerability.
    const ids: Map<number, string> = new Map<number, string>();
    for (let i = 0; i < lines.length - 2; i++) {
        const json = JSON.parse(lines[i]);
        const id = json.data.resolution.id;
        const severity = json.data.advisory.severity;
        if (ids.has(id)) {
            continue;
        }
        ids.set(id, severity.toLowerCase());
    }
    return ids;
}

/**
 * Build the summary table.
 * Represents the number of `moderate`, `high` and `critical` severities.
 */
export function buildSummaryTable(): string {
    let criticalCount: number = 0;
    let highCount: number = 0;
    let moderateCount: number = 0;
    const summary: Map<number, string> = parseSummary();
    summary.forEach((v: string) => {
        if (v === 'critical') {
            criticalCount++;
        }
        if (v === 'high') {
            highCount++;
        }
        if (v === 'moderate') {
            moderateCount++;
        }
    });
    let markdown: string = '';
    // Build the table header.
    markdown += '| Moderate | High | Critical |';
    // Build the table header separator.
    markdown += '\n|:---|:---|:---|\n';
    // Build the table row.
    markdown += `| ${moderateCount} | ${highCount} | ${criticalCount} |\n`;
    return markdown;
}

/**
 * Display the results in markdown format.
 */
export function display(): void {
    const date = new Date();
    const dateStr: string = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} at ${date.getHours()}:${getMinutes(date)} UTC`;
    let content: string = '';
    const summary: string = buildSummaryTable();
    const results: string = buildResultsTable();
    content += '<div align=\'center\'><br /><img src="https://raw.githubusercontent.com/vince-fugnitto/security-audit/master/assets/security-header.png" width="400px"/></div>\n\n';
    content += `### Security Audit - ${dateStr}\n-- -\n`;
    content += '\n#### Scan Summary\n';
    content += `\n${summary}\n`;
    content += '\n#### Scan Details\n';
    content += `\n${results}\n`;
    fs.writeFileSync(`${dir.dir}/docs/README.md`, content);
}

/**
 * Escape pipes (`|`) for displaying markdown.
 * @param str the string to escape.
 */
export function escapePipes(str: string): string {
    return str.toString().replace(/\|/g, '\\|');
}

/**
 * Get the severity code.
 * - The higher the code the higher the severity.
 * @param severity the vulnerability severity.
 */
export function getSeverityCode(severity: string): number {
    const normalized: string = severity.toLowerCase();
    if (normalized === 'critical') {
        return 1;
    } else if (normalized === 'high') {
        return 2;
    } else {
        return 3;
    }
}

/**
 * Compare two `Result` by their severity.
 * @param a the first result.
 * @param b the second result.
 */
export function compareSeverity(a: Result, b: Result): number {
    return a.severityCode - b.severityCode;
}

/**
 * Get a human readable name for the type of dependency.
 * @param result the audit result.
 *
 * @returns the type of severity, either `dependency` or `devDependency`.
 */
export function getDev(result: Result): string {
    return result.isDev ? 'devDependency' : 'dependency';
}

/**
 * Get the formatted minutes.
 * @param date the current date object.
 *
 * @returns the formatted minutes.
 */
export function getMinutes(date: Date): string {
    const minutes = date.getMinutes();
    return minutes > 9 ? `${minutes}` : `0${minutes}`;
}

display();