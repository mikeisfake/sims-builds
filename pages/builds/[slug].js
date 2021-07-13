import { createClient } from "contentful";
import { useState, useEffect } from "react";
import { NavList } from "../../components/NavList";
import { closeMenu } from "../../functions/HandleMenu";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: "build" });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: "build",
    "fields.slug": params.slug,
  });
  const res = await client.getEntries({ content_type: "build" });

  return {
    props: {
      build: items[0],
      builds: res.items,
    },
  };
};

const BuildDetails = ({ build, builds }) => {
  const {
    cost,
    coverImage,
    description,
    features,
    gallery,
    lotSize,
    name,
    world,
    customContent,
  } = build.fields;

  const initImg =
    gallery[Math.floor(Math.random() * gallery.length)].fields.file.url;
  const [currentImage, setCurrentImage] = useState(initImg);

  useEffect(() => {
    setCurrentImage(initImg);
    closeMenu();
  }, [build]);

  const galleryImages = gallery.map((data) => {
    let imageURL = data.fields.file.url;
    return (
      <div
        className="img-wrapper"
        onClick={() => {
          setCurrentImage(imageURL);
        }}
      >
        <img src={"https:" + imageURL} />
      </div>
    );
  });

  const featuresList = features.map((feature) => {
    return <li>{feature}</li>;
  });

  const creatorsList =
    customContent &&
    customContent.map((creator) => {
      return <li>{creator}</li>;
    });
  return (
    <>
      <NavList builds={builds} />
      <div className="build_details">
        <article>
          <div className="content">
            <h2>{name}</h2>
            <p> {description} </p>
            <div className="details">
              <p>
                <strong>world</strong>: {world}
              </p>
              <p>
                <strong>building features</strong>:<ul>{featuresList}</ul>
              </p>
              <p>
                <strong>cost</strong>: {"§" + cost.toLocaleString() + ".00"}
              </p>
              <p>
                <strong>lot size</strong>: {lotSize}
              </p>
              {customContent && (
                <p>
                  <strong>Custom Content Creators</strong>:
                  <ul>{creatorsList}</ul>
                </p>
              )}
            </div>
            <h3>Gallery</h3>
          </div>
          <div className="gallery">{galleryImages}</div>
        </article>
      </div>
      <div className="img-container">
        <div className="blocker"></div>
        <img src={"https:" + currentImage} />
      </div>
    </>
  );
};

export default BuildDetails;
