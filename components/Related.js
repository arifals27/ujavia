import Link from "next/link";
import {decode} from 'html-entities';
import React from "react";
import {Shimmer, Image} from "react-shimmer";


const Related = (data) => {
    return (
        <>
        <Link href={data.content.slug} className="text-gray-800 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-50">
            <div className="grid grid-cols-2 gap-x-3">
                <div className="relative pt-5625-p overflow-hidden rounded-lg">
                    <Image src={data.content.poster} NativeImgProps={{alt: data.content.title, width: 144, height: 81,
                        className: "absolute top-0 left-0 right-0 hover:scale-110", loading: "lazy" }}
                           fallback={<Shimmer height={81} width={144} className={"absolute top-0 left-0 right-0"} loading={"lazy"} />}
                    />
                    <span className="absolute bottom-1 right-1 text-xs text-white bg-black/50 rounded-md px-1.5 py-0.5 font-bold">{data.content.runtime}</span>
                </div>
                <div>
                    <div className="line-clamp-2 overflow-ellipsis">{decode(data.content.title)}</div>
                </div>
            </div>
        </Link>
        </>
    )
}

export default Related