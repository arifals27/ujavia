import React, {useState} from "react";
import Link from "next/link";
import Related from "../../components/Related";
import {decode} from 'html-entities';
import Head from "next/head";
import {useRouter} from "next/router";
import {DiscussionEmbed} from "disqus-react";

const Video = ({data, params, currentUrl}) => {
    const [videoUrl, setVideoUrl] = useState(data.videos[0].url)
    const [clicked, setClicked] = useState([true, false, false, false])
    const { asPath, pathname, req, query, res } = useRouter();

    const changeIframe = (e, i) => {
        e.preventDefault()
        setVideoUrl((x) => data.videos[i].url)
        let falseall = [false, false, false, false]
        falseall[i] = true
        setClicked(falseall)
    }

    const jsonSchema = {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": `${data.code}`,
        "description" : `${data.title.replace(data.code + " ", "")}`,
        "@id" : `${process.env.NEXT_PUBLIC_SITE.slice(0, -1)}${asPath}`,
        "datePublished": `${data.released}`,
        "uploadDate": `${data.released}`,
        "genre" : `${data.genres ? data.genres[0].name : "Adult"}`,
        "duration" : `${data.runtime.replace(/(\d+):(\d+):(\d+)/, "PT$1H$2M$3S")}`,
        "thumbnailUrl" : [`${data.poster}`],
        "embedUrl": `${videoUrl}`,
        "author": {
            "@type": "Person",
            "name": "Ujavia.com"
        },
        "review" : {
            "@type" : "Review",
            "author" : {
                "@type" : "Person",
                "name" : "Ujavia.com"
            },
            "dateModified" : `${data.released}`,
            "datePublished" : `${data.released}`,
            "itemReviewed": {
                "@type": "Movie",
                "name": `${data.code}`,
                "image" : `${data.poster}`,
                "url" : `${process.env.NEXT_PUBLIC_SITE.slice(0, -1)}${asPath}`

            },
            "reviewBody" : `Movie with code ${data.code} is awesome`,
            "reviewRating" : {
                "@type" : "Rating",
                "bestRating" : 10,
                "ratingValue" : (Math.random() * 5 + 5).toFixed(2),
                "worstRating" : 1,
            }
        },
    }

    const judul = decode(data.title);
    return (
        <>
            <Head>
                <title>{`${judul} | ${data.site_tagline}`}</title>
                <meta content={data.site_desc} name="description"/>
                <meta name="og:title" content={data.title}/>
                <meta name="og:description" content={data.site_desc}/>
                <meta name="og:url" content={`${process.env.NEXT_PUBLIC_SITE.slice(0, -1)}${asPath}`}/>
                <meta name="og:image" content={data.poster}/>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonSchema) }}
                />
            </Head>
            <div className="container w-auto mt-5 md:px-8 mb-5 flex flex-col md:flex-row gap-4">
                <div className="main flex-auto w-screen md:w-9/12">
                    <div className="flex-col">
                        <div className="w-full pt-5625-p relative overflow-hidden">
                            <iframe src={`${videoUrl}?poster=${data.poster}`} id="player"
                                    allowFullScreen={true}
                                    className="w-full h-full absolute top-0 left-0"></iframe>
                        </div>
                        {
                            data.videos && data.videos.length > 1 ? (
                            <>
                            <div className="mt-4 align-center text-center">
                                {data.videos.map((video, i) => {
                                    return (
                                        <Link key={i} href="#" onClick={(e) => changeIframe(e, i)}
                                        className={`${clicked[i] ? "bg-blue-600" : "bg-gray-600"} part-button px-4 py-2 rounded-lg font-bold mr-4`}>
                                            Part {i+1}
                                        </Link>
                                    )
                                })}
                            </div>
                            </>
                        ) : ""
                        }
                        <div className="mt-4">
                            <h1 className="font-bold text-2xl px-4 md:px-0">{decodeURIComponent(judul)}</h1>
                        </div>
                        <div className="detail mt-4 bg-gray-300 dark:bg-gray-900 rounded-xl px-6 py-2">
                            <h2 className="border-b-2 border-solid inline-block font-bold text-xl mb-4">Details</h2>
                            {data.code ? (
                                <div className="grid grid-cols-6 mb-3">
                                    <div className="col-start-1 col-span-2 md:col-span-1 font-bold text-cyan-500">Code:</div>
                                    <div className="col-end-7 col-span-4 md:col-span-5" itemProp={"alternateName"}>{data.code}</div>
                                </div>
                            ) : ""}
                            {data.released ? (
                                <div className="grid grid-cols-6 mb-3">
                                    <div className="col-start-1 col-span-2 md:col-span-1 font-bold text-cyan-500">Release Date:</div>
                                    <div className="col-end-7 col-span-4 md:col-span-5" itemProp={"alternateName"}>{data.released}</div>
                                </div>
                            ) : ""}
                            {data.runtime ? (
                                <div className="grid grid-cols-6 mb-3">
                                    <div className="col-start-1 col-span-2 md:col-span-1 font-bold text-cyan-500">Runtime:</div>
                                    <div className="col-end-7 col-span-4 md:col-span-5" itemProp={"alternateName"}>{data.runtime}</div>
                                </div>
                            ) : ""}
                            {data.actress ? (
                                <div className="grid grid-cols-6 mb-3">
                                    <div className="col-start-1 col-span-2 md:col-span-1 font-bold text-cyan-500">Actress:</div>
                                    <div className="col-end-7 col-span-4 md:col-span-5" itemProp={"alternateName"}>{data.actress.map(act => {
                                        return (
                                            <Link key={act.term_id} href={`/archive/${act.taxonomy}/${act.slug}`}
                                            className="bg-gray-400 dark:bg-gray-800 px-3 py-2 rounded-lg mb-2 mr-2 inline-block hover:bg-gray-500 dark:hover:bg-gray-700"
                                            >{act.name}</Link>
                                        )
                                    })}</div>
                                </div>
                            ) : ""}
                            {data.genres ? (
                                <div className="grid grid-cols-6 mb-3">
                                    <div className="col-start-1 col-span-2 md:col-span-1 font-bold text-cyan-500">Genres:</div>
                                    <div className="col-end-7 col-span-4 md:col-span-5" itemProp={"alternateName"}>{data.genres.map(genre => {
                                        return (
                                            <Link key={genre.term_id} href={`/archive/genre/${genre.slug}`}
                                                  className="bg-gray-400 dark:bg-gray-800 px-3 py-2 rounded-lg mb-2 mr-2 inline-block hover:bg-gray-500 dark:hover:bg-gray-700"
                                            >{genre.name}</Link>
                                        )
                                    })}</div>
                                </div>
                            ) : ""}
                            {data.labels ? (
                                <div className="grid grid-cols-6 mb-3">
                                    <div className="col-start-1 col-span-2 md:col-span-1 font-bold text-cyan-500">Labels:</div>
                                    <div className="col-end-7 col-span-4 md:col-span-5" itemProp={"alternateName"}>{data.labels.map(label => {
                                        return (
                                            <Link key={label.term_id} href={`/archive/${label.taxonomy}/${label.slug}`}
                                                  className="bg-gray-400 dark:bg-gray-800 px-3 py-2 rounded-lg mb-2 mr-2 inline-block hover:bg-gray-500 dark:hover:bg-gray-700"
                                            >{label.name}</Link>
                                        )
                                    })}</div>
                                </div>
                            ) : ""}
                            {data.tags ? (
                                <div className="grid grid-cols-6 mb-3">
                                    <div className="col-start-1 col-span-2 md:col-span-1 font-bold text-cyan-500">Tags:</div>
                                    <div className="col-end-7 col-span-4 md:col-span-5" itemProp={"alternateName"}>{data.tags.map(tag => {
                                        return (
                                            <Link key={tag.term_id} href={`/archive/${tag.taxonomy}/${tag.slug}`}
                                                  className="bg-gray-400 dark:bg-gray-800 px-3 py-2 rounded-lg mb-2 mr-2 inline-block hover:bg-gray-500 dark:hover:bg-gray-700"
                                            >{tag.name}</Link>
                                        )
                                    })}</div>
                                </div>
                            ) : ""}

                        </div>
                        {data.downloads && data.downloads.length > 0 ? (
                            <div className="mt-4 px-4 md:px-0">
                                <h3 className="border-b-2 border-solid inline-block font-bold text-xl mb-4">Downloads</h3>
                                <div className="links">
                                    {
                                        data.downloads.map((download, i) => {
                                            return (
                                                <>
                                                    <Link key={i} href={download.link} alt={download.name}
                                                    className={"bg-gray-300 dark:bg-gray-900 px-3 py-2 rounded-lg mb-2 mr-2 inline-block hover:bg-gray-500 dark:hover:bg-gray-700"}
                                                    >{download.name}</Link>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        ) : ""}
                    </div>
                    {/*<div className="bg-gray-300 dark:bg-gray-800 mt-10 px-3 px-2 md:px-6 md:py-4 rounded-xl">*/}
                    {/*    <DiscussionEmbed*/}
                    {/*        dark={true}*/}
                    {/*        shortname='ujavia'*/}
                    {/*        config={*/}
                    {/*            {*/}
                    {/*                url: process.env.NEXT_PUBLIC_SITE.slice(0, -1) + asPath,*/}
                    {/*                identifier: data.id,*/}
                    {/*                title: data.code,*/}
                    {/*                language: 'en_US'*/}
                    {/*            }*/}
                    {/*        }*/}
                    {/*    />*/}
                    {/*</div>*/}
                </div>
                <div className="sidebar flex-auto w-screen md:w-3/12 px-2 md:px-0">
                    <div className="grid grid-flow-row gap-y-6">
                        {data.related.map(relate => {
                            return <Related key={relate.id} content={relate}/>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
const getData = async (page) => {
    const response = await fetch(`${process.env.API_URL}video/${page}`)
    return response.json()
}
export async function getServerSideProps(context) {
    context.res.setHeader(
        'Cache-Control',
        'public, s-maxage=60, stale-while-revalidate=600'
    )
    const myData = await getData(context.params.slug)
    return { props: {data : myData,
            params: context.params.slug,
            currentUrl : context.req.headers.host} }
}

export default Video
