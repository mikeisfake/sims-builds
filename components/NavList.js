import Link from "next/link";
import { useRouter } from 'next/router'
import { createClient } from "contentful";

export const NavList = ({ builds }) => {
  const router = useRouter()

  
  const buildLinks = builds.map((build) => {
    let name = build.fields.name;
    let slug = build.fields.slug;
    
    return (
      <li className={router.query.slug === slug ? "active" : ""}>
        <Link href={`/builds/${slug}`}>
          {name}
        </Link>
      </li>
    );
  });

  return (
    <div id="nav-list">
      <h2>
        <Link className="home-link" href="/">
          index
        </Link>
      </h2>
      <ul className="builds">{buildLinks}</ul>

      <p className="description">
        <h4>About.</h4>
        This app is designed to show off some of my favorite builds I've made in
        The Sims 4. When I'm not coding my favorite activity is building houses
        in The Sims.
        <br />
        <br />
        This app was created using Next.js on the front end and the content is
        managed from Contentful
      </p>
    </div>
  );
};
