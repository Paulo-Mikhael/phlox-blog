import styled from "styled-components";
import { firebaseAuth, firebaseRealtimeDatabase } from "../utils/firebase";
import { Form } from "../components/Form";
import { Button } from "../components/Button";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { actualUser } from "../state/atom";
import { ref, set } from "firebase/database";
import { v4 as uuidV4 } from "uuid";

const StyledDiv = styled.div`
  background-image: url("images/background-login.png");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function Login({ signUp = false }: { signUp?: boolean }) {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const auth = firebaseAuth;
  const db = firebaseRealtimeDatabase;
  const setUser = useSetRecoilState(actualUser);
  const navigate = useNavigate();

  function createUser(email: string, password: string) {
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        set(ref(db, `users/ ${uuidV4()}`), {
          userEmail: email
        })
          .then(() => {
            signInUser(email, password);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(`Error: ${errorCode} - ${errorMessage}`);
        setIsLoading(false);
      })
  };
  function signInUser(email: string, password: string) {
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        setIsLoading(false);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(`Error: ${errorCode} - ${errorMessage}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <StyledDiv>
      <main className="z-[1] w-[95%] h-[590px] rounded-[10px] bg-typo-100 flex items-center justify-between p-[22px]">
        <img src={signUp ? "images/signup-image.png" : "images/login-image.png"} alt="" className="w-[550px] h-[550px]" />
        <div className="rounded-[4px] border border-typo-300 h-full w-[569px] py-[50px] px-[28px] flex flex-col justify-evenly items-center gap-[20px]">
          <span className="flex flex-col items-center gap-6">
            <img src="icons/phlox-logo.png" alt="" className="w-[200px]" />
            <p className="text-center text-typo-700 text-section-subtitle font-medium">
              {signUp
                ? <>
                  <strong>Bem vindo!</strong> <br />
                  Cadastre-se e acompanhe as últimas notícias da PHLOX
                </>
                : <>
                  <strong>Bem vindo de volta!</strong> <br />
                  Confira suas notificações para ter certeza de estar atualizado!
                </>}
            </p>
          </span>
          <Form.Root
            onSubmit={() => {
              signUp === true && createUser(userEmail, userPassword);
              signUp === false && signInUser(userEmail, userPassword);
            }}
          >
            <Form.Label text="Email" htmlFor="#email-login" />
            <Form.Input value={userEmail} onChange={(evt) => setUserEmail(evt.target.value)} placeholder="Digite seu email" id="email-login" />
            <Form.Label text="Senha" htmlFor="#password-login" />
            <Form.Input value={userPassword} onChange={(evt) => setUserPassword(evt.target.value)} placeholder="Digite sua senha" id="password-login" />
            <Form.Hint className="text-center" hintText="A senha precisa ter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial." />
            <span className="w-full flex justify-center mt-10">
              <Button.Root type="submit" twWidth="w-[234px]" isLoading={isLoading}>
                <Button.Text content={signUp ? "CADASTRAR" : "ENTRAR"} />
              </Button.Root>
            </span>
          </Form.Root>
        </div>
      </main>
    </StyledDiv>
  );
}