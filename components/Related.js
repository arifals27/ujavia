import {Breathing, Image} from "react-shimmer";
import Link from "next/link";
import {decode} from 'html-entities';


const Related = (data) => {
    const poster = "https://c4.wallpaperflare.com/wallpaper/441/161/104/the-avengers-avengers-endgame-ant-man-avengers-endgame-black-panther-marvel-comics-hd-wallpaper-preview.jpg"
    return (
        <>
        <Link href={data.content.slug} className="text-gray-500 hover:text-gray-50">
            <div className="grid grid-cols-2 gap-x-3">
                <div className="relative pt-5625-p overflow-hidden rounded-lg">
                    <Image src={data.content.poster}
                           alt={data.content.code}
                           fallback={<Breathing width={144} height={81} className={"w-full min-h-full absolute top-0 left-0 right-0 bottom-0"} />}
                           NativeImgProps={{className: "w-full min-h-full absolute top-0 left-0 right-0 bottom-0 hover:scale-110 rounded-lg", alt: data.content.code}
                           }/>
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