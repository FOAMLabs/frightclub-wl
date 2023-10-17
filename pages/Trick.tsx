import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import XPath from "../components/Trick/Xpath";

const Xpage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>🧛‍♂️ Fright Club 🧟‍♂️</title>
        <meta
          content="3131 animated monsters ready for fun at the Fright Club"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <XPath />
      </main>

      <footer className={styles.footer}>
        {/* <a target="_blank" href='https://github.com/FOAMLabs/frightclub'>check out the code on github</a> */}
      </footer>
    </div>
  );
};

export default Xpage;
