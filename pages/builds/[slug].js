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

  const initImg = images[Math.floor(Math.random() * images.length)];
  // const initImgURL = initImg.public_id
  const [currentImage, setCurrentImage] = useState(initImg);
  const [imageIdx, setImageIdx] = useState(images.indexOf(currentImage))

  useEffect(() => {
    setCurrentImage(initImg);
    closeMenu();
  }, [build]);

  const galleryImages = images.map((data) => {
    return (
      <div
        className="img-wrapper"
        key={data.public_id}
        onClick={() => {
          setCurrentImage(data);
          setImageIdx(images.indexOf(data))
        }}
      >
        <Image src={data.public_id} layout="fill" objectFit="cover" />
      </div>
    );
  });

  const handlePrevImg = () => {
    if (imageIdx === 0) {
      const newImg = images[images.length - 1]
      setImageIdx(images.length -1)
      setCurrentImage(newImg)
    } else {
      const newImg = images[imageIdx - 1]
      setImageIdx(imageIdx - 1)
      setCurrentImage(newImg)
    }
  }

  const handleNextImg = () => {
    let lastImg = images.length - 1 

    if (imageIdx === lastImg) {
      const newImg = images[0];
      setImageIdx(0)
      setCurrentImage(newImg);
    } else {
      const newImg = images[imageIdx + 1];
      setImageIdx(imageIdx + 1)
      setCurrentImage(newImg);
    }
  };
  

  const featuresList = features.map((feature) => {
    return <li key={feature}>{feature}</li>;
  });

  const creatorsList =
    customContent &&
    customContent.map((creator) => {
      return <li key={creator}>{creator}</li>;
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
              <section>
                <span>world</span> {world}
                <br />
                <span>lot size</span> {lotSize}
                <br />
                <span>cost</span> {`§${cost.toLocaleString()}.00`}
              </section>

              <section>
                <span>building features</span>
                <ul>{featuresList}</ul>
              </section>

              {customContent && (
                <section>
                  <span>Custom Content Creators</span>
                  <ul>{creatorsList}</ul>
                </section>
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
        <div className="blocker">
          <button className="prevbtn" onClick={handlePrevImg}> <span>prev</span> </button>
          <button className="nextbtn" onClick={handleNextImg}> <span>next</span> </button>
        </div>
        <Image
          src={currentImage.public_id}
          layout="fill"
          objectFit="cover"
        />
      </div>
    </>
  );
};

export default BuildDetails;
