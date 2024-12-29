import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");
//mdファイルのデータを取り出す
export function getPostsData(){
    // const fetchData = await fetch("endpoint") //外部データを取得する際に使う　
    const filenames = fs.readdirSync(postsDirectory);
    const allPostsData = filenames.map((filename)=>{
        const id = filename.replace(/\.md$/, "");  //ファイル名（id）　replace関数でファイル名から「.md」を取り除いている


        //mマークダウンファイルを文字列として読み取る
        const fullPath = path.join(postsDirectory,filename);
        const fileContents = fs.readFileSync(fullPath,"utf8");

        const matterResult = matter(fileContents);

        //idとデータを返す
        return{
            id,
            ...matterResult.data,
        };
    });
    return allPostsData;
}


//getStaticPathでreturnで使うpathを取得する
export function getAllPostIds(){
    const filenames = fs.readdirSync(postsDirectory);
    return filenames.map((filename)=>{
        return{
            params:{
                id: filename.replace(/\.md$/,""), //ここのidは［］で囲った文字と一致させる
            },
        };
    });

}


//idに基づいてブログ投稿データを返す関数を作っていく↓
export async function getPostData(id){
    const fullPath = path.join(postsDirectory,`${id}.md`);
    const fileContent=fs.readFileSync(fullPath,"utf-8");

    const matterResult=matter(fileContent);

    // matterResult.content     //contentはマークダウンファイルの本文（文字列）の部分を指す　がマークダウン内の✳︎とかも文字列になってしまうので以下remarkを使う
    const blogContent = await remark().use(html).process(matterResult.content);
    const blogContentHTML = blogContent.toString();
    
    return{
        id,
        blogContentHTML,
        ...matterResult.data,
    }
}