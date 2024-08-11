import { Calendar, List, Search, Table, User } from "lucide-react";
import { Badge } from "../Bagde";
import { Form } from "../Form";
import { SimpleCard } from "../SimpleCard";
import { UserCard } from "../UserCard";
import { Checkbox } from "../Checkbox";
import { SwitchButton } from "../SwitchButton";
import { useState } from "react";
import { Post } from "../PostCard";

export default function Posts() {
  const [switchActivedSide, setSwitchActivedSide] = useState<"left" | "right">("left");
  const [postsFormat, setPostsFormat] = useState<"table"| "list">("table");

  return (
    <div className="flex gap-[50px]">
      <aside className="flex flex-col gap-5 w-[320px] pt-[7px]">
        <Form.Root>
          <Form.Label text="Pesquisar post:" />
          <Form.Input placeholder="Digite o título do post..." iconRight={Search} />
        </Form.Root>
        <SimpleCard title="Categorias">
          <div className="flex gap-2 flex-wrap">
            <Badge text="História" twBackgroundColor="bg-badge-history" removeButton />
            <Badge text="Oferta" twBackgroundColor="bg-badge-offer" removeButton />
            <Badge text="Notícia" twBackgroundColor="bg-badge-news" removeButton />
            <Badge text="Tecnologia" twBackgroundColor="bg-badge-tecnology" removeButton />
            <Badge text="Programação" twBackgroundColor="bg-badge-programation" removeButton />
            <Badge text="Oportunidade" twBackgroundColor="bg-badge-oportunity" removeButton />
            <Badge removeButton />
          </div>
        </SimpleCard>
        <SimpleCard title="Usuários">
          <Form.Root>
            <Form.Input placeholder="Pesquisar usuário..." iconRight={User} />
          </Form.Root>
          <div className="flex flex-col gap-[15px] max-h-[500px] overflow-y-scroll scrollbar scrollbar-none">
            <UserCard marked={false} />
            <UserCard marked={true} />
            <UserCard marked={false} />
            <UserCard marked={false} />
            <UserCard marked={false} />
            <UserCard marked={true} />
            <UserCard marked={true} />
            <UserCard marked={true} />
          </div>
        </SimpleCard>
      </aside>
      <main className="w-[796px] flex flex-col gap-5 max-xl:w-[500px]">
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
          <Post.Card />
          <Post.Card />
          <Post.Card />
          <Post.Card />
        </Post.Root>
      </main>
    </div>
  );
}