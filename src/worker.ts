import { LOG_LEVEL, LogLevel } from "@ubiquity-os/ubiquity-os-logger";
import { createPlugin } from "@ubiquity-os/plugin-sdk";
import { Manifest } from "@ubiquity-os/plugin-sdk/manifest";
import { ExecutionContext } from "hono";
import manifest from "../manifest.json" with { type: "json" };
import { runPlugin } from "./index";
import { Env, envSchema, PluginSettings, pluginSettingsSchema, SupportedEvents } from "./types";

type WorkerPluginOptions = NonNullable<Parameters<typeof createPlugin<PluginSettings, Env, null, SupportedEvents>>[2]>;

export default {
  async fetch(request: Request, env: Env, executionCtx?: ExecutionContext) {
    return createPlugin<PluginSettings, Env, null, SupportedEvents>(
      (context) => {
        return runPlugin(context);
      },
      manifest as Manifest,
      {
        envSchema: envSchema as unknown as WorkerPluginOptions["envSchema"],
        postCommentOnError: true,
        settingsSchema: pluginSettingsSchema as unknown as WorkerPluginOptions["settingsSchema"],
        logLevel: (env.LOG_LEVEL as LogLevel) || LOG_LEVEL.INFO,
        kernelPublicKey: env.KERNEL_PUBLIC_KEY,
        bypassSignatureVerification: process.env.NODE_ENV === "local",
      }
    ).fetch(request, env, executionCtx);
  },
};
