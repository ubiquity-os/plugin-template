import { LOG_LEVEL, LogLevel } from "@ubiquity-os/ubiquity-os-logger";
import { createPlugin, type Options as PluginSdkOptions } from "@ubiquity-os/plugin-sdk";
import { Manifest, resolveRuntimeManifest } from "@ubiquity-os/plugin-sdk/manifest";
import { ExecutionContext } from "hono";
import { env } from "hono/adapter";
import manifest from "../manifest.json" with { type: "json" };
import { runPlugin } from "./index";
import { Env, envSchema, PluginSettings, pluginSettingsSchema, SupportedEvents } from "./types";

function buildRuntimeManifest(request: Request) {
  const runtimeManifest = resolveRuntimeManifest(manifest as Manifest);
  return {
    ...runtimeManifest,
    homepage_url: new URL(request.url).origin,
  };
}

export default {
  async fetch(request: Request, serverInfo: Deno.ServeHandlerInfo, executionCtx?: ExecutionContext) {
    const runtimeManifest = buildRuntimeManifest(request);
    if (new URL(request.url).pathname === "/manifest.json") {
      return Response.json(runtimeManifest);
    }

    const environment = env<Env>(request as never);
    return createPlugin<PluginSettings, Env, null, SupportedEvents>(
      (context) => {
        return runPlugin(context);
      },
      runtimeManifest,
      {
        envSchema: envSchema as unknown as PluginSdkOptions["envSchema"],
        postCommentOnError: true,
        settingsSchema: pluginSettingsSchema as unknown as PluginSdkOptions["settingsSchema"],
        logLevel: (environment.LOG_LEVEL as LogLevel) || LOG_LEVEL.INFO,
        kernelPublicKey: environment.KERNEL_PUBLIC_KEY,
        bypassSignatureVerification: environment.NODE_ENV === "local",
      }
    ).fetch(request, serverInfo, executionCtx);
  },
};
