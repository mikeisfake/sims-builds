import Link from "next/link";
import Image from "next/image";

export default function BuildCard({ build }) {
  const { name, slug, coverImage, lotSize, lotType, world, cost } = build.fields;

  return (
    <Link href={"/builds/" + slug}>
      <div id="build-card">
        <div className="image">
          <img src={"https:" + coverImage.fields.file.url} alt={name} />
        </div>
        <h4 className="name">{name}</h4>
        <div className="details">
          <p> {lotSize} </p>
          <p> {world} </p>
          <p> {lotType} </p>
          <p> §{cost}.00 </p>
        </div>
      </div>
    </Link>
  );
}
