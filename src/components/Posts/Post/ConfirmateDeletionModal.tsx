import { useState } from "react";
import { Button } from "../../Button";
import { Form } from "../../Form";
import { Modal } from "../../Modal";
import { useActualUser } from "../../../state/hooks/useActualUser";
import { useSetPosts } from "../../../state/hooks/useSetPosts";
import { useSetUsers } from "../../../state/hooks/useSetUsers";
import { insertToDatabase } from "../../../utils/firebase/functions/insertToDatabase";
import { getPosts } from "../../../utils/getPosts";
import { getUsers } from "../../../utils/getUsers";
import { useSetModalValue } from "../../../state/hooks/useSetModalValue";

export function ConfirmateDeletionModal({ postId }: { postId: string }) {
  const setDeleteConfimationModal = useSetModalValue("CDM");
  const [deletingPost, setDeletingPost] = useState<boolean>(false);
  const actualUser = useActualUser();
  const setUsers = useSetUsers();
  const setPosts = useSetPosts();

  return (
    <Modal modalKey={postId}>
      <Form.Root>
        <Form.Label className="w-full text-center mb-5" text={`Deseja excluir o post ${postId}?`} />
        {deletingPost === false && (
          <div className="flex w-full gap-3">
            <span className="flex-1">
              <Button.Root
                twWidth="w-full"
                onClick={() => {
                  setDeletingPost(true);
                  insertToDatabase(`users/${actualUser?.data.id}/posts/${postId}`, null).then(
                    () => {
                      getUsers(setUsers);
                      getPosts(setPosts).then(() => {
                        setDeleteConfimationModal(false);
                        setDeletingPost(false);
                      });
                    }
                  );
                }}
              >
                <Button.Text content="SIM" />
              </Button.Root>
            </span>
            <span className="flex-1">
              <Button.Root
                twWidth="w-full"
                variant="outlined"
                onClick={() => {
                  setDeleteConfimationModal(false);
                }}
              >
                <Button.Text content="NÃO" />
              </Button.Root>
            </span>
          </div>
        )}
        {deletingPost === true && (
          <p className="w-full text-section-subtitle text-feedback-danger text-center">
            Excluindo...
          </p>
        )}
      </Form.Root>
    </Modal>
  );
}
