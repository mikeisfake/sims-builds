import Image from "next/image";
import Link from "next/link";
import { createClient } from "contentful";
import { useState, useEffect } from "react";
import { NavList } from "../../components/NavList";
import { Details } from "../../components/Details";
import { closeMenu } from "../../functions/HandleMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    description,
    images,
    name,
  } = build.fields;

  const initImg = images[Math.floor(Math.random() * images.length)];
  const [currentImage, setCurrentImage] = useState(initImg);
  const [imageIdx, setImageIdx] = useState(images.indexOf(currentImage));

  useEffect(() => {
    setCurrentImage(initImg);
    closeMenu();
  }, [build]);
  
  useEffect(() => {
    shuffle(images)
  }, [])

  const shuffle = (arr) => {
    let currentIndex = arr.length
    let randomIndex

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--

      [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]
    }
    return arr;
  }

  const galleryImages = images.map((image) => {
    return (
      <div
        className="img-wrapper"
        key={image.public_id}
        onClick={() => {
          setCurrentImage(image);
          setImageIdx(images.indexOf(image));
        }}
        >
        <Image
          src={`${image.public_id}.${image.format}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
    );
  });

  const handlePrevImg = () => {
    let newImg;
    if (imageIdx === 0) {
      newImg = images[images.length - 1];
      setImageIdx(images.length - 1);
    } else {
      newImg = images[imageIdx - 1];
      setImageIdx(imageIdx - 1);
    }
    setCurrentImage(newImg);
  };

  const handleNextImg = () => {
    let lastImg = images.length - 1;
    let newImg;

    if (imageIdx === lastImg) {
      newImg = images[0];
      setImageIdx(0);
    } else {
      newImg = images[imageIdx + 1];
      setImageIdx(imageIdx + 1);
    }
    setCurrentImage(newImg);
  };

  return (
    <div id="build-container">
      <NavList builds={builds} />
      <div className="build_details">
        <article>
          <div className="content">
            <h2>{name}</h2>
            <p> {description} </p>
            <div className="details">
              <Details build={build.fields}/>
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
          <button className="prevbtn" onClick={handlePrevImg}>
            <span>
              <FontAwesomeIcon icon="chevron-left" size="lg"/>
            </span>
          </button>

          <button className="nextbtn" onClick={handleNextImg}>
            <span>
              <FontAwesomeIcon icon="chevron-right" size="lg"/>
            </span>
          </button>
        </div>
        <Image src={currentImage.public_id} layout="fill" objectFit="cover" />
      </div>
    </div>
  );
};

export default BuildDetails;
