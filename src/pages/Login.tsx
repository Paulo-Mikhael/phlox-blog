import styled from "styled-components";
import { Form } from "../components/Form";
import { Button } from "../components/Button";

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
  return (
    <StyledDiv>
      <main className="z-[1] w-[95%] h-[590px] rounded-[10px] bg-typo-100 flex items-center justify-between p-[22px]">
        <img src={signUp ? "images/signup-image.png" : "images/login-image.png"} alt="" className="w-[550px] h-[550px]" />
        <div className="rounded-[4px] border border-typo-300 h-full w-[569px] py-[50px] px-[28px] flex flex-col justify-between items-center gap-[20px]">
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
          <Form.Root>
            <Form.Label text="Email" htmlFor="#email-login" />
            <Form.Input placeholder="Digite seu email" id="email-login" />
            <Form.Label text="Senha" htmlFor="#password-login" />
            <Form.Input placeholder="Digite sua senha" id="password-login" />
            <Form.Hint className="text-center" hintText="A senha precisa ter pelo menos 8 caracteres, uma letra maiúscula, um número e um caractere especial." />
            <span className="w-full flex justify-center mt-10">
              <Button.Root twWidth="w-[234px]">
                <Button.Text content={signUp ? "CADASTRAR" : "ENTRAR"} />
              </Button.Root>
            </span>
          </Form.Root>
        </div>
      </main>
    </StyledDiv>
  );
}