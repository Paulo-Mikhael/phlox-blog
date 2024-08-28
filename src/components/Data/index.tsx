import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { usersState, postsState } from "../../state/atom";
import { getPosts } from "../../utils/getPosts";
import { getUsers } from "../../utils/getUsers";

export default function Data() {
  const setUsers = useSetRecoilState(usersState);
  const setPosts = useSetRecoilState(postsState);

  function getData() {
    getPosts(setPosts);
    getUsers(setUsers);
  };

  useEffect(() => {
    getData();
  }, []);
  
  return (
    <></>
  );
}