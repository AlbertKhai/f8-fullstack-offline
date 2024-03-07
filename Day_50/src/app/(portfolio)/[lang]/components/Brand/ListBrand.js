import Image from 'next/image'
import { imgsBrand, nameBrand } from './imgsBrand'

const ListBrand = () => {
  return (
    <ul className='list-brand'>
      {imgsBrand.map((brand, id) => {
        return (
          <li key={id} className='item-brand'>
            <Image className='img-brand' src={brand} alt={nameBrand[id]} />
          </li>
        )
      })}
    </ul>
  )
}

export default ListBrand
