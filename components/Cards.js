import React from 'react'
import Link from "next/link";
import {Breathing} from "react-shimmer";
import {decode} from 'html-entities';
import Image from "next/image"


const Card = (data) => {
    return (
        <>
            <div className="my-2 px-2 w-1/2 md:w-1/4 lg:my-6 lg:px-2">
                <article className="overflow-hidden grid">
                    <Link href={data.content.slug}>
                        <div className="relative bg-transparent">
                            <div className="relative rounded-lg overflow-hidden pt-5625-p">
                                <Image src={data.content.poster} alt={data.content.title}
                                fill sizes="(max-width: 768px) 50vw, 25vw"
                                       placeholder="blur"
                                       blurDataURL="data:image/webp;base64,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"
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
