import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { RecoilRoot } from "recoil";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import Login from "./pages/Login";
import ViewPost from "./pages/ViewPost";
import NotFound from "./pages/NotFound";
import Data from "./components/Data";
import UserPerfil from "./pages/UserPerfil";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <NextUIProvider>
          <Routes>
            <Route path="/" element={<Data />}>
              <Route index element={<Home />} />
              <Route path="add" element={<AddPost />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Login signUp />} />
              <Route path="view" element={<ViewPost />} />
              <Route path="user" element={<UserPerfil />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </NextUIProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
}