import { GetServerSideProps, NextPage } from 'next';
import { getDiscussions } from '../../../../components/Discussions/helpers';

type DiscussionsProps = {
  region: string | undefined;
  data: string;
};

const Discussions: NextPage<DiscussionsProps> = (props) => {
  const data = JSON.parse(props.data);
  console.log(data);
  return <div>test</div>;
  // return discussions.map((discussion) => {
  //   return <div>{discussion.title}</div>;
  // });
};

export const getServerSideProps: GetServerSideProps<DiscussionsProps> = async (
  context,
) => {
  const shortName = context.query.appShortName as string | undefined;
  if (!shortName)
    return {
      notFound: true,
    };
  return {
    props: {
      region: 'na',
      data: JSON.stringify(await getDiscussions(shortName)),
    },
  };
};

export default Discussions;
