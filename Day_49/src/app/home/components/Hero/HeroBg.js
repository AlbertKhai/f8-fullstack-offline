'use client'

import { useState } from 'react'
import clsx from 'clsx'

const linksVideo = [
  'https://code-fullstack-exercise49.vercel.app/videos/vid-1.mp4',
  'https://code-fullstack-exercise49.vercel.app/videos/vid-2.mp4',
  'https://code-fullstack-exercise49.vercel.app/videos/vid-3.mp4'
]

const HeroBg = () => {
  const [idBg, setIdBg] = useState(0)

  const handleSwitchBg = (index) => {
    setIdBg(index)
  }

  return (
    <div className='hero__bg'>
      <video className='hero__video-bg' src={linksVideo[idBg]} loop autoPlay={true} muted></video>
      <div className='switch-bg'>
        {linksVideo.map((_, index) => (
          <button
            onClick={() => handleSwitchBg(index)}
            key={index}
            className={clsx('btn__switch-bg', idBg === index && 'active')}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default HeroBg
