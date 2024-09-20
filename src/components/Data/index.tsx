import { useEffect } from "react";
import { getPosts } from "../../utils/getPosts";
import { getUsers } from "../../utils/getUsers";
import { Outlet } from "react-router-dom";
import { useSetPosts } from "../../state/hooks/useSetPosts";
import { useSetUsers } from "../../state/hooks/useSetUsers";
import { useCreateModal } from "../../state/hooks/useCreateModal";

export default function Data() {
  const setUsers = useSetUsers();
  const setPosts = useSetPosts();
  const createModal = useCreateModal();

  function getData() {
    getPosts(setPosts);
    getUsers(setUsers);
  }

  useEffect(() => {
    getData();
    createModal("PPM"); // Personalize Perfil Modal
    createModal("LM"); // Login Modal
    createModal("HBM"); // Handle Badges Modal
    createModal("OCM"); // Open Calendar Modal
    createModal("CDM"); // Confirm Deletion Modal
  }, []);

  return (
    <span>
      <Outlet />
    </span>
  );
}
