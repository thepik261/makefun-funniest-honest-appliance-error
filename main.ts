// The Funniest Honest Appliance Error — make.fun entry
// Writes a single funny honest appliance error message (under 200
// characters) to /output/entry.txt.
// Node stdlib only, deterministic, no network, no third-party packages.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ERROR_MESSAGE =
  "ERROR E01: Light works. Cooling does not. I am now a cupboard with a light in it.";

function main(): void {
  const text = ERROR_MESSAGE.trim();
  if (text.length < 1 || text.length > 200) {
    throw new Error(`error message must be 1-200 characters, got ${text.length}`);
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", text + "\n", "utf8");
  // Verify what was actually written: the gate reads this file, so fail
  // loudly here rather than shipping a truncated or mismatched entry.
  const written = readFileSync("/output/entry.txt", "utf8").replace(/\n$/, "");
  if (written !== text) {
    throw new Error("entry.txt does not match the expected error message");
  }
  if (written.length < 1 || written.length > 200) {
    throw new Error(`written entry must be 1-200 characters, got ${written.length}`);
  }
  // The grader collects outputs as another user: leave the file and
  // directory world-readable (only files this program itself creates).
  try {
    chmodSync("/output/entry.txt", 0o644);
  } catch {
    // best effort; default umask usually already yields a readable file
  }
  try {
    chmodSync("/output", 0o755);
  } catch {
    // best effort
  }
}

main();
