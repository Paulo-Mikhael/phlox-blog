import { useEffect, useState } from "react";
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
import { itHas } from "../../utils/isHas";
import { emailDomains } from "../../data/emailDomains";
import { specialCharacters } from "../../data/specialCharacters";
import { upperLetters } from "../../data/upperLetters";
import { numerals } from "../../data/numerals";
import { Eye, EyeOff } from "lucide-react";

export function LoginForm({ signUp }: { signUp: boolean }) {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState<boolean>(false);
  const setActualUserState = useSetActualUser();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const setUsers = useSetUsers();
  const EyeIcon = hidePassword === true ? EyeOff : Eye;

  function createUser(email: string, password: string) {
    setIsLoading(true);
    const newUser: IUser = {
      email: email,
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
      });
  }
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

        setIsLoading(false);
        setErrorMessage(errorCode);
      });
  }

  function Verification(): boolean {
    if (userEmail === "") {
      setErrorMessage("O campo 'Email' é obrigatório");
      return false;
    }
    if (itHas(userEmail, emailDomains) === false) {
      setErrorMessage("Email inválido");
      return false;
    }
    if (userPassword === "") {
      setErrorMessage("O campo 'Senha' é obrigatório");
      return false;
    }
    if (userPassword.length < 8) {
      setErrorMessage("A senha precisa ter pelo menos 8 caracteres");
      return false;
    }
    if (itHas(userPassword, upperLetters) === false) {
      setErrorMessage("A senha precisa ter uma letra maiúscula");
      return false;
    }
    if (itHas(userPassword, numerals) === false) {
      setErrorMessage("A senha precisa ter um número");
      return false;
    }
    if (itHas(userPassword, specialCharacters) === false) {
      setErrorMessage("A senha precisa ter um caractere especial");
      return false;
    }

    return true;
  }

  useEffect(() => {
    if (errorMessage === "auth/invalid-email" || errorMessage === "auth/invalid-credential") {
      setErrorMessage("Email e/ou senha incorreto(s)");
    }
    if (errorMessage === "auth/too-many-requests") {
      setErrorMessage("Muitas tentativas de acesso. Por favor atualize a página");
    }
  }, [errorMessage]);

  return (
    <Form.Root
      onSubmit={() => {
        if (Verification() === false) return;

        signUp === true && createUser(userEmail, userPassword);
        signUp === false && signInUser(userEmail, userPassword);
      }}
    >
      <Form.Label text="Email" htmlFor="#email-login" />
      <Form.Input
        onFocus={() => setErrorMessage("")}
        value={userEmail}
        onChange={(evt) => setUserEmail(evt.target.value.toLowerCase())}
        placeholder="Digite seu email"
        id="email-login"
      />
      <Form.Label text="Senha" htmlFor="#password-login" />
      <Form.Input
        type={hidePassword === false ? "password" : "text"}
        onFocus={() => setErrorMessage("")}
        value={userPassword}
        onChange={(evt) => setUserPassword(evt.target.value)}
        placeholder="Digite sua senha"
        id="password-login"
      >
        <span onClick={() => setHidePassword(!hidePassword)}>
          <EyeIcon className="text-main-red-300 cursor-pointer" />
        </span>
      </Form.Input>
      <Form.Hint
        className="text-center"
        hintText="A senha precisa ter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial."
      />
      {errorMessage !== "" && (
        <p className="text-feedback-danger text-center font-bold">{errorMessage}</p>
      )}
      <span className="w-full flex justify-center mt-5">
        <Button.Root type="submit" twWidth="w-[234px]" disabled={isLoading}>
          <Button.Text content={signUp ? "CADASTRAR" : "ENTRAR"} />
        </Button.Root>
      </span>
    </Form.Root>
  );
}
