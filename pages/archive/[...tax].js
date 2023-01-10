import React, {Component, useState} from "react";
import Card from "../../components/Cards";
import Pagination from "../../components/Pagination";
import Head from "next/head";
import {useRouter} from "next/router";

const getData = async (page) => {
    const tax = page[0]
    const taxName = page[1]
    const paged = typeof page[2] !== "undefined" ? page[2] : 1
    const url = `${process.env.API_URL}/${tax}/${taxName}/page/${paged}/`
    const response = await fetch(url)
    return response.json()
}
const Taxonomy = ({data, params}) => {
    const path = `${params[0]}/${params[1]}`
    const router = useRouter()
    return(
        <>
            <Head>
                <title>{`Archive: ${data.title} - ${data.site_title} | ${data.site_tagline}`}</title>
                <meta content={data.site_desc} name="description"/>
                <meta name="og:title" content={`Archive: ${data.title} - ${data.site_title} | ${data.site_tagline}`}/>
                <meta name="og:description" content={`Archive: ${data.title}`}/>
                <meta name="og:url" content={`${process.env.NEXT_PUBLIC_SITE.slice(0, -1)}${router.asPath}`}/>
            </Head>
            <div className="w-auto pt-5">
                <div className="container my-6 mx-auto px-4 md:px-12">
                    <div className="flex">
                        <h2 className="text-bold text-3xl pb-3 border-b-4 border-solid">Archive From {params[0]} {params[1]}
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
            </div>
            <Pagination max={data.oldest_page} now={data.current_page} slug={`/archive/${path}`} />
        </>
    )
}

// This gets called on every request
export async function getServerSideProps(context) {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=60, stale-while-revalidate=600'
    )
    const myData = await getData(context.params.tax)
    return { props: {data : myData, params: context.params.tax} }
}

export default Taxonomy