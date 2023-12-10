const Service = ({ title, nameServices, descServices }) => {
  const iconServices = ['fa-table-layout', 'fa-laptop-mobile', 'fa-swatchbook', 'fa-code']

  return (
    <div className='container'>
      <section className='service'>
        <h2 className='service-title'>{title}</h2>
        <ul className='list-service'>
          {nameServices.map((service, index) => {
            return (
              <li key={index} className='item-service'>
                <div className='item-service__icon'>
                  <i className={`fa-regular ${iconServices[index]}`}></i>
                </div>
                <h3 className='item-service__name'>{service}</h3>
                <p className='item-service__desc'>{descServices[index]}</p>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export default Service
