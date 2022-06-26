import prisma from '../../utils/database';

export const getCategories = async () => {
  return await prisma.applications.findMany();
};
