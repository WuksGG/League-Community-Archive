import { getCategories } from '../../../components/Categories/helpers';
import NextLink from 'next/link';

const Categories = (props) => {
  return props.categories.map((category) => {
    return (
      <NextLink href={`/en/c/${category.shortName}`} key={category.id}>
        <div>{category.name}</div>
      </NextLink>
    );
  });
};

export const getServerSideProps = async (context) => {
  const categories = await getCategories();
  console.log(categories);
  return {
    props: { locale: context.query.locale, categories },
  };
};

export default Categories;
