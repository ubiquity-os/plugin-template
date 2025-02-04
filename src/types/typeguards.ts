import { Context } from "./context";

/**
 * Typeguards are most helpful when you have a union type, and you want to narrow it down to a specific one.
 * In other words, if `SupportedEvents` has multiple types then these restrict the scope
 * of `context` to a specific event payload.
 */

/**
 * Restricts the scope of `context` to the `issue_comment.created` payload.
 */
export function isCommentEvent(context: Context): context is Context {
  return context.eventName === "issue_comment.created" || context.eventName === "pull_request_review_comment.created";
}
