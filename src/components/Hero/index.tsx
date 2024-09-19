import styled from "styled-components";
import { sizes } from "../../styles/variables";
import { badges } from "../../data/badges";
import { Button } from "../Button";

const StyledDiv = styled.div<{ $backgroundColor: string }>`
  width: 170px;
  height: 108px;
  background-color: ${(props) => props.$backgroundColor};
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: white;
  font-size: ${sizes.font.sectionSubtitle};
  box-shadow: 4px 6px 3px #0000002b;
`;

export default function Hero() {
  return (
    <div className="bg-typo-150 w-[932px] h-[563px] rounded-t-[10px] shadow-inner shadow-typo-700/30 px-[94px] py-[36px] z-[1]">
      <div className="flex flex-col items-center">
        <h1 className="text-highlight text-typo-700 font-bold">Blog PHLOX</h1>
        <h2 className="text-title text-typo-700">Junte-se a nós neste mundo tecnológico!</h2>
        <div className="flex gap-2 w-[744px] flex-wrap justify-center my-[45px]">
          {badges.map((item, index) => (
            <StyledDiv $backgroundColor={item.backgroundColor} key={index}>
              {item.icon && <item.icon size={40} />}
              <p>{item.title}</p>
            </StyledDiv>
          ))}
        </div>
        <Button.Root
          twWidth="w-[205px]"
          onClick={() => {
            scrollTo(0, 770);
          }}
        >
          <Button.Text content="VER POSTS" />
        </Button.Root>
      </div>
    </div>
  );
}
