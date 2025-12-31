import chokidar from "chokidar";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const sh = promisify(exec);
const SITE_URL = process.env.SITE_URL || "https://neurovivir.com";
const BASE_PATH = process.env.BASE_PATH || "/";
const FTP_HOST = process.env.FTP_HOST || "";
const FTP_USER = process.env.FTP_USER || "";
const FTP_PASS = process.env.FTP_PASS || "";
const FTP_PORT = process.env.FTP_PORT || "21";
const FTP_DIR = process.env.FTP_DIR || "public_html";

let building = false;
let pending = false;

async function buildAndDeploy() {
  if (building) {
    pending = true;
    return;
  }
  building = true;
  try {
    console.log("[live] Building...");
    await sh(`SITE_URL="${SITE_URL}" BASE_PATH="${BASE_PATH}" npm run build`, { cwd: process.cwd(), maxBuffer: 10 * 1024 * 1024 });
    console.log("[live] Deploying via FTP...");
    await sh(
      `FTP_HOST="${FTP_HOST}" FTP_USER="${FTP_USER}" FTP_PASS="${FTP_PASS}" FTP_PORT="${FTP_PORT}" FTP_DIR="${FTP_DIR}" npm run deploy:ftp`,
      { cwd: process.cwd(), maxBuffer: 10 * 1024 * 1024 }
    );
    console.log("[live] Deploy complete");
  } catch (err) {
    console.error("[live] Error:", err?.stdout || err?.message || err);
  } finally {
    building = false;
    if (pending) {
      pending = false;
      buildAndDeploy();
    }
  }
}

const watchPaths = [
  path.resolve("src"),
  path.resolve("public"),
  path.resolve("astro.config.mjs"),
  path.resolve("package.json"),
];

const watcher = chokidar.watch(watchPaths, {
  ignoreInitial: true,
  awaitWriteFinish: { stabilityThreshold: 300, pollInterval: 100 },
});

let timer;
function trigger() {
  clearTimeout(timer);
  timer = setTimeout(buildAndDeploy, 250);
}

watcher.on("all", (event, changedPath) => {
  console.log("[live] Change:", event, changedPath);
  trigger();
});

console.log("[live] Watching for changes and auto-deploying...");
buildAndDeploy();
