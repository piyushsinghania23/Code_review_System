const { spawn } = require("child_process");

function runService(name, cwd) {
  const isWindows = process.platform === "win32";
  const command = isWindows ? "cmd" : "npm";
  const args = isWindows ? ["/c", "npm.cmd", "run", "dev"] : ["run", "dev"];

  const child = spawn(command, args, {
    cwd,
    stdio: "inherit",
    shell: false,
  });

  child.on("exit", (code) => {
    if (code !== 0) {
      console.error(`[${name}] exited with code ${code}`);
    }
  });

  child.on("error", (error) => {
    console.error(`[${name}] failed to start: ${error.message}`);
  });

  return child;
}

const backend = runService("BackEnd", "BackEnd");
const frontend = runService("Frontend", "Frontend");

function shutdown() {
  backend.kill("SIGINT");
  frontend.kill("SIGINT");
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
