import '../styles/globals.css'
import Layout from "../components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

function Loading () {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const handleStart = (url) => (url !== router.asPath) && setLoading(true);
        const handleComplete = (url) => (url === router.asPath) && setLoading(false);

        router.events.on("routeChangeStart", handleStart)
        router.events.on("routeChangeComplete", handleComplete)
        router.events.on("routeChangeError", handleComplete)

        return () => {
            router.events.off("routeChangeStart", handleStart)
            router.events.off("routeChangeComplete", handleComplete)
            router.events.off("routeChangeError", handleComplete)
        }
    })
    return loading && (
        <div className="spinner-wrapper flex h-screen w-screen justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-gray-800 z-10">
            <div id="move">
                <div id="board">
                    <svg id="aaa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 120">
                        <g fill="none" strokeWidth="20" strokeMiterlimit="2" strokeLinecap="round">
                            <path d="m25 15.6651c0 0 20 32.4928 60 32.4928h280c40 0 60-32.4928 60-32.4928"
                                  stroke="#fff"/>

                            <path
                                d="m92.3395 87.2264c0-11.0456 8.9545-20 20.0005-20 11.045 0 20 8.9544 20 20.0001 0 11.0457-8.955 19.9995-20 19.9995-11.046 0-20.0005-8.9539-20.0005-19.9996"
                                stroke="#30bced"/>
                            <path
                                d="m322.119 87.2264c0-11.0456 8.955-20 20-20 11.046 0 20 8.9544 20 20.0001 0 11.0457-8.954 19.9995-20 19.9995-11.045 0-20-8.9539-20-19.9996"
                                stroke="#30bced"/>

                            <path className="wheel"
                                  d="m92.3395 87.2264c0-11.0456 8.9545-20 20.0005-20 11.045 0 20 8.9544 20 20.0001 0 11.0457-8.955 19.9995-20 19.9995-11.046 0-20.0005-8.9539-20.0005-19.9996"
                                  stroke="#2696BF" strokeDasharray="31.42"/>
                            <path className="wheel"
                                  d="m322.119 87.2264c0-11.0456 8.955-20 20-20 11.046 0 20 8.9544 20 20.0001 0 11.0457-8.954 19.9995-20 19.9995-11.045 0-20-8.9539-20-19.9996"
                                  stroke="#2696BF" strokeDasharray="31.42"/>
                        </g>
                    </svg>
                </div>
            </div>
            <h1 className={"loading animate-pulse text-lg"}>loading</h1>
        </div>
    )
}
export default function App({ Component, pageProps }) {
    return (
        <>
            <Loading/>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    )
}
