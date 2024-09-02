import { useEffect } from "react";
import { getPosts } from "../../utils/getPosts";
import { getUsers } from "../../utils/getUsers";
import { Outlet } from "react-router-dom";
import { useSetPosts } from "../../state/hooks/useSetPosts";
import { useSetUsers } from "../../state/hooks/useSetUsers";

export default function Data() {
  const setUsers = useSetUsers();
  const setPosts = useSetPosts();

  function getData() {
    getPosts(setPosts);
    getUsers(setUsers);
  };

  useEffect(() => {
    getData();
  }, []);
  
  return (
    <span>
      <Outlet />
    </span>
  );
}