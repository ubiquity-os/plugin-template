import { LogLevel } from "@ubiquity-dao/ubiquibot-logger";
import { createActionsPlugin } from "@ubiquity-os/plugin-sdk";
import { runPlugin } from "./index";
import { Env, envSchema, PluginSettings, pluginSettingsSchema, SupportedEventsU } from "./types";

export default createActionsPlugin<PluginSettings, Env, null, SupportedEventsU>(
  (context) => {
    return runPlugin(context);
  },
  {
    logLevel: (process.env.LOG_LEVEL as LogLevel) ?? "info",
    settingsSchema: pluginSettingsSchema,
    envSchema: envSchema,
    ...(process.env.KERNEL_PUBLIC_KEY && { kernelPublicKey: process.env.KERNEL_PUBLIC_KEY }),
    postCommentOnError: true,
  }
);
