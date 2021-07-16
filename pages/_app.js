import '../styles/app.scss'
import Layout from '../components/Layout'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGlobeEurope, faBorderAll, faHome, faMoneyBill, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

library.add(faGlobeEurope, faBorderAll, faHome, faMoneyBill, faChevronRight, faChevronLeft);

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
