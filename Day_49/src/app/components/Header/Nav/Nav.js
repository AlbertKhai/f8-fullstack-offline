const Nav = ({ href, text }) => {
  return (
    <nav className='nav'>
      {href?.map((item, index) => (
        <a key={index} className='nav-link' href={item}>
          {text[index]}
        </a>
      ))}
    </nav>
  )
}

export default Nav
