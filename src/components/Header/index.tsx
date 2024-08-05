import styled from "styled-components";
import { colors, sizes } from "../../styles/variables";
import { Button } from "../Button";

const StyledLi = styled.li<{ $active: boolean }>`
  a{
    color: ${props => props.$active ? colors.redMain[300] : colors.typo[700]};
    font-size: ${sizes.font.sectionSubtitle};
    font-style: italic;
    font-weight: ${props => props.$active ? "bold" : "normal"};

    &:hover{
      color: ${colors.redMain[200]};
    }
  }
`

export default function Header() {
  const navItems: { name: string, path: string, current: boolean }[] = [
    {
      name: "Home",
      path: "",
      current: true
    },
    {
      name: "Categorias",
      path: "",
      current: false
    },
    {
      name: "Shop",
      path: "",
      current: false
    },
    {
      name: "Contate-nos",
      path: "",
      current: false
    },
  ]

  return (
    <div className="bg-typo-150 w-full h-[80px] shadow-xl flex justify-between items-center p-4">
      <img src="icons/phlox-logo.png" alt="" className="w-[140px] h-[25px]" />
      <nav>
        <ul className="flex gap-[30px]">
          {navItems.map((item, index) => (
            <StyledLi key={index} $active={item.current}>
              <a href={item.path}>
                {item.name}
              </a>
            </StyledLi>
          ))}
        </ul>
      </nav>
      <div className="flex gap-[10px]">
        <Button.Root variant="outlined">
          <Button.Text content="Cadastrar" />
        </Button.Root>
        <Button.Root>
          <Button.Text content="Login" />
        </Button.Root>
      </div>
    </div>
  );
}