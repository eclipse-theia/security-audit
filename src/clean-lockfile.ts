/********************************************************************************
 * Copyright (C) 2020 Ericsson
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
 * Cleans the lockfile of any dependencies which causes the
 * `yarn audit` to fail to execute successfully.
 */
export async function cleanYarnLock(): Promise<void> {
    console.log('----------------------\nPerforming Lockfile Cleanup...\n----------------------\n');
    const cwd = path.parse(__dirname);
    const lockfile = `${cwd.dir}/theia-application/yarn.lock`;
    fs.readFile(lockfile, 'utf8', (err, data) => {
        if (err) {
            return;
        }
        const updatedLockfile = data
            .replace(
                `
ps-tree@^1.2.0:
  version "1.2.0"
  resolved "https://registry.yarnpkg.com/ps-tree/-/ps-tree-1.2.0.tgz#5e7425b89508736cdd4f2224d028f7bb3f722ebd"
  integrity sha512-0VnamPPYHl4uaU/nSFeZZpR21QAWRz+sRv4iW9+v/GS/J5U5iZB5BNN6J0RMoOvdx2gWM2+ZFMIm58q24e4UYA==
  dependencies:
    event-stream "=3.3.4"
`, '')
            .replace(
                `
event-stream@=3.3.4:
  version "3.3.4"
  resolved "https://registry.yarnpkg.com/event-stream/-/event-stream-3.3.4.tgz#4ab4c9a0f5a54db9338b4c34d86bfce8f4b35571"
  integrity sha1-SrTJoPWlTbkzi0w02Gv86PSzVXE=
  dependencies:
    duplexer "~0.1.1"
    from "~0"
    map-stream "~0.1.0"
    pause-stream "0.0.11"
    split "0.3"
    stream-combiner "~0.0.4"
    through "~2.3.1"
`, '');
        fs.writeFile(lockfile, updatedLockfile, 'utf8', (err) => {
            if (err) {
                return console.log(err);
            };
        });
    });
}

cleanYarnLock();
