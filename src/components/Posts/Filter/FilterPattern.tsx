import { Calendar, Search, User } from "lucide-react";
import { Form } from "../../Form";
import { SimpleCard } from "../../SimpleCard";
import { ReactNode } from "react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { UserCard } from "../../UserCard";
import { useGetUsers } from "../../../state/hooks/useGetUsers";
import { Checkbox } from "../../Checkbox";

export function FilterRoot({ title, children }: { title: string, children: ReactNode }) {
  return (
    <SimpleCard title={title}>
      {children}
    </SimpleCard>
  );
}

export function FilterSearchPost() {
  return (
    <Form.Root>
      <Form.Label text="Pesquisar post:" />
      <Form.Input placeholder="Digite o título do post..." iconRight={Search} />
    </Form.Root>
  );
}

export function FilterSearchUser() {
  const usersData = useGetUsers();
  const users = usersData();

  return (
    <>
      <Form.Root>
        <Form.Input placeholder="Pesquisar usuário..." iconRight={User} />
      </Form.Root>
      <ScrollShadow className="flex flex-col gap-[15px] max-h-[500px] overflow-y-scroll scrollbar scrollbar-none">
        {users.map((item) => (
          <UserCard.HandleMark marked={false} key={item.id}>
            <UserCard.Infos userName={item.email} userAvatar={item.avatarUrl ? item.avatarUrl : "images/user.png"} userPostsNumber={item.postsNumber ? item.postsNumber : 0} />
          </UserCard.HandleMark>
        ))}
      </ScrollShadow>
    </>
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