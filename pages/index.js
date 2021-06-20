const Home = () => {

  const getStaticProps = async () => {
    const res = await fetch(BASE_URL + process.env.CONTENTFUL_ACCESS_TOKEN)   
  }

   return (
     <div className="home">
       <h1>HomePage</h1>
     </div>
   );
  }

export default Home
