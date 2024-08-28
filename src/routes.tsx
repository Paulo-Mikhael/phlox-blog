import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { RecoilRoot } from "recoil";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import Login from "./pages/Login";
import ViewPost from "./pages/ViewPost";
import NotFound from "./pages/NotFound";
import Data from "./components/Data";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <NextUIProvider>
          <Data />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login signUp />} />
            <Route path="/view" element={<ViewPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </NextUIProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
}