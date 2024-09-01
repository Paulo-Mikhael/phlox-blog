import { Book } from "lucide-react";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Filter } from "../components/Posts/Filter";
import { Post } from "../components/Posts/Post";
import { UserCard } from "../components/UserCard";
import { HandleBadges } from "../utils/HandleBadges";
import { Link, useLocation } from "react-router-dom";
import { getNavItem } from "../utils/getNavItem";
import NotFound from "./NotFound";
import { getUserById } from "../utils/getUserById";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { actualUserState } from "../state/atom";
import { useFilteredUserPosts } from "../state/hooks/useFilteredUserPosts";

export default function UserPerfil() {
  const location = useLocation();
  const userId = location.search.replace("?", "");
  const user = getUserById(userId);
  const actualUser = useRecoilValue(actualUserState);
  const posts = useFilteredUserPosts(userId);
  const navItems = getNavItem("");
  const navItemsActualUser = getNavItem("Meu Perfil", [
    {
      name: "Meu Perfil",
      path: `${actualUser ? `/user?${actualUser.data.id}` : ""}`,
      current: false
    }
  ]);

  if (user.email === "invalid data") return <NotFound />;
  if (!posts) return <NotFound />;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header userPerfil={actualUser !== null} navItems={actualUser && userId === actualUser.data.id ? navItemsActualUser : navItems}>
        <Link to="/add">
          <Button.Root variant="outlined">
            <Button.Text content="FAZER UM POST" />
            <Button.Icon icon={Book} />
          </Button.Root>
        </Link>
      </Header>
      <main className="px-[100px] py-[30px]">
        <div className="flex justify-between items-center">
          <UserCard.Root>
            <UserCard.Infos
              userName={user.email}
              userAvatar={user.avatarUrl ? user.avatarUrl : "images/user.png"}
              userPostsNumber={user.postsNumber}
            />
          </UserCard.Root>
          <Button.Root>
            <Button.Text content="PERSONALIZAR" />
          </Button.Root>
        </div>
        <div className="w-full h-[2px] bg-typo-200 mt-1 mb-10" />
        <section className="flex justify-between gap-10">
          <div className="xl:max-w-[70%]">
            <h1 className="text-section text-typo-700 mb-4">
              Minhas Postagens:
            </h1>
            <Post.Root format="list">
              {posts.map((item) => (
                <Post.Card key={item.id} {...item} />
              ))}
            </Post.Root>
          </div>
          <div className="flex flex-col gap-5 w-80">
            <Filter.SearchPost />
            <Filter.Date />
            <Filter.Root title="Categorias">
              <HandleBadges />
            </Filter.Root>
            <Filter.Root title="Usuários Favoritados">
              <Filter.SearchUser.Input />
              <Filter.SearchUser.Cards />
            </Filter.Root>
          </div>
        </section>
      </main>
    </>
  );
}