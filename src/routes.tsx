import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { RecoilRoot } from "recoil";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import Login from "./pages/Login";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <NextUIProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<Login signUp />} />
          </Routes>
        </NextUIProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
}