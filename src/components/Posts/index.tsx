import { Calendar, List, Search, Table, User } from "lucide-react";
import { Form } from "../Form";
import { SimpleCard } from "../SimpleCard";
import { UserCard } from "../UserCard";
import { Checkbox } from "../Checkbox";
import { SwitchButton } from "../SwitchButton";
import { useState } from "react";
import { Post } from "./Post";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { HandleBadges } from "../../utils/HandleBadges";
import { useGetPosts } from "../../state/hooks/usePosts";

export default function Posts() {
  const [switchActivedSide, setSwitchActivedSide] = useState<"left" | "right">("left");
  const [postsFormat, setPostsFormat] = useState<"table" | "list">("table");
  const postsData = useGetPosts();
  const posts = postsData();

  return (
    <div className="flex gap-[50px]">
      <aside className="flex flex-col gap-5 w-[320px]">
        <Form.Root>
          <Form.Label text="Pesquisar post:" />
          <Form.Input placeholder="Digite o título do post..." iconRight={Search} />
        </Form.Root>
        <SimpleCard title="Categorias">
          <HandleBadges />
        </SimpleCard>
        <SimpleCard title="Usuários">
          <Form.Root>
            <Form.Input placeholder="Pesquisar usuário..." iconRight={User} />
          </Form.Root>
          <ScrollShadow className="flex flex-col gap-[15px] max-h-[500px] overflow-y-scroll scrollbar scrollbar-none">
            <UserCard marked={false} />
            <UserCard marked={true} />
            <UserCard marked={false} />
            <UserCard marked={false} />
            <UserCard marked={false} />
            <UserCard marked={true} />
            <UserCard marked={true} />
            <UserCard marked={true} />
          </ScrollShadow>
        </SimpleCard>
      </aside>
      <main className="w-[796px] flex flex-col gap-5 max-xl:w-[500px] pt-[7px]">
        <span className="flex justify-between">
          <div className="flex flex-col gap-2">
            <Checkbox.Root>
              <Checkbox.Input id="filter-checkbox" />
              <Checkbox.Label labelText="Filtrar por data" htmlFor="filter-checkbox" />
            </Checkbox.Root>
            <Form.Root twWidth="w-[326px]">
              <Form.Input iconRight={Calendar} type="date" />
            </Form.Root>
          </div>
          <SwitchButton.Root>
            <SwitchButton.LeftIcon icon={Table} actived={switchActivedSide === "left"} onClick={() => {
              setSwitchActivedSide("left");
              setPostsFormat("table");
            }} />
            <SwitchButton.RightIcon icon={List} actived={switchActivedSide === "right"} onClick={() => {
              setSwitchActivedSide("right");
              setPostsFormat("list");
            }} />
          </SwitchButton.Root>
        </span>
        <Post.Root format={postsFormat} >
          {posts.map((item) => (
            <Post.Card key={item.id} {...item} />
          ))}
          <Post.Pagination total={8} initialPage={1} />
        </Post.Root>
      </main>
    </div>
  );
}