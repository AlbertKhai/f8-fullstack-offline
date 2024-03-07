export const metadata = {
  title: 'Giới thiệu - Mindmap Flow',
  description: 'Giới thiệu - Mindmap Flow - Project Front-end'
}

import AboutUs from './components/AboutUs'
import OurStory from './components/OurStory'

const About = () => {
  return (
    <main className='2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4'>
      <AboutUs />
      <OurStory />
    </main>
  )
}

export default About
