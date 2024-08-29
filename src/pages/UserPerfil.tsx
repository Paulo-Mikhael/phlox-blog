import { Book } from "lucide-react";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Filter } from "../components/Posts/Filter";
import { Post } from "../components/Posts/Post";
import { UserCard } from "../components/UserCard";
import { usePosts } from "../state/hooks/usePosts";
import { HandleBadges } from "../utils/HandleBadges";
import { Link } from "react-router-dom";
import { getNavItem } from "../utils/getNavItem";
import { useRecoilValue } from "recoil";
import { actualUserState } from "../state/atom";
import NotFound from "./NotFound";

export default function UserPerfil() {
  const posts = usePosts();
  const user = useRecoilValue(actualUserState);

  if (!user) return <NotFound />;

  const navItems = getNavItem("Meu Perfil", [
    { 
      name: "Meu Perfil", 
      path: "/user", 
      current: false
    }
  ]);

  return (
    <>
      <Header userPerfil navItems={navItems}>
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
            userName={user.data.email}
            userAvatar={user.data.avatarUrl ? user.data.avatarUrl : "images/user.png"}
            userPostsNumber={user.data.postsNumber}
          />
          </UserCard.Root>
          <Button.Root>
            <Button.Text content="PERSONALIZAR" />
          </Button.Root>
        </div>
        <div className="w-full h-[2px] bg-typo-200 mt-1 mb-10" />
        <section className="flex gap-10">
          <div className="w-[796px]">
            <h1 className="text-section text-typo-700 mb-4">
              Minhas Postagens:
            </h1>
            <Post.Root format="list">
              {posts.map((item) => (
                <Post.Card key={item.id} {...item} />
              ))}
            </Post.Root>
          </div>
          <div className="flex flex-col gap-5">
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