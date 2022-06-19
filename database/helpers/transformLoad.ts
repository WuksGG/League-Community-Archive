/* eslint-disable indent */
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import prisma from '../utils/dbClient';

const MAX_RETRY_COUNT = 10;

async function processComment(
  comment: Record<string, any>,
  discussion: Record<string, any>,
  retry: number = 0,
) {
  const { user, replies } = comment;
  try {
    await prisma.comment.create({
      data: {
        id: comment.id,
        discussion: {
          connect: { id: discussion.id },
        },
        message: comment.message,
        user: {
          connectOrCreate: {
            where: {
              id: +user.id,
            },
            create: {
              id: +user.id,
              name: user.name,
              level: +user.lolSummonerLevel,
              icon: +user.lolProfileIcon,
              region: user.realm,
              isModerator: user.isModerator,
              isRioter: user.isRioter,
              banEndsAt: user.banEndsAt ? new Date(user.banEndsAt) : null,
              modifiedAt: user.modifiedAt ? new Date(user.modifiedAt) : null,
              createdAt: new Date(user.createdAt),
            },
          },
        },
        parentId: comment.parentCommentId,
        createdAt: comment.createdAt ? new Date(comment.createdAt) : null,
        modifiedAt: comment.modifiedAt ? new Date(comment.modifiedAt) : null,
        upvotes: comment.upVotes,
        downvotes: comment.downVotes,
        numChildren: comment.numChildren,
      },
    });
    if (user.isRioter) {
      await prisma.riotPost.create({
        data: {
          discussionId: discussion.id,
          commentId: comment.id,
          createdAt: discussion.createdAt && new Date(discussion.createdAt),
        },
      });
    }
    // process.stdout.write(`${discussion.id}, ${comment.id}\n`);
    // eslint-disable-next-line no-use-before-define
    await processComments(replies.comments, discussion);
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (retry >= MAX_RETRY_COUNT) {
        console.log(`Max retries exceeded (${MAX_RETRY_COUNT}).`);
        return;
      }
      if (e.code === 'P2002') {
        if (retry > 5) {
          console.log(
            `Unique violation exception on comment ${discussion.id}, ${
              comment.id
            } - attempt #${retry + 1}`,
          );
        }
        await processComment(comment, discussion, retry + 1);
      } else {
        console.log(`Unknown error on: ${discussion.id}, ${comment.id}`);
        console.log(e);
      }
    }
  }
}

async function processComments(
  comments: any[],
  discussion: Record<string, any>,
) {
  // comments.forEach(async (comment) => {
  //   await processComment(comment, discussion);
  // });
  await Promise.all(
    comments.map((comment) => processComment(comment, discussion)),
  );
}

async function processDiscussion(
  discussion: Record<string, any>,
  retry: number = 0,
) {
  const { application, user } = discussion;
  try {
    await prisma.discussion.create({
      data: {
        id: discussion.id,
        title: discussion.title,
        application: {
          connectOrCreate: {
            where: {
              id: application.id,
            },
            create: {
              id: application.id,
              name: application.name,
              shortName: application.shortName,
              locale: application.locale,
            },
          },
        },
        user: !user
          ? undefined
          : {
              connectOrCreate: {
                where: {
                  id: +user.id,
                },
                create: {
                  id: +user.id,
                  name: user.name,
                  level: +user.lolSummonerLevel,
                  icon: +user.lolProfileIcon,
                  region: user.realm,
                  isModerator: user.isModerator,
                  isRioter: user.isRioter,
                  banEndsAt: user.banEndsAt ? new Date(user.banEndsAt) : null,
                  modifiedAt: user.modifiedAt
                    ? new Date(user.modifiedAt)
                    : null,
                  createdAt: new Date(user.createdAt),
                },
              },
            },
        upvotes: discussion.upVotes,
        downvotes: discussion.downVotes,
        viewCount: discussion.viewCount,
        softComments: discussion.softComments,
        totalComments: discussion.totalComments,
        createdAt: new Date(discussion.createdAt),
        modifiedAt: discussion.modifiedAt
          ? new Date(discussion.modifiedAt)
          : null,
        lastCommentedAt: discussion.lastCommentedAt
          ? new Date(discussion.lastCommentedAt)
          : null,
        contentType: discussion.contentType,
        content: discussion.content || undefined,
        hasRioterComments: discussion.hasRioterComments,
      },
    });
    if (user.isRioter) {
      await prisma.riotPost.create({
        data: {
          discussionId: discussion.id,
          createdAt: discussion.createdAt && new Date(discussion.createdAt),
        },
      });
    }
    if (discussion.isSticky) {
      const appResult = await prisma.application.findUnique({
        where: {
          id: application.id,
        },
      });
      const posts = appResult?.stickiedPosts;
      await prisma.application.update({
        where: {
          id: application.id,
        },
        data: {
          stickiedPosts: Array.isArray(posts)
            ? [...posts, discussion.id]
            : [discussion.id],
        },
      });
    }
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (retry >= MAX_RETRY_COUNT) {
        console.log(`Max retries exceeded (${MAX_RETRY_COUNT}).`);
        return;
      }
      if (e.code === 'P2002') {
        if (retry > 5) {
          console.log(
            `Unique violation exception on discussion ${
              discussion.id
            } - attempt #${retry + 1}`,
          );
        }
        await processDiscussion(discussion, retry + 1);
      } else {
        console.log(`Unknown error on: ${discussion.id}`);
        console.log(e);
      }
    }
  }
}

async function transformAndLoad({ discussion }: Record<string, any>) {
  // if (discussion.id !== '0TZ1NNEw') return;
  // console.log(discussion);
  await processDiscussion(discussion);
  await processComments(discussion.comments.comments, discussion);
}

export default transformAndLoad;
