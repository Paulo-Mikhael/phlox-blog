import { ReactNode } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { colors, sizes } from "../../styles/variables";
import { navItems as navItemsData } from "../../data/navItems";
import { INavItems } from "../../interfaces/INavItems";
import { Button } from "../Button";
import { useRecoilValue } from "recoil";
import { actualUserState } from "../../state/atom";
import { Book } from "lucide-react";

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

interface HeaderProps {
  items?: boolean,
  navItems?: INavItems[],
  children?: ReactNode
}

export function Header({ items = true, navItems = navItemsData, children }: HeaderProps) {
  const navigate = useNavigate();
  const user = useRecoilValue(actualUserState);

  if (!items) {
    return <div className="bg-typo-150 w-full h-[80px] shadow-xl flex justify-center items-center p-4">{children}</div>
  }

  return (
    <div className="bg-typo-150 w-full h-[80px] shadow-xl flex justify-between items-center p-4">
      <img loading="eager" src="icons/phlox-logo.png" alt="" className="w-[140px] h-[25px]" />
      <nav>
        <ul className="flex gap-[30px]">
          {navItems.map((item, index) => (
            <StyledLi key={index} $active={item.current}>
              <Link to={item.path}>
                {item.name}
              </Link>
            </StyledLi>
          ))}
        </ul>
      </nav>
      <div className="flex gap-[10px]">
        {user === null && (
          <>
            <Button.Root
              variant="outlined"
              onClick={() => navigate("/signup")}
            >
              <Button.Text content="Cadastrar" />
            </Button.Root>
            <Button.Root
              onClick={() => navigate("/login")}
            >
              <Button.Text content="Login" />
            </Button.Root>
          </>
        )}
        {user && (
          <Button.Root
            variant="outlined"
            onClick={() => {
              navigate("/add");
            }}
          >
            <Button.Text content="FAZER UM POST" />
            <Button.Icon icon={Book} />
          </Button.Root>
        )}
      </div>
    </div>
  );
}