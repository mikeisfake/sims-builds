import { createClient } from 'contentful'

export const getStaticProps = async () => {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })

  const res = await client.getEntries({content_type: 'build'})
  return {
    props: {
      builds: res.items
    }
  }

}

const Home = ({ builds }) => {
  console.log(builds)
   return (
     <div className="home">
       <h1>HomePage</h1>
     </div>
   );
  }

export default Home
