import { LogLevel } from "@ubiquity-dao/ubiquibot-logger";
import { createActionsPlugin } from "@ubiquity-os/plugin-sdk";
import { helloWorld } from "./handlers/hello-world";
import { Context, Env, envSchema, PluginSettings, pluginSettingsSchema, SupportedEventsU } from "./types";
import { isIssueCommentEvent } from "./types/typeguards";

/**
 * The main plugin function. Split for easier testing.
 */
export async function runPlugin(context: Context) {
  const { logger, eventName } = context;

  if (isIssueCommentEvent(context)) {
    return await helloWorld(context);
  }

  logger.error(`Unsupported event: ${eventName}`);
}

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
