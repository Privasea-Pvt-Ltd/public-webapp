import Navbar from '../components/Navbar'
import UnderConstruction from '../components/UnderConstruction'
import Features from '../components/Features'
import Pricing from '../components/Pricing'
import Footer from '../components/Footer'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate } from 'react-router-dom'

function Home() {
  const {isLoggedIn} = useContext(AppContext);

  if (isLoggedIn === null) {
    return <Navigate to="/public-webapp/dashboard" replace />;
  }

  return (
    <>
      <Navbar />
      <UnderConstruction />
      {/* <Features/> */}
      <Pricing />
      <Footer />
    </>
  )
}

export default Home
