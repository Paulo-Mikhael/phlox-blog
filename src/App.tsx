import { INavItems } from "./interfaces/INavItems"
import Header from "./components/Header"
import Hero from "./components/Hero"

function App() {
  const navItems: INavItems[] = [
    {
      name: "Home",
      path: "",
      current: true
    },
    {
      name: "Categorias",
      path: "",
      current: false
    },
    {
      name: "Shop",
      path: "",
      current: false
    },
    {
      name: "Contate-nos",
      path: "",
      current: false
    },
  ]

  return (
    <>
      <div className="mb-[100px]">
        <Header navItems={navItems} />
      </div>
      <div className="w-full flex justify-center z-[1]">
        <Hero />
      </div>
      <div className="bg-typo-150 w-full h-[1000px] absolute top-[630px] pt-[160px] shadow-inner shadow-typo-700/30 flex">
        
      </div>
    </>
  )
}

export default App
