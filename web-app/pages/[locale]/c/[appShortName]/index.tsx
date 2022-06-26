import { GetServerSideProps, NextPage } from 'next';

type ApplicationProps = {
  region: string | undefined;
};

const Application: NextPage<ApplicationProps> = (props) => {
  return <div>{props.region}</div>;
};

export const getServerSideProps: GetServerSideProps<ApplicationProps> = async (
  context,
) => {
  console.log({ q: context.query });
  return {
    props: {
      region: 'na',
    },
  };
};

export default Application;
