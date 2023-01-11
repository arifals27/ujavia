import React from "react";
import Pagination from "../../../components/Pagination";
import Card from "../../../components/Cards";
import Head from "next/head";
import {useRouter} from "next/router";


const Released = ({data}) => {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>{`New Release - ${data.site_tagline}`}</title>
                <meta content={data.site_desc} name="description"/>
                <meta name="og:title" content={`New Release`}/>
                <meta name="og:description" content={data.site_desc}/>
                <meta name="og:url" content={`${process.env.NEXT_PUBLIC_SITE.slice(0, -1)}${router.asPath}`}/>
            </Head>
            <div className="w-auto pt-5">
                <div className="container my-6 mx-auto px-4 md:px-12">
                    <div className="flex">
                        <h2 className="font-extrabold text-3xl pb-3 border-b-4 border-blue-700 border-solid">New Release
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
                <Pagination max={data.max_pages} now={data.current_page} slug={router.pathname.replace("[id]", "")}/>
            </div>
        </>
    )
}

const getData = async (page) => {
    const url = `${process.env.API_URL}/new-released/page/${page}`
    const response = await fetch(url)
    return response.json()

}

export async function getServerSideProps(context) {
    context.res.setHeader('Cache-Control',
        'public, s-maxage=3600, stale-while-revalidate=10800')
    const data = await getData(context.params.id)
    return { props: {data : data}}
}

export default  Released