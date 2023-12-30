import ColumnFooter from './ColumnFooter'
import SocialFooter from './SocialFooter'

const TopFooter = () => {
  const listColumnFooter = [
    {
      titleColumn: 'Features',
      linkNav: '#!',
      contentsNav: ['Cool stuff', 'Random feature', 'Team feature', 'Stuff for developers', 'Another one', 'Last time']
    },
    {
      titleColumn: 'Resources',
      linkNav: '#!',
      contentsNav: ['Resource', 'Resource name', 'Another resource', 'Final resource']
    },
    {
      titleColumn: 'About',
      linkNav: '#!',
      contentsNav: ['Team', 'Locations', 'Privacy', 'Terms']
    },
    {
      titleColumn: 'Help',
      linkNav: '#!',
      contentsNav: ['Support', 'Help Center', 'Contact Us']
    }
  ]

  return (
    <div className='sm:flex sm:flex-wrap sm:-mx-4 md:py-4'>
      {listColumnFooter.map((item, index) => {
        return <ColumnFooter key={index} {...item} />
      })}
      <SocialFooter />
    </div>
  )
}

export default TopFooter
