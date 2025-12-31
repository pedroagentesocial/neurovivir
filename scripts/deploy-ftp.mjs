import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ftp from "basic-ftp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localDir = path.resolve(__dirname, "..", "dist");
const host = process.env.FTP_HOST || "";
const user = process.env.FTP_USER || "";
const password = process.env.FTP_PASS || "";
const port = Number(process.env.FTP_PORT || "21");
const serverDir = process.env.FTP_DIR || "public_html";
const htaccessPath = path.resolve(__dirname, "..", "public", ".htaccess");

async function main() {
  if (!fs.existsSync(localDir)) {
    throw new Error(`Directorio local no existe: ${localDir}. Ejecuta el build antes de desplegar.`);
  }
  if (!host || !user || !password) {
    throw new Error("Faltan credenciales FTP en variables de entorno: FTP_HOST, FTP_USER, FTP_PASS.");
  }
  const client = new ftp.Client();
  client.ftp.verbose = false;
  try {
    await client.access({
      host,
      user,
      password,
      port,
      secure: false
    });
    await client.ensureDir(serverDir);
    await client.uploadFromDir(localDir);
    if (fs.existsSync(htaccessPath)) {
      await client.uploadFrom(htaccessPath, ".htaccess");
    }
  } finally {
    client.close();
  }
}

main().catch((err) => {
  console.error(String(err?.message || err));
  process.exit(1);
});
