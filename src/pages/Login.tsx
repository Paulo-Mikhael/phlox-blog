import styled from "styled-components";
import { LoginTitle } from "../components/LoginTitle";
import { LoginForm } from "../components/LoginForm";

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
        <div className="rounded-[4px] border border-typo-300 h-full w-[569px] py-[50px] px-[28px] flex flex-col justify-evenly items-center gap-[20px]">
          <LoginTitle signUp={signUp} />
          <LoginForm signUp={signUp} />
        </div>
      </main>
    </StyledDiv>
  );
}