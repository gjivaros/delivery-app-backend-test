import { appConfig } from "../context";
import { createAppLog } from "./pino-app-logger";

export const appLog = createAppLog({
  level: "debug",
  file: appConfig.production ? "logs.log" : undefined,
});

export function debugLog(title: string, content: any) {
  appLog.debug(`
${"=".repeat(12)} [${title}] ${"=".repeat(12)}
${content}
${"=".repeat(28 + title.length)}`);
}

export function errorLog(title: string, content: any) {
  appLog.error(`
${"=".repeat(12)} [${title}] ${"=".repeat(12)}
${content}
${"=".repeat(28 + title.length)}`);
}

export function debugObject(data: any) {
  return JSON.stringify(data, null, 2);
}
