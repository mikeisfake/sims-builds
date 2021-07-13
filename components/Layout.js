import Link from 'next/link'
import { useEffect } from 'react';
import { openMenu, closeMenu } from '../functions/HandleMenu';


 const Layout = ({ children }) => {

  useEffect(() => {
    closeMenu()
  }, [])


   return (
     <div className="layout">
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