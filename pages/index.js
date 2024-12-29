import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout, { siteTitle } from "../components/Layout"
import utilStyle from "../styles/utils.module.css";
import { getPostsData } from "../lib/post";

//SSGの場合　外部から一回だけデータを持ってくる
export async function getStaticProps() {  //getStaticPropsはSSGの場合に使う　外部にデータがったときにプリレンダリングのために最初に取り込む作業
  const allPostsData = getPostsData(); //id,title,date,サムネイル  ライブラリのポストでマークダウンファイルの情報を取得？
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    }
  }
}

//SSRの場合
// export async function getServeSideProps(context) {
//   return {
//     prpps: {
//       //コンポーネントに渡すためのprops
//     }
//   }
// }

export default function Home({ allPostsData }) {
  return <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className={utilStyle.headingMd}>
      <p>
        私はUdemmyにてネクストを勉強中です
      </p>
    </section>


    <section>
      <h2>📝エンジニアのブログ</h2>
      <div className={styles.grid}>
        {allPostsData.map(({ id, title, date, thumbnail }) => (　　　//オールポストデータ（マークダウンファイルの情報を取得済み）から一つづつデータを持ってくる 
          <article key={id}>
            <Link href={`/posts/${id}`}>
              <img src={`${thumbnail}`} className={styles.thumbnailImage}></img>
            </Link>
            <Link href={`/posts/${id}`}
              className={utilStyle.boldText}>{title}
            </Link>

            <br />
            <small className={utilStyle}>{date}</small>
          </article>

        ))}
      </div>
    </section>
  </Layout>;
}

