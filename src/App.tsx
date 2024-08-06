import Header from "./components/Header"
import Hero from "./components/Hero"

function App() {
  return (
    <>
      <div className="mb-[100px]">
        <Header />
      </div>
      <div className="w-full flex justify-center">
        <Hero />
      </div>
    </>
  )
}

export default App
