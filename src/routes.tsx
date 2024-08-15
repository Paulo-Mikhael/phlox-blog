import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { NextUIProvider } from "@nextui-org/react";
import AddPost from "./pages/AddPost";
import { RecoilRoot } from "recoil";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <NextUIProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddPost />} />
          </Routes>
        </NextUIProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
}