
// import Head from 'next/head'
// import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
// import styles from '../styles/Home.module.css'
import { createClient } from "next-sanity";
import Script from "next/script"
import { useEffect } from 'react';
import imageUrlBuilder from '@sanity/image-url'
import Link from 'next/link'
import NavBar from './NavBar';


export default function Blogs({ blogs, profile }) {
  const client = createClient({
    projectId: "liq8cp7u",
    dataset: "production",
    useCdn: false
  });
  const builder = imageUrlBuilder(client)
  useEffect(() => {
    console.log("gaga")
    // console.log(jay)
  }, [])


  return (
    <>
      <Script src="/assets/js/main.js"></Script>
      
<NavBar/>

           <div className="mx-auto grid w-full grid-cols-1 gap-6 pt-12 sm:w-3/4 lg:w-full lg:grid-cols-3 xl:gap-10">
            {blogs.map((items) => {
              return <Link key={items.slug} href={"blog/" + items.slug.current}  className="shadow">
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
  

 
    </>

    
  )
}


export async function getServerSideProps(context) {
  const client = createClient({
    projectId: "liq8cp7u",
    dataset: "production",
    useCdn: false
  });
  const query = `*[_type == "blog"]`;
  const blogs = await client.fetch(query);

  const profileQuery = `*[_type == "profile"][0]`;
  const profile = await client.fetch(profileQuery);

  return {
    props: {
      blogs,
      profile
    }
  }
}

