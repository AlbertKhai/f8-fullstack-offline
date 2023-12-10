const Contact = ({ title, contentLinkContact }) => {
  return (
    <div className='container'>
      <section className='contact'>
        <h2 className='contact-title'>{title}</h2>
        <div className='wrap-link__contact'>
          <a className='link__contact' href='mailto:kawsarvy.design@gmail.com'>
            <span>{contentLinkContact}</span>
            <i className='fa-regular fa-envelope'></i>
          </a>
        </div>
      </section>
    </div>
  )
}

export default Contact
