import { createClient } from "contentful";
import BuildCard from "../components/BuildCard";

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const res = await client.getEntries({ content_type: "build" });
  return {
    props: {
      builds: res.items,
    },
  };
};

const Home = ({ builds }) => {
  console.log(builds);

  const cards = builds.map((build) => {
    return <BuildCard key={build.sys.id} build={build} />;
  });

  return (
    <div id="home">
      <div className="card-container">
        {cards}
      </div>
    </div>
  );
};

export default Home;
