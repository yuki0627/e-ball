import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import { Network, Alchemy } from "alchemy-sdk";
const settings = {
  apiKey: "80zPAK2s95gqogJL4e_Pfg3smHYEXtrm", // Replace with your Alchemy API Key.
  network: Network.ETH_GOERLI, // Replace with your network.
};
const alchemy = new Alchemy(settings);

export default function Home() {
  const [image, setImage] = useState([])
  const collectionAddress = "0x71165B3Bc6a6CF64Cb74581703b5FC85d14373F3"
  const fetchData = async () => {
    let metadata = await alchemy.nft.getNftMetadata(
      collectionAddress,
      "1"
    )
    console.log('metadata:', metadata);
    console.log('metadata.media:', metadata.media);
    console.log('metadata.media[0].gateway:', metadata.media[0].gateway);

    console.log('decode:', decodeURIComponent(metadata.tokenUri));
    setImage(metadata.media[0].gateway);

    // Flag to omit metadata
    const omitMetadata = false;

    // Get all NFTs
    const { nfts } = await alchemy.nft.getNftsForContract(collectionAddress, {
      omitMetadata: omitMetadata,
    });

    let i = 1;

    for (let nft of nfts) {
      console.log(`${i}. ${nft.rawMetadata.image}`);
      i++;
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <img src={image} />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}