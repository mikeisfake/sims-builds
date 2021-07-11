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
  
  const names = builds.map(build => {
    return <p>{build.fields.name}</p>
  })

   return (
     <div className="home">
       <h1>Builds List</h1>
       {names}
     </div>
   );
  }

export default Home
