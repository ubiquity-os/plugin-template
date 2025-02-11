import { helloWorld } from "./handlers/hello-world";
import { Context } from "./types";
import { isCommentEvent } from "./types/typeguards";

/**
 * The main plugin function. Split for easier testing.
 */
export async function runPlugin(context: Context) {
  const { logger, eventName } = context;

  if (isCommentEvent(context)) {
    return await helloWorld(context);
  }

  logger.error(`Unsupported event: ${eventName}`);
}
