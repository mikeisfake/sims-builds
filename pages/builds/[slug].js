import Image from "next/image";
import Link from "next/link";
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
  console.log(build);
  const {
    cost,
    coverImage,
    description,
    features,
    images,
    lotSize,
    name,
    world,
    customContent,
  } = build.fields;

  const initImg = images[Math.floor(Math.random() * images.length)].public_id;
  const [currentImage, setCurrentImage] = useState(initImg);

  useEffect(() => {
    setCurrentImage(initImg);
    closeMenu();
  }, [build]);

  const galleryImages = images.map((data) => {
    let imageURL = data.public_id;
    console.log(imageURL);
    return (
      <div
        className="img-wrapper"
        onClick={() => {
          setCurrentImage(imageURL);
        }}
      >
        <Image src={imageURL} layout="fill" objectFit="cover" />
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
                <span>world</span> {world}
                <br />
                <span>lot size</span> {lotSize}
                <br />
                <span>cost</span> {`§${cost.toLocaleString()}.00`}
              </p>

              <p>
                <span>building features</span>
                <ul>{featuresList}</ul>
              </p>

              {customContent && (
                <p>
                  <span>Custom Content Creators</span>
                  <ul>{creatorsList}</ul>
                </p>
              )}
            </div>
          </div>
          <div className="gallery">
            <h2>Gallery</h2>
            <div className="gallery-images">{galleryImages}</div>
          </div>
        </article>
      </div>
      <div className="img-container">
        <div className="blocker"></div>
        <Image
          src={currentImage}
          layout="fill"
          objectFit="cover"
          priority="true"
        />
      </div>
    </>
  );
};

export default BuildDetails;
