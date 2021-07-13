import Link from 'next/link'
import Head from 'next/head'
import { useEffect } from 'react';
import { openMenu, closeMenu } from '../functions/HandleMenu';


 const Layout = ({ children }) => {

  useEffect(() => {
    closeMenu()
  }, [])


   return (
     <div className="layout">
       <Head>
         <title>Sims Builds</title>
         <meta name="description" content="A site for sharing my builds in The Sims 4"></meta>
         <meta property="og:type" content="website"></meta> 
         <meta property="og:site_name" content="Sims 4 Builds"></meta> 
         <meta property="og:title" content="Sims Builds"></meta>
         <meta property="og:description" content="A site for sharing my builds in The Sims 4"></meta>
         <meta property="og:image" content="https://photos.app.goo.gl/Ly54Ho1wpfJ5SHp99"></meta>
       </Head>
       <div id="cover" onClick={closeMenu}></div>
       <nav className="nav" onClick={openMenu}>
         {/* {"\u25EF \u25EF \u25EF"} */}
         <div className="circle"></div>
         <div className="circle"></div>
         <div className="circle"></div>
       </nav>

       {children}
     </div>
   );
  }

export default Layout