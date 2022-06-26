import { GetServerSideProps, NextPage } from 'next';
import { getDiscussions } from '../../../../components/Discussions/helpers';

type DiscussionsProps = {
  region: string | undefined;
  discussions: string;
};

const Discussions: NextPage<DiscussionsProps> = (props) => {
  const discussions = JSON.parse(props.discussions);
  console.log(discussions);
  // return discussions.map((discussion) => {
  //   return <div>{discussion.title}</div>;
  // });
};

export const getServerSideProps: GetServerSideProps<DiscussionsProps> = async (
  context,
) => {
  // console.log({ q: context.query });
  const result = await getDiscussions(context.query.appShortName);
  console.log({ result });
  return {
    props: {
      region: 'na',
      discussions: JSON.stringify(result?.Discussions),
    },
  };
};

export default Discussions;
