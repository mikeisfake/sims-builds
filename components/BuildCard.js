import Link from "next/link";
import Image from "next/image";

export default function BuildCard({ build }) {
  const { name, slug, coverImage, lotSize, lotType, world, cost } =
    build.fields;
  let imageURL = coverImage[0].public_id;
  return (
    <Link href={"/builds/" + slug}>
      <div id="build-card">
        <div className="image">
          <Image
            src={imageURL}
            alt={name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="details">
          <h2 className="name">{name}</h2>
          <p> {lotSize} </p>
          <p> {world} </p>
          <p> {lotType} </p>
          <p> §{cost.toLocaleString()}.00 </p>
        </div>
      </div>
    </Link>
  );
}
