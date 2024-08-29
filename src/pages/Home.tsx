import { Header } from "../components/Header"
import Hero from "../components/Hero"
import Posts from "../components/Posts"

export default function Home() {

  return (
    <>
      <div className="mb-[100px]">
        <Header />
      </div>
      <div className="w-full flex justify-center z-[1]">
        <Hero />
      </div>
      <div className="bg-typo-150 w-full absolute top-[630px] pt-[160px] shadow-inner shadow-typo-700/30 flex justify-center pb-10">
        <Posts />
      </div>
    </>
  )
}
