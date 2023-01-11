import React, {Component, useState} from "react";
import Head from "next/head";
import {useRouter} from "next/router";
import Link from "next/link";

const getData = async () => {
    const url = `${process.env.API_URL}/genre-list/`
    const response = await fetch(url)
    return response.json()
}
const filterTax = (e) => {
    const input = e.target.value.toUpperCase()
    const target = document.getElementById("taxlist")
    const a = target.getElementsByTagName("a")
    for(let i = 0; i < a.length; i++){
        const value = a[i].getElementsByTagName("h3")[0].textContent
        if(value.toUpperCase().indexOf(input) > -1){
            a[i].style.display = ""
        } else {
            a[i].style.display = "none"
        }

    }
}
const Genres = ({data, params}) => {
    const router = useRouter()
    return(
        <>
            <Head>
                <title>{`Genres List - ${data.site_title} | ${data.site_tagline}`}</title>
                <meta content={data.site_desc} name="description"/>
                <meta name="og:title" content={`Genres List - ${data.site_title} | ${data.site_tagline}`}/>
                <meta name="og:description" content={data.site_desc}/>
                <meta name="og:url" content={`${process.env.NEXT_PUBLIC_SITE.slice(0, -1)}${router.asPath}`}/>
            </Head>
            <div className="w-auto pt-5">
                <div className="container my-6 mx-auto px-4 md:px-12">
                    <div className="flex">
                        <h2 className="text-bold text-3xl pb-3 border-b-4 border-solid mb-10">Genres List
                        </h2>
                    </div>
                    <div className="flex justify-center mb-4">
                        <input type="text" placeholder={"Search . . ."} onChange={filterTax}
                               className="px-3 py-2 rounded-lg"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4" id="taxlist">
                        {data.itemLists.map(genre => {
                            return (<>
                            <Link href={`/archive/genre/${genre.slug}`} alt={genre.name} className="hover:rounded-lg hover:bg-black/20 px-4 py-2">
                                <h3 className="font-bold text-blue-700 dark:text-cyan-600">{genre.name}</h3>
                                <span className="text-sm text-gray-500">{genre.count} videos</span>
                            </Link>
                            </>)
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

// This gets called on every request
export async function getStaticProps(context) {
    const myData = await getData()
    return { props: {data : myData}, revalidate: 86400 }
}

export default Genres