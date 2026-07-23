import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";

const command = process.argv[2] ?? "build";
const port = process.env.PORT ?? "3000";
const wasmDir = path.join(process.cwd(), "node_modules", "@next", "swc-wasm-nodejs");
const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");

const args =
  command === "dev"
    ? [nextBin, "dev", "--webpack", "-H", "127.0.0.1", "-p", port]
    : [nextBin, "build", "--webpack"];

const child = spawn(process.execPath, args, {
  env: {
    ...process.env,
    NEXT_TEST_WASM: "1",
    NEXT_TEST_WASM_DIR: wasmDir,
  },
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  }

  process.exit(code ?? 1);
});
