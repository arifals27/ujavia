import React from "react";
import {useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";


const Header = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const router = useRouter()

    const toggleMenu = () => {
        setMobileMenu((x) => !x)
    }
    const goSearch = (e) => {
        e.preventDefault();
        const query = e.target.s.value;
        router.push("/search/" + query , undefined, { shallow: true })
    }
    const siteurl = process.env.NEXT_PUBLIC_SITE
    const jsonSchema = [{
        "@type": "WebSite",
        "@id": `${siteurl}#website`,
        "url": `${siteurl}`,
        "name": `${process.env.NEXT_PUBLIC_SITE_TITLE}`,
        "publisher": {
            "@id": `${siteurl}#organization`
        },
        "inLanguage": "id",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "/search/{search}",
            "query": "required name=search"
        }
    }, {
        "@type": "Organization",
        "@id": `${siteurl}#organization`,
        "name": `${process.env.NEXT_PUBLIC_SITE_TITLE}`,
        "url" : `${siteurl}`,
        "logo": {
            "@type": "ImageObject",
            "@id": `${siteurl}#loho`,
            "url": `${siteurl}logo.jpg`,
            "contentUrl": `${siteurl}logo.jpg`,
            "caption": "",
            "inLanguage": "id",
            "width": "512",
            "height": "512"
        }
    }]
    return(
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />
                <link rel={"icon"} type={"image/x-icon"} href={"/favicon.ico"}/>
                <meta property="og:site_name" content={process.env.NEXT_PUBLIC_SITE_TITLE} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonSchema) }}
                />
            </Head>
            <nav className="bg-black/20 shadow-lg shadow-white/20 dark:shadow-gray-900 mb-10 font-bold" itemScope itemType="https://schema.org/WPHeader">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between">
                        <div className="hidden md:flex items-center space-x-1">
                            <Link itemProp="url" title="Manga" href="/archive/genre/big-tits" className="py-5 px-3 hover:text-cyan-500">Big Tits</Link>
                            <Link itemProp="url" title="Manhwa" href="/archive/genre/creampie" className="py-5 px-3 hover:text-cyan-500">Creampie</Link>
                            <Link itemProp="url" title="Manhua" href="/archive/genre/cheating-wife" className="py-5 px-3 hover:text-cyan-500">NTR</Link>
                            <Link itemProp="url" title="Adult" href="/archive/genre/amateur" className="py-5 px-3 hover:text-cyan-500">Amateur</Link>
                        </div>
                        <div>
                            <Link itemProp="url" title="Home" href="/" className="flex items-center py-5 px-2 text-violet-500 hover:text-cyan-400">
                                <Image src={"/logo.png"} width={50} height={50} className={"animate-bounce"} alt={process.env.NEXT_PUBLIC_SITE_TITLE}></Image>
                                <span className="font-bold text-xl ml-2">{process.env.NEXT_PUBLIC_SITE_TITLE}</span>
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-1">
                            <form action="/search/" onSubmit={goSearch} itemType="https://schema.org/SearchAction" itemProp="potentialAction" itemScope>
                                <meta itemProp="target" content="/search/{search}"/>
                                <div className="flex md:w-80 relative">
                                    <div className="relative w-full">
                                        <input itemProp="query-input" type="search" id="search" name="s" className=" block p-2.5 w-full z-20 text-sm text-gray-900
                               bg-gray-50 rounded-lg border-l-gray-50 border-l-2 border border-gray-300
                               focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700
                               dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                               dark:focus:border-blue-500" placeholder="Search..." autoComplete="off"
                                        />
                                        <button type="submit"
                                                className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor"
                                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                            </svg>
                                            <span className="sr-only">Search</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="md:hidden flex items-center">
                            <button type={"button"} name={"mobile-menu"} aria-label={"mobile menu"} className="mobile-menu-button" onClick={() => toggleMenu()}>
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                    </div>
                </div>
                <div className={`mobile-menu ${mobileMenu ? '' : 'hidden'} md:hidden`}>
                    <Link itemProp="url" title="Manga" href="/archive/genre/big-tits" className="block py-2 px-4 text-sm hover:bg-purple-900">Big Tits</Link>
                    <Link itemProp="url" title="Manhwa" href="/archive/genre/creampie" className="block py-2 px-4 text-sm hover:bg-purple-900">Creampie</Link>
                    <Link itemProp="url" title="Manhua" href="/archive/genre/cheating-wife" className="block py-2 px-4 text-sm hover:bg-purple-900">NTR</Link>
                    <Link itemProp="url" title="Adult" href="/archive/genre/amateur" className="block py-2 px-4 text-sm hover:bg-purple-900">Amateur</Link>
                    <form action="/search/" onSubmit={goSearch} className="mt-3 px-5 pb-5">
                        <div className="flex w-full relative">
                            <div className="relative w-full">
                                <input type="search" id="search" name="s" className=" block p-1.5 w-full z-20 text-sm text-gray-900
                               bg-gray-50 rounded-lg border-l-gray-50 border-l-2 border border-gray-300
                               focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700
                               dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                               dark:focus:border-blue-500" placeholder="Search..."
                                       autoComplete="off"
                                />
                                <button type="submit"
                                        className="absolute top-0 right-0 p-1.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                    <span className="sr-only">Search</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </nav>
        </>
    )
}


export default Header