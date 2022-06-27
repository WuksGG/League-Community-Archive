import prisma from '../../utils/database';

export const getDiscussions = async (
  shortName: string | undefined = '',
  offset = 0,
  limit = 20,
) => {
  const application = await prisma.applications.findUnique({
    where: {
      shortName: shortName,
    },
    select: {
      id: true,
      description: true,
      locale: true,
      name: true,
      shortName: true,
      totalPosts: true,
      Discussions: {
        orderBy: {
          createdAt: 'desc',
        },
        skip: offset,
        take: limit,
        select: {
          id: true,
          createdAt: true,
          title: true,
          upvotes: true,
          downvotes: true,
          hasRioterComments: true,
          viewCount: true,
          lastCommentedAt: true,
          softComments: true,
          totalComments: true,
          Users: true,
          Applications: {
            select: {
              id: true,
              locale: true,
              name: true,
              shortName: true,
            },
          },
        },
      },
    },
  });
  return application;
};
