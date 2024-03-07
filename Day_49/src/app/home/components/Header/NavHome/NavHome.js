import Nav from '@/app/components/Header/Nav/Nav'

const NavHome = () => {
  const navLinks = {
    href: ['#home', '#booking', '#endow', '#service', '#gallery', '#review', '#contact'],
    text: ['Trang Chủ', 'Đặt Lịch', 'Ưu Đãi', 'Dịch Vụ', 'Thư Viện', 'Đánh Giá', 'Liên Hệ']
  }
  return <Nav {...navLinks} />
}

export default NavHome
