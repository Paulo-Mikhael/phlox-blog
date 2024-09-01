import { Post } from "./Post";
import { HandleBadges } from "../../utils/HandleBadges";
import { Filter } from "./Filter";

export default function Posts() {
  return (
    <div className="flex gap-[50px]">
      <aside className="flex flex-col gap-5 w-[320px]">
        <Filter.SearchPost />
        <Filter.Root title="Categorias">
          <HandleBadges />
        </Filter.Root>
        <Filter.Root title="Usuários">
          <Filter.SearchUser.Input />
          <Filter.SearchUser.Cards />
        </Filter.Root>
      </aside>
      <main className="w-[796px] flex flex-col gap-5 max-xl:w-[500px] pt-[7px]">
        <span className="flex justify-between">
          <Filter.Date />
          <Post.FormatButton />
        </span>
        <Post.Cards />
      </main>
    </div>
  );
}