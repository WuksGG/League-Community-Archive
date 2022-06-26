import Discussions from '../../pages/[locale]/c/[appShortName]';
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
    // select: {
    //   id: true,

    //   Discussions: {
    //     orderBy: {
    //       createdAt: 'desc',
    //     },
    //     skip: offset,
    //     take: limit,
    //     include: { Users: true },
    //   },
    // },
    include: {
      Discussions: {
        orderBy: {
          createdAt: 'desc',
        },
        skip: offset,
        take: limit,
        include: { Users: true },
      },
    },
  });
  // console.log(application);
  return application;
  // const result = await prisma.discussions.findMany({
  //   skip: offset,
  //   take: limit,
  //   where: {
  //     Applications:
  //   },
  //   include: { Users: true },
  // });
  // return result;
};
