import { colors } from "../../styles/variables";
import styled from "styled-components";

const StyledDiv = styled.div<{ $backgroundColor: string, $pressed: boolean, $addBadge?: boolean }>`
  height: ${props => props.$addBadge ? "28px" : ""};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 16px;
  background-color: ${props => props.$pressed ? colors.typo[200] : props.$backgroundColor};
  border-radius: 9999px;
  box-shadow: ${props => `${props.$pressed ? "inset" : ""} 0 4px 6px -1px ${colors.typo[400]}, ${props.$pressed ? "inset" : ""} 0 2px 4px -2px ${colors.typo[400]}`};
  cursor: pointer;
  position: relative;
  transition: background-color .2s linear;
  
  p{
    color: ${props => props.$pressed ? colors.typo[600] : colors.typo[100]};
  }
  .floatCircle{
    background-color: ${colors.redMain[300]};
    width: 20px;
    height: 20px;
    position: absolute;
    top: -4px;
    right: -4px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .line{
      transition: all .2s linear;
      position: absolute;
      width: 12px;
      height: 2px;
      background-color: ${colors.typo[200]};

      &.plus{
        transform: ${props => props.$pressed || props.$addBadge ? "rotate(90deg)" : "rotate(0deg)" };
      }
    }
  }
`

interface StyledBadgeProps {
  text: string,
  backgroundColor?: string,
  removeButton?: boolean,
  pressed?: boolean,
  onPress?: () => void,
  addBadge?: boolean
}

export function StyledBadge({ text, backgroundColor, pressed, onPress, removeButton, addBadge }: StyledBadgeProps) {
  return (
    <StyledDiv
      $addBadge={addBadge}
      $pressed={pressed ? pressed : false}
      $backgroundColor={backgroundColor ? backgroundColor : colors.typo[700]}
      onClick={() => {
        onPress && onPress()
      }}
    >
      <p>
        {text}
      </p>
      {removeButton && (
        <span className="floatCircle">
          <div className="line" />
          <div className="line plus" />
        </span>
      )}
    </StyledDiv>
  );
}