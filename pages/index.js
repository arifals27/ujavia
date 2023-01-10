import React from "react";
import Card from "../components/Cards";
import Pagination from "../components/Pagination";
import Head from "next/head";
import Link from "next/link";

const Home = ({data, newpost}) => {

    return (
        <>
            <Head>
                <title>{`${data.site_title} - ${data.site_desc}`}</title>
                <meta content={data.site_desc} name="description"/>
                <meta name="og:title" content={data.site_title}/>
                <meta name="og:description" content={data.site_desc}/>
                <meta name="og:url" content={process.env.NEXT_PUBLIC_SITE}/>
            </Head>
            <div className="w-auto pt-5">
                <div className="container my-6 mx-auto px-4 md:px-12">
                    <div className="grid grid-cols-2 w-full">
                        <h2 className="font-extrabold text-3xl pb-3 border-b-4 border-blue-700 border-solid justify-self-start">New Release</h2>
                        <Link href={"/page/new-release"} className="absolute bg-pink-400 dark:bg-red-600 px-3 py-2 rounded-lg font-bold justify-self-end">More...</Link>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4 align-center justify-center">
                        {
                            newpost.itemLists.slice(0, 8).map((content, i) => {
                                return <Card key={content.id} content={content}/>
                            })
                        }
                    </div>
                </div>
                <div className="container my-6 mx-auto px-4 md:px-12">
                    <div className="flex">
                        <h2 className="text-bold text-3xl pb-3 border-b-4 border-solid">Latest Uploads
                        </h2>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4 align-center justify-center">
                        {
                            data.itemLists.map((content, i) => {
                                return <Card key={content.id} content={content}/>
                            })
                        }
                    </div>
                </div>
                <Pagination max={data.max_pages} now={data.current_page}/>
            </div>
        </>
        )
}

const getData = async (slug = "") => {
    const url = `${process.env.API_URL}${slug}`
    const response = await fetch(url)
    return response.json()

}

export async function getServerSideProps(context) {
    context.res.setHeader('Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59')
    const data = await getData()
    const newRelease = await getData("new-released/")
    return { props: {data : data, newpost : newRelease}}
}

export default Home