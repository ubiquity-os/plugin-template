import { LOG_LEVEL } from "@ubiquity-os/ubiquity-os-logger";
import { createPlugin } from "@ubiquity-os/plugin-sdk";
import { resolveRuntimeManifest } from "@ubiquity-os/plugin-sdk/manifest";
import { env } from "hono/adapter";
import manifest from "../manifest.json" with { type: "json" };
import { runPlugin } from "./index";
import { envSchema, pluginSettingsSchema } from "./types";

function buildRuntimeManifest(request) {
  const runtimeManifest = resolveRuntimeManifest(manifest);
  return {
    ...runtimeManifest,
    homepage_url: new URL(request.url).origin,
  };
}

export default {
  async fetch(request, serverInfo, executionCtx) {
    const runtimeManifest = buildRuntimeManifest(request);
    if (new URL(request.url).pathname === "/manifest.json") {
      return Response.json(runtimeManifest);
    }

    const environment = env(request);
    return createPlugin(
      (context) => {
        return runPlugin(context);
      },
      runtimeManifest,
      {
        envSchema: envSchema,
        postCommentOnError: true,
        settingsSchema: pluginSettingsSchema,
        logLevel: environment.LOG_LEVEL || LOG_LEVEL.INFO,
        kernelPublicKey: environment.KERNEL_PUBLIC_KEY,
        bypassSignatureVerification: environment.NODE_ENV === "local",
      }
    ).fetch(request, serverInfo, executionCtx);
  },
};
