import Link from 'next/link'

 const Layout = ({ children }) => {
   return (
    <div className="layout">
      <nav className="nav">
        <Link href="/"><a> <h3>Home</h3> </a></Link>
        <Link href="/about"><a> <h3>About</h3> </a></Link>
        <Link href="/"><a> <h3>Builds</h3> </a></Link>
      </nav>
      { children }
    </div>

    )
  }

export default Layout
