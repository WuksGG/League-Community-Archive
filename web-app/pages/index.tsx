import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
// import styles from '../styles/Home.module.css';

type HomeProps = {
  region: string | undefined;
};

const Home: NextPage<HomeProps> = (props) => {
  return <div>{props.region}</div>;
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context,
) => {
  const { req } = context;
  const region = req?.headers.host?.split('.')[0];
  console.log(region);
  return {
    props: {
      region,
    },
  };
};

export default Home;
