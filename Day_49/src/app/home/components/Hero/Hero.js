import './assets/scss/hero.scss'
import HeroBg from './HeroBg'

const Hero = () => {
  return (
    <section className='hero'>
      <h1 className='hero__heading'>MỌI CHUYẾN ĐI ĐỀU ĐÁNG GIÁ</h1>
      <p className='hero__desc'>Khám Phá Các Vùng Đất Mới Cùng Chúng Tôi Những Chuyến Đi Đang Chờ Đợi Bạn</p>
      <div className='wrap-btn__to-endow'>
        <a href='#endow' className='hero-btn__to-endow'>
          KHÁM PHÁ NGAY
        </a>
      </div>
      <HeroBg />
    </section>
  )
}

export default Hero
