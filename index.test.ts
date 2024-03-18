import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";

describe("All", () => {
  // Dir that contains files used for test.
  const testSrcDir = path.join(__dirname, "test-dir");
  // Dir in which the test performs.
  const testDir = path.join(__dirname, "test-dir-tmp");

  const typedocConfig = {
    $schema: "https://typedoc.org/schema.json",
    entryPoints: ["./index.ts"],
  } as const;

  beforeEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }

    // Fill the test dir with needed content.
    fs.mkdirSync(testDir);
    for (const f of ["README.md", "index.ts", "package.json"]) {
      fs.cpSync(path.join(testSrcDir, f), path.join(testDir, f));
    }
  });

  test("404 page generated with default config", () => {
    fs.writeFileSync(
      path.join(testDir, "typedoc.json"),
      JSON.stringify(typedocConfig),
    );
    spawnSync("npm", ["install"], {
      cwd: testDir,
    });
    spawnSync("npx", ["typedoc", "--plugin", `${__dirname}/dist/index.js`], {
      cwd: testDir,
    });
    const page404Path = path.join(testDir, "docs", "404.html");
    expect(fs.existsSync(page404Path)).toBeTruthy();
    expect(fs.readFileSync(page404Path, "utf-8")).toContain(
      "404 Page Not Found",
    );
  });
});
