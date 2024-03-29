/** @license Apache-2.0
 *
 * Copyright 2024 8 Hobbies, LLC <hong@8hobbies.com>
 *
 * Licensed under the Apache License, Version 2.0(the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";

const npmExec = process.platform === "win32" ? "npm.cmd" : "npm";
const npxExec = process.platform === "win32" ? "npx.cmd" : "npx";

describe("All", () => {
  // Dir that contains files used for test.
  const testSrcDir = path.join(__dirname, "test-dir");
  // Dir in which the test performs.
  const testDir = path.join(__dirname, "test-dir-tmp");
  // Package version number.
  const packageJson: unknown = JSON.parse(
    fs.readFileSync("package.json", "utf-8"),
  );
  if (
    typeof packageJson !== "object" ||
    packageJson === null ||
    !("version" in packageJson) ||
    typeof packageJson.version !== "string"
  ) {
    throw new Error("Invalid package version in package.json.");
  }
  const packageVersion = packageJson.version;

  const minTypedocConfig = {
    $schema: "https://typedoc.org/schema.json",
    entryPoints: ["./index.ts"],
    plugin: ["@8hobbies/typedoc-plugin-404"],
  } as const;

  beforeEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }

    // Fill the test dir with needed content.
    fs.mkdirSync(testDir);
    for (const f of [
      "README.md",
      "index.ts",
      "package.json",
      "tsconfig.json",
    ]) {
      fs.cpSync(path.join(testSrcDir, f), path.join(testDir, f));
    }
  });

  for (const typedocConfig of [
    minTypedocConfig,
    { ...minTypedocConfig, page404Content: "I cannot find this page" },
    {
      ...minTypedocConfig,
      page404Content: '<p class="404-test">I cannot find this page</p>',
    },
  ]) {
    test(`404 page generated with 404Content configured as ${"page404Content" in typedocConfig ? `"${typedocConfig.page404Content}"` : "default"}`, () => {
      fs.writeFileSync(
        path.join(testDir, "typedoc.json"),
        JSON.stringify(typedocConfig),
      );
      spawnSync(npmExec, ["pack"]);
      spawnSync(npmExec, ["install"], {
        cwd: testDir,
      });
      spawnSync(
        npmExec,
        ["install", `../8hobbies-typedoc-plugin-404-${packageVersion}.tgz`],
        {
          cwd: testDir,
        },
      );
      spawnSync(npxExec, ["typedoc"], {
        cwd: testDir,
      });
      const page404Path = path.join(testDir, "docs", "404.html");
      expect(fs.existsSync(page404Path)).toBeTruthy();
      const htmlString =
        "page404Content" in typedocConfig
          ? typedocConfig.page404Content
          : "404 Page Not Found";
      expect(fs.readFileSync(page404Path, "utf-8")).toContain(
        `<div class="404-content">${htmlString}</div>`,
      );
    });
  }
});
