import { Context as PluginContext } from "@ubiquity-os/plugin-sdk";
import { Env } from "./env";
import { PluginSettings } from "./plugin-input";

/**
 * Update `manifest.json` with any events you want to support like so:
 *
 * ubiquity:listeners: ["issue_comment.created", ...]
 */
export type SupportedEvents = "issue_comment.created" | "pull_request_review_comment.created";

export type Context<T extends SupportedEvents = SupportedEvents> = PluginContext<PluginSettings, Env, null, T>;
