import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../interfaces/IUser";
import { useSetActualUser } from "../../state/hooks/useSetActualUser";
import { createUserEmailPassword } from "../../utils/firebase/functions/createUserEmailPassword";
import { insertToDatabase } from "../../utils/firebase/functions/insertToDatabase";
import { signInUserEmailPassword } from "../../utils/firebase/functions/signInUserEmailPassword";
import { Button } from "../Button";
import { Form } from "../Form";
import { useSetUsers } from "../../state/hooks/useSetUsers";
import { getUsers } from "../../utils/getUsers";
import { setActualUser } from "../../utils/setActualUser";

export function LoginForm({ signUp }: { signUp: boolean }) {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setActualUserState = useSetActualUser();
  const navigate = useNavigate();
  const setUsers = useSetUsers();

  function createUser(email: string, password: string) {
    setIsLoading(true);
    const newUser: IUser = {
      email: email
    };

    createUserEmailPassword(email, password)
      .then((userCredentials) => {
        insertToDatabase(`users/${userCredentials.user.uid}`, newUser)
          .then(() => {
            signInUser(email, password);
          })
          .catch((err) => {
            setIsLoading(false);
            throw new Error(err);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setIsLoading(false);
        throw new Error(`Error: ${errorCode} - ${errorMessage}`);
      })
  };
  function signInUser(email: string, password: string) {
    setIsLoading(true);

    signInUserEmailPassword(email, password)
      .then((userCredentials) => {
        setActualUser(setActualUserState, userCredentials.user)
          .then(() => {
            getUsers(setUsers);
            setIsLoading(false);
            navigate("/", { replace: true });
          })
          .catch((err) => {
            throw new Error(err);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        throw new Error(`Error: ${errorCode} - ${errorMessage}`);
      })
  };

  return (
    <Form.Root
      onSubmit={() => {
        signUp === true && createUser(userEmail, userPassword);
        signUp === false && signInUser(userEmail, userPassword);
      }}
    >
      <Form.Label text="Email" htmlFor="#email-login" />
      <Form.Input value={userEmail} onChange={(evt) => setUserEmail(evt.target.value.toLowerCase())} placeholder="Digite seu email" id="email-login" />
      <Form.Label text="Senha" htmlFor="#password-login" />
      <Form.Input value={userPassword} onChange={(evt) => setUserPassword(evt.target.value)} placeholder="Digite sua senha" id="password-login" />
      <Form.Hint className="text-center" hintText="A senha precisa ter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial." />
      <span className="w-full flex justify-center mt-10">
        <Button.Root type="submit" twWidth="w-[234px]" isLoading={isLoading}>
          <Button.Text content={signUp ? "CADASTRAR" : "ENTRAR"} />
        </Button.Root>
      </span>
    </Form.Root>
  );
};