import { Context } from "../types";

export async function contribReward(context: Context) {
  const {
    logger,
    payload,
    octokit,
    // config: { configurableResponse, },
  } = context;
  const contributors: Record<string, number> = {};

  const sender = payload.comment.user?.login;
  const repo = payload.repository.name;
  const issueNumber = payload.issue.number;
  const owner = payload.repository.owner.login;
  const body = payload.comment.body;

  if (!body.match(/rewards/i)) {
    logger.error(`Invalid use of slash command, use "/rewards".`, { body });
    return;
  }

  logger.info("Calculating rewards for contributor.");
  logger.debug(`Executing contribReward:`, { sender, repo, issueNumber, owner });

  try {
    const events = await octokit.issues.listEventsForTimeline({
      owner,
      repo,
      issue_number: issueNumber,
    });

    events.data.forEach((event) => {
      const contributor = event.actor?.login;
      if (!contributors[contributor]) {
        contributors[contributor] = 0;
      }
      contributors[contributor]++;
    });

    await octokit.issues.createComment({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      issue_number: payload.issue.number,
      body: JSON.stringify(contributors),
    });

    logger.info(`Contributors: ${JSON.stringify(contributors)}`);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error calculating rewards:`, { error });
      throw error;
    } else {
      logger.error(`Error calculating rewards:`, { error: new Error(String(error)) });
      throw error;
    }
  }

  logger.ok(`Successfully created comment!`);
  logger.verbose(`Exiting contribReward`);
}
