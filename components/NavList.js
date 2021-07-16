import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import { createClient } from "contentful";

export const NavList = ({ builds }) => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('')
  
  const handleChange = (event) => {
      setSearchTerm(event.target.value);
      console.log(searchTerm)
  }
  
  const buildLinks = builds
  .filter(build => {
    if (searchTerm == '') {
      return build
    } else if (build.fields.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return build
    }
  }).map((build) => {
    let name = build.fields.name;
    let slug = build.fields.slug;
    
    return (
      <li key={slug} className={router.query.slug === slug ? "active" : ""}>
        <Link href={`/builds/${slug}`}>
          {name}
        </Link>
      </li>
    );
  });

  return (
    <div id="nav-list">
      <h2>
        <Link href="/">
          index
        </Link>
      </h2>
      <div className="search">
        <input type="search" placeholder="search" onChange={handleChange}/>
        <span className="focus-bg"></span>
      </div>
      <ul className="builds">{buildLinks}</ul>

      <div className="description">
        <h4>About.</h4>
        This app is designed to show off some of my favorite builds I've made in
        The Sims 4. When I'm not coding my favorite activity is building houses
        in The Sims.
        <br />
        <br />
        This app was created using Next.js on the front end and the content is
        managed from Contentful
      </div>
    </div>
  );
};
