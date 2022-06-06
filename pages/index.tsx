import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home page" />
        <link rel="icon" href="/fav.png" />
      </Head>

      <main>
        <h1>Hello word!</h1>
        <h2>Welcome to Super Timesheet!</h2>
      </main>
    </div>
  );
};

export default Home;
