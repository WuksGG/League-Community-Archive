import NextLink from 'next/link';
import { getCategories } from '../../../components/Categories/helpers';
import { NextPage, GetServerSideProps } from 'next';
import { Applications } from '@prisma/client';

type CategoriesProps = {
  locale: string | undefined;
  categories: Applications[];
};
const Categories: NextPage<CategoriesProps> = ({ categories }) => {
  return (
    <>
      {categories.map((category) => {
        return (
          <NextLink href={`/en/c/${category.shortName}`} key={category.id}>
            <div>{category.name}</div>
          </NextLink>
        );
      })}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<CategoriesProps> = async (
  context,
) => {
  const categories = await getCategories();
  return {
    props: {
      locale: context.query.locale as string | undefined,
      categories,
    },
  };
};

export default Categories;
