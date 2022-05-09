import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className="w-100 flex  flex-col rounded-full bg-cyan-700 text-center text-xl text-red-100">
      UIライブラリ集
    </div>
  );
};

export default Home;
