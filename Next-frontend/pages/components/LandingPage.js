import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import { createClient } from "next-sanity";
import Script from "next/script"
import imageUrlBuilder from '@sanity/image-url'
import Link from 'next/link'


//   
export default function LandingPage({ blogs }) {
    const client = createClient({
        projectId: "liq8cp7u",
        dataset: "production",
        useCdn: false
    });
    const builder = imageUrlBuilder(client)

    return (<div className="mx-auto grid w-full grid-cols-1 gap-6 pt-12 sm:w-3/4 lg:w-full lg:grid-cols-3 xl:gap-10" >
        {blogs.map((items) => {
            return <Link key={items.slug} href={"blog/" + items.slug.current} className="shadow">
                <div>
                    <div style={{ "backgroundImage": `url(${builder.image(items.poster).width(200).url()})` }}
                        className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72">
                        <span
                            className="absolute inset-0 block bg-gradient-to-b from-blog-gradient-from to-blog-gradient-to bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"></span>
                        <span
                            className="absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 border-white px-6 py-2 text-center font-body text-sm font-bold uppercase text-white md:text-base">Read
                            More</span>
                    </div>
                    <div className="bg-white py-6 px-5 xl:py-8">
                        <span className="block font-body text-lg font-semibold text-black">{items.title}</span>
                        <span className="block pt-2 font-body text-grey-20">{items.metadisc}</span>
                    </div>
                </div>
            </Link>
        })}



    </div>

    )
}

// export default LandingPage

export const getServerSideProps = async (context) => {

    const client = createClient({
        projectId: "liq8cp7u",
        dataset: "production",
        useCdn: false
    });
    const query = `*[_type == "blog"][0...3]`;
    const blogs = await client.fetch(query);
    return {
        props: {
            blogs

        }
    }
}