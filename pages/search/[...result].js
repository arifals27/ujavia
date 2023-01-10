import React, {Component, useState} from "react";
import Card from "../../components/Cards";
import Pagination from "../../components/Pagination";
import Head from "next/head";
import {useRouter} from "next/router";

const getData = async (page) => {
    const query = page[0]
    const paged = typeof page[1] !== "undefined" ? page[1] : 1
    const url = `${process.env.API_URL}/?s=${query}&paged=${paged}`
    const response = await fetch(url)
    return response.json()
}
const Search = ({data, query}) => {
    const router = useRouter()
    return(
        <>
            <Head>
                <title>{`Search Result: "${data.query}" - ${data.site_title}`}</title>
                <meta content={`List videos qith query: "${data.query}"`} name="description"/>
                <meta name="og:title" content={`Search Result: "${data.query}" - ${data.site_title}`}/>
                <meta name="og:description" content={`Search Result: "${data.query}"`}/>
                <meta name="og:url" content={`${process.env.NEXT_PUBLIC_SITE.slice(0, -1)}${router.asPath}`}/>
            </Head>
            <div className="w-auto pt-5">
                <div className="container my-6 mx-auto px-4 md:px-12">
                    <div className="flex">
                        <h2 className="text-bold text-3xl pb-3 border-b-4 border-solid">{`Search Result: ${data.query}`}
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
            <Pagination max={data.oldest_page} now={data.current_page} slug={`/search/${query}`} />
        </>
    )
}

// This gets called on every request
export async function getServerSideProps(context) {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=60, stale-while-revalidate=600'
    )
    const myData = await getData(context.params.result)
    return { props: {data : myData, query: context.params.result[0]} }
}

export default Search