import { createActionsPlugin } from "@ubiquity-os/plugin-sdk";
import { LOG_LEVEL, LogLevel } from "@ubiquity-os/ubiquity-os-logger";
import { runPlugin } from "./index";
import { Env, envSchema, PluginSettings, pluginSettingsSchema, SupportedEvents } from "./types";

type ActionPluginOptions = NonNullable<Parameters<typeof createActionsPlugin<PluginSettings, Env, null, SupportedEvents>>[1]>;

export default createActionsPlugin<PluginSettings, Env, null, SupportedEvents>(
  (context) => {
    return runPlugin(context);
  },
  {
    logLevel: (process.env.LOG_LEVEL as LogLevel) || LOG_LEVEL.INFO,
    settingsSchema: pluginSettingsSchema as unknown as ActionPluginOptions["settingsSchema"],
    envSchema: envSchema as unknown as ActionPluginOptions["envSchema"],
    ...(process.env.KERNEL_PUBLIC_KEY && { kernelPublicKey: process.env.KERNEL_PUBLIC_KEY }),
    postCommentOnError: true,
    bypassSignatureVerification: process.env.NODE_ENV === "local",
  }
);
