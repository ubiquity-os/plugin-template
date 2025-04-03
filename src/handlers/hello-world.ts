import { Context } from "../types";

/**
 * NOTICE: Remove this file or use it as a template for your own plugins.
 *
 * This encapsulates the logic for a plugin if the only thing it does is say "Hello, world!".
 *
 * Try it out by running your local kernel worker and running the `bun worker` command.
 * Comment on an issue in a repository where your GitHub App is installed and see the magic happen!
 *
 * Logger examples are provided to show how to log different types of data.
 */
export async function helloWorld(context: Context) {
  const {
    logger,
    payload,
    config: { configurableResponse, customStringsUrl },
    commentHandler,
  } = context;

  const sender = payload.comment.user?.login;
  const repo = payload.repository.name;
  const issueNumber = "issue" in payload ? payload.issue.number : payload.pull_request.number;
  const owner = payload.repository.owner.login;
  const body = payload.comment.body;

  if (!RegExp(/^\/hello/i).exec(body)) {
    logger.error(`Invalid use of slash command, use "/hello".`, { body });
    return;
  }

  logger.info("Hello, world!");
  logger.debug(`Executing helloWorld:`, { sender, repo, issueNumber, owner });

  await commentHandler.postComment(context, logger.ok(configurableResponse));
  if (customStringsUrl) {
    const response = await fetch(customStringsUrl).then((value) => value.json());
    await commentHandler.postComment(context, logger.ok(response.greeting));
  }

  // Throw errors get posted by the SDK if "postCommentOnError" is set to true.

  logger.ok(`Successfully created comment!`);
  logger.verbose(`Exiting helloWorld`);
}
