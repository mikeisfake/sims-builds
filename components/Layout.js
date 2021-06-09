import Link from 'next/link'

 const Layout = ({ children }) => {
   return (
    <div className="layout">
      <Link href="/"><a> Home </a></Link>
      <Link href="/about"><a> About </a></Link>
      { children }
    </div>

    )
  }

export default Layout
