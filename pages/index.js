import { createClient } from 'contentful'

export const getStaticProps = async () => {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  })

}

const Home = () => {

   return (
     <div className="home">
       <h1>HomePage</h1>
     </div>
   );
  }

export default Home
