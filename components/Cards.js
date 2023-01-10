import React from 'react'
import Link from "next/link";
import {Shimmer, Image} from "react-shimmer";
import {decode} from 'html-entities';


const Card = (data) => {
    const poster = data.content.poster

    return (
        <>
            <div className="my-2 px-2 w-1/2 md:w-1/4 lg:my-6 lg:px-2">
                <article className="overflow-hidden grid">
                    <Link href={data.content.slug}>
                        <div className="relative bg-transparent">
                            <div className="relative rounded-lg overflow-hidden pt-5625-p">
                                <Image src={`${data.content.poster}?w=150`} NativeImgProps={{alt: data.content.title, width: 179, height: 120,
                                    className: "absolute top-0 left-0 right-0 hover:scale-110 w-full",
                                    srcset: `${poster}?w=154 154w, ${poster}?w=179 179w, ${poster}?w=288 288w`,
                                    sizes: "(max-width:415px) 179px, (max-width:768px) 154px, (min-width:768px) 288px"
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