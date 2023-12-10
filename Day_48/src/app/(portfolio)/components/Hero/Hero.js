import Image from 'next/image'
import avatar from '@/assets/imgs/avatar.png'

const Hero = ({ nameUser, introUser, contentLinkIntroProfile }) => {
  return (
    <div className='container'>
      <section className='hero'>
        <figure className='wrap-avatar'>
          <Image src={avatar} alt='avatar' className='img-avatar' />
        </figure>
        <p className='name-user'>{nameUser}</p>
        <h1 className='intro-user'>{introUser}</h1>
        <div className='wrap-link__intro-profile'>
          <a className='link__intro-profile' href='https://dribbble.com/Kawsarvy' target='_blank' rel='noopener noreferrer'>
            <span>{contentLinkIntroProfile}</span>
            <i className='fa-solid fa-up-right-from-square'></i>
          </a>
        </div>
      </section>
    </div>
  )
}

export default Hero
