import SliderMenu from "../Navbar/SliderMenu"

const MainLayout = ({ children }: any) => {
  return (
    <div id="layout-main">
      <SliderMenu />
      {children}
    </div>
  )
}

export default MainLayout
