import Image from "next/image";
import { createClient } from "contentful";
import BuildCard from "../components/BuildCard";
import { NavList } from "../components/NavList";
import { useEffect } from "react";
import { closeMenu } from "../functions/HandleMenu";

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
  const cards = builds.map((build) => {
    return <BuildCard key={build.sys.id} build={build} />;
  });

  useEffect(() => {
    closeMenu();
  }, []);

  return (
    <div id="home">
      <NavList builds={builds} />
      <h1>
        <span className="plumbob">
          <Image src="/plumbob-green.png" width="25" height="50" />
        </span>
        builds.
        <p>an app for sims builds</p>
      </h1>
      <div className="card-container">{cards}</div>
    </div>
  );
};

export default Home;
