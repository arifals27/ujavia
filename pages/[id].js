import React from "react";
import Card from "../components/Cards";
import Pagination from "../components/Pagination";
import Head from "next/head";

const Home = ({data, header}) => {
    return (
        <>
            <Head>
                <title>{`${data.site_title} - ${data.site_tagline}`}</title>
                <meta content={data.site_desc} name="description"/>
                <meta name="og:title" content={data.site_title}/>
                <meta name="og:description" content={data.site_desc}/>
                <meta name="og:url" content={header}/>
            </Head>
            <div className="w-auto pt-5">
                <div className="container my-6 mx-auto px-4 md:px-12">
                    <div className="flex">
                        <h2 className="font-extrabold text-3xl pb-3 border-b-4 border-blue-700 border-solid justify-self-start">Latest Video
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

const getData = async (page) => {
    const url = `${process.env.API_URL}page/${page}`
    const response = await fetch(url)
    return response.json()

}

export async function getServerSideProps(context) {
    context.res.setHeader('Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59')
    const data = await getData(context.params.id)
    return { props: {data : data, header : context.req.headers.host}}
}

export default Home