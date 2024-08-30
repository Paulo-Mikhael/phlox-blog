import { Calendar, Search, User } from "lucide-react";
import { Form } from "../../Form";
import { SimpleCard } from "../../SimpleCard";
import { ReactNode } from "react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { UserCard } from "../../UserCard";
import { Checkbox } from "../../Checkbox";
import { useUsers } from "../../../state/hooks/useUsers";
import { useSetFilterPostTitle } from "../../../state/hooks/useSetFilterPostTitle";

export function FilterRoot({ title, children }: { title: string, children: ReactNode }) {
  return (
    <SimpleCard title={title}>
      {children}
    </SimpleCard>
  );
}

export function FilterSearchPost() {
  const setFilterPostTitle = useSetFilterPostTitle();

  return (
    <Form.Root>
      <Form.Label text="Pesquisar post:" />
      <Form.Input 
        onChange={(evt) => {
          const value = evt.target.value;

          value !== "" ? setFilterPostTitle(value) : setFilterPostTitle("");
        }} 
        placeholder="Digite o título do post..." 
        iconRight={Search} 
      />
    </Form.Root>
  );
}

export function FilterSearchUserInput() {
  return (
    <Form.Root>
      <Form.Input placeholder="Pesquisar usuário..." iconRight={User} />
    </Form.Root>
  );
}

export function FilterSearchUserCards() {
  const users = useUsers();

  return (
    <ScrollShadow className="flex flex-col gap-[15px] max-h-[500px] overflow-y-scroll scrollbar scrollbar-none">
      {users.map((item) => (
        <UserCard.Root variant="bordered" key={item.id}>
          <UserCard.Infos userName={item.email} userAvatar={item.avatarUrl ? item.avatarUrl : "images/user.png"} userPostsNumber={item.postsNumber ? item.postsNumber : 0} />
          <UserCard.HandleMark marked={false} />
        </UserCard.Root>
      ))}
    </ScrollShadow>
  );
}

export function FilterDate() {
  return (
    <div className="flex flex-col gap-2">
      <Checkbox.Root>
        <Checkbox.Input id="filter-checkbox" />
        <Checkbox.Label labelText="Filtrar por data" htmlFor="filter-checkbox" />
      </Checkbox.Root>
      <Form.Root twWidth="w-[326px]">
        <Form.Input iconRight={Calendar} type="date" />
      </Form.Root>
    </div>
  );
}