import { Octokit } from "@octokit/rest";
import { EmitterWebhookEvent as WebhookEvent, EmitterWebhookEventName as WebhookEventName } from "@octokit/webhooks";
import { Env } from "./env";
import { PluginSettings } from "./plugin-inputs";
import { Logs } from "@ubiquity-dao/ubiquibot-logger";

/**
 * Update `manifest.json` with any events you want to support like so:
 *
 * ubiquity:listeners: ["issue_comment.created", ...]
 */
export type SupportedEventsU =
  | "issue_comment.created"
  | "issue_comment.deleted"
  | "issue_comment.edited"
  | "pull_request.assigned"
  | "pull_request.auto_merge_disabled"
  | "pull_request.auto_merge_enabled"
  | "pull_request.closed"
  | "pull_request.converted_to_draft"
  | "pull_request.demilestoned"
  | "pull_request.dequeued"
  | "pull_request.edited"
  | "pull_request.enqueued"
  | "pull_request.labeled"
  | "pull_request.locked"
  | "pull_request.milestoned"
  | "pull_request.opened"
  | "pull_request.ready_for_review"
  | "pull_request.reopened"
  | "pull_request.review_request_removed"
  | "pull_request.review_requested"
  | "pull_request.synchronize"
  | "pull_request.unassigned"
  | "pull_request.unlabeled"
  | "pull_request.unlocked"
  | "pull_request_review"
  | "pull_request_review.dismissed"
  | "pull_request_review.edited"
  | "pull_request_review.submitted"
  | "pull_request_review_comment"
  | "pull_request_review_comment.created"
  | "pull_request_review_comment.deleted"
  | "pull_request_review_comment.edited"
  | "pull_request_review_thread"
  | "pull_request_review_thread.resolved"
  | "pull_request_review_thread.unresolved";

export type SupportedEvents = {
  [K in SupportedEventsU]: K extends WebhookEventName ? WebhookEvent<K> : never;
};

export interface Context<T extends SupportedEventsU = SupportedEventsU, TU extends SupportedEvents[T] = SupportedEvents[T]> {
  eventName: T;
  payload: TU["payload"];
  octokit: InstanceType<typeof Octokit>;
  config: PluginSettings;
  env: Env;
  logger: Logs;
}
