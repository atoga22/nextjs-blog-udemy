// 任意のURLをつける場合[]をつける必要あり

import Head from "next/head";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css";

export async function getStaticPaths() { //ここでゲットスタティックパスを使うことで外部のデータにもSSGを行うことができる
    const paths=getAllPostIds();

    return{
        paths,
        fallback: false, //ここのfalseは上のpathsではない他のパスだった場合は４０４のエラーが出る trueの場合は予期しないURLが打ち込まれた際に、動的にNEXTJSで生成してくれる（授業ではあまり触れず）
    }
}

export async function getStaticProps({params}){
    const postData=await getPostData(params.id);  //paramsでidを取得することによって受け渡すidが変わってくる　

    return{
        props:{
            postData,
        },
    };
}


export default function Post({postData}) {
    return (
       <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingX1}>{postData.title}</h1>
            <div className={utilStyles.lightText}>{postData.date}</div>
            <div dangerouslySetInnerHTML={{__html: postData.blogContentHTML }}/>
        </article>

       </Layout>
    );
}