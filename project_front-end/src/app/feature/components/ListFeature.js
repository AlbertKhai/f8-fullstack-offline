import React from 'react'
import ItemFeature from './ItemFeature'

import { faBolt, faCode, faWrench } from '@fortawesome/free-solid-svg-icons'

const ListFeature = () => {
  const listFeature = [
    {
      title: 'Fresh Design',
      icon: faBolt,
      desc: 'FWR blocks bring in an air of fresh design with their creative layouts and blocks, which are easily customizable.'
    },
    {
      title: 'Clean Code',
      icon: faCode,
      desc: 'FWR blocks bring in an air of fresh design with their creative layouts and blocks, which are easily customizable.'
    },
    {
      title: 'Perfect Tool',
      icon: faWrench,
      desc: 'FWR blocks bring in an air of fresh design with their creative layouts and blocks, which are easily customizable.'
    }
  ]

  return (
    <section className='md:flex md:-mx-4 mt-12 md:pt-4'>
      {listFeature.map((item, index) => (
        <ItemFeature key={index} {...item} />
      ))}
    </section>
  )
}

export default ListFeature
