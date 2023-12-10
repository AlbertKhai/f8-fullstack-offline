import Brand from './Brand/Brand'
import Contact from './Contact/Contact'
import Hero from './Hero/Hero'
import Service from './Service/Service'

const DefaultLayout = ({ hero, service, contact }) => {
  return (
    <>
      <Hero {...hero} />
      <Brand />
      <Service {...service} />
      <Contact {...contact} />
    </>
  )
}

export default DefaultLayout
