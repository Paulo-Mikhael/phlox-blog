import { Calendar, Search, User } from "lucide-react";
import { Form } from "../../Form";
import { SimpleCard } from "../../SimpleCard";
import { ReactNode } from "react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { UserCard } from "../../UserCard";
import { Checkbox } from "../../Checkbox";
import { useSetFilterPostTitle } from "../../../state/hooks/useSetFilterPostTitle";
import { useFilteredUsers } from "../../../state/hooks/useFilteredUsers";
import { useSetFilterUserEmail } from "../../../state/hooks/useSetFilterUserEmail";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { actualUserState } from "../../../state/atom";
import { IUser, IUserFavorite } from "../../../interfaces/IUser";

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
  const setFilterUserEmail = useSetFilterUserEmail();

  return (
    <Form.Root>
      <Form.Input
        placeholder="Pesquisar usuário..."
        iconRight={User}
        onChange={(evt) => setFilterUserEmail(evt.target.value)}
      />
    </Form.Root>
  );
}

export function FilterSearchUserCards() {
  const users = useFilteredUsers();

  return (
    <CardUser users={users} />
  );
}
export function FilterSearchUserFavoritesCard({ usersFavorited }: { usersFavorited: IUser[] }) {
  return (
    <CardUser users={usersFavorited} handleMark={false} />
  );
}

export function FilterDate() {
  return (
    <div className="flex flex-col gap-2">
      <Checkbox.Root>
        <Checkbox.Input id="filter-checkbox" />
        <Checkbox.Label labelText="Filtrar por data" htmlFor="filter-checkbox" />
      </Checkbox.Root>
      <Form.Root>
        <Form.Input iconRight={Calendar} type="date" />
      </Form.Root>
    </div>
  );
}

function CardUser({ users, handleMark = true }: { users: IUser[], handleMark?: boolean }) {
  const actualUser = useRecoilValue(actualUserState);
  const navigate = useNavigate();

  return (
    <ScrollShadow className="flex flex-col gap-[15px] max-h-[500px] overflow-y-scroll scrollbar scrollbar-none">
      {users.map((item) => (
        <UserCard.Root variant="bordered" key={item.id}>
          <UserCard.Infos
            userName={item.email}
            userAvatar={item.avatarUrl ? item.avatarUrl : "images/user.png"}
            userPostsNumber={item.postsNumber ? item.postsNumber : 0}
            onClick={() => {
              navigate(`/user?${item.id}`);
              window.scrollTo(0, 0);
            }}
          />
          {handleMark && (
            <>
              {actualUser && actualUser.data.id !== item.id && (
                <UserCard.HandleMark
                  userId={item.id}
                  marked={actualUser.data.usersFavorited?.find((userId) => userId.id === item.id && userId.favorited === true) ? true : false}
                />
              )}
              {!actualUser && (
                <UserCard.HandleMark
                  marked={false}
                />
              )}
            </>
          )}
        </UserCard.Root>

      ))}
    </ScrollShadow>
  );
}