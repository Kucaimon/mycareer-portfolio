#!/usr/bin/env node
/**
 * Frees TCP port 3000 (macOS/Linux). Safe no-op if nothing listens.
 */
const { execSync } = require("node:child_process");

try {
  const out = execSync("lsof -ti tcp:3000", {
    encoding: "utf8",
    stdio: ["pipe", "pipe", "ignore"],
  }).trim();
  if (!out) process.exit(0);
  for (const pid of out.split(/\s+/)) {
    const n = Number(pid);
    if (Number.isFinite(n) && n > 0) {
      try {
        process.kill(n, "SIGKILL");
        console.log("free-port-3000: killed PID", n);
      } catch {
        /* ignore */
      }
    }
  }
} catch {
  /* lsof exits 1 when port is free */
}
