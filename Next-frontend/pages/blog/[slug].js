// import { useRouter } from 'next/router'
import { useRouter } from 'next/router'
import { createClient } from "next-sanity";
import PortableText from "react-portable-text"

const Post = ({blogs}) => {
    const router = useRouter()
   return <><>
   

    <div>
      <div class="container py-6 md:py-10">
        <div class="mx-auto max-w-4xl">
          <div class="">
            <h1
              class="pt-5 font-body text-3xl font-semibold text-primary sm:text-4xl md:text-5xl xl:text-6xl">
              {blogs.title}
            </h1>
            <div class="flex items-center pt-5 md:pt-10">
              <div>
                <img src="/assets/img/blog-author.jpg"
                  class="h-20 w-20 rounded-full border-2 border-grey-70 shadow"
                  alt="author image" />
              </div>
              <div class="pl-5">
                <span class="block font-body text-xl font-bold text-grey-10">By Christy Smith</span>
                <span class="block pt-1 font-body text-xl font-bold text-grey-30">February 27,
                  2022</span>
              </div>
            </div>
          </div>
          <div class="prose max-w-none pt-8">
            <PortableText content={blogs.content}projectId="liq8cp7u"dataset="production" serializers={{
                h1: (props) => <h1 style={{ color: "red" }} {...props} />,
                li: ({ children }) => <li className="special-list-item">{children}</li>,
              }}
            />

          </div>
          <div class="mt-10 flex justify-between border-t border-lila py-12">
            <a href="/" class="flex items-center">
              <i class="bx bx-left-arrow-alt text-2xl text-primary"></i>
              <span
                class="block pl-2 font-body text-lg font-bold uppercase text-primary md:pl-5">Previous
                Post</span>
            </a>
            <a href="/" class="flex items-center">
              <span class="block pr-2 font-body text-lg font-bold uppercase text-primary md:pr-5">Next
                Post</span>
              <i class="bx bx-right-arrow-alt text-2xl text-primary"></i>
            </a>
          </div>
        
        </div>
      </div>
    </div>

  
  </> </>

}

export default Post

export  const  getServerSideProps = async(context) =>{
  const {slug} = context.query
  const client = createClient({
    projectId: "liq8cp7u",
    dataset: "production",
    useCdn: false
  });
  const query = `*[_type == "blog" && slug.current == '${slug}'][0]`;
  const blogs = await client.fetch(query);
  return {
    props: {
      blogs
    }
  }
}



