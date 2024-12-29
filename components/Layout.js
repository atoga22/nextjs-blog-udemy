//レイアウトコンポーネントは共通する部分を実装する役割
import Head from "next/head";
import styles from "./lauout.module.css";
import utilStyles from "../styles/utils.module.css"
import Link from "next/link";

const name="Oga Taku";
export const siteTitle="Next.js blog";
function Layout({children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head> 
            <header className={styles.header}>
                {home ?(    //home ? ():()  ⇦　homeという記述がある場合は左のカッコ、ない場合は右のカッコのhtmlが実行されるという意味　使い分けが可能
                    <>
                    <img
                    src="/images/profile.png"
                    className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}/>
                    <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>  //layout home となっている場合、アイコン画像にstyles.headerHomeImage　（少し大きめのサイズ）が適用される
                ):(
                    <>
                    <img
                    src="/images/profile.png"
                    className={`${utilStyles.borderCircle} `}/>
                    <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </> //styles.headerHomeImage （少し大きめのサイズ　は適用されない）
                )}
                    
                    
             </header>
            <main>{children}</main>
            {!home && (     //!home && ←　 もしhomeでなければ　というif文の役割
                <div>
                    <Link href="/">⇦ホームへ戻る</Link>
                </div>
            )}
        </div>
    );
}

export default Layout;