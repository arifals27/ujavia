import React from 'react'
import Link from "next/link";
import {Shimmer, Image} from "react-shimmer";
import {decode} from 'html-entities';
import Head from "next/head";


const Card = (data) => {
    const poster = data.content.poster

    return (
        <>
            <Head>
                <meta name="og:image" content={data.content.poster} key="image"/>
            </Head>
            <div className="my-2 px-2 w-full sm:w-1/2 md:w-1/4 lg:my-6 lg:px-2">
                <article className="overflow-hidden grid">
                    <Link href={data.content.slug}>
                        <div className="relative bg-transparent">
                            <div className="relative rounded-lg overflow-hidden pt-5625-p">
                                <Image src={`${data.content.poster}?w=150`} NativeImgProps={{alt: data.content.title, width: 179, height: 120,
                                    className: "absolute top-0 left-0 right-0 hover:scale-110 w-full",
                                    srcSet: `${poster}?w=154 154w, ${poster}?w=284 284w, ${poster}?w=288 288w, ${poster}?w=358 358w, ${poster}?w=583 583w`,
                                    sizes: "(max-width:414px) 358px, (max-width:640px) 583px, (max-width:767px) 284px, (min-width:768px) 288px"
                                }}
                                       fallback={<Shimmer height={192} width={288} className={"absolute top-0 left-0 right-0"} loading={"lazy"} />}
                                />
                                <div className="h-10 bg-gradient-to-t from-black/80 to-transparent absolute bottom-0 w-full"></div>
                                <span className="absolute bottom-2 right-2 text-xs text-white bg-black/70 rounded-md px-1.5 py-0.5 font-bold">{data.content.runtime}</span>
                            </div>
                        </div>
                        <div className="py-2 px-3">
                            <h1 className="line-clamp-2">{data.content.code} - {decode(data.content.title)}</h1>
                            <div className="text-gray-500 text-sm">{data.content.released}</div>
                        </div>
                    </Link>
                </article>
            </div>
        </>
    )
}

export default Card;