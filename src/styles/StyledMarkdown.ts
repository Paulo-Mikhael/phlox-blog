import styled from "styled-components";
import { colors, sizes } from "./variables";
import { ILanguages } from "../interfaces/ILanguage";

export const StyledMarkdown = styled.div<{ $languages: ILanguages[] }>`
  display: flex;
  flex-direction: column;
  color: ${colors.typo[700]};

  p{
    margin-top: 4px;
    overflow: hidden;

    img{
      background-image: url("images/post-coffee.png");
      max-height: 500px;
      margin: 20px auto;
    }
  }
  a, strong, em{
    color: ${colors.redMain[300]};
  }
  blockquote, code{
    color: ${colors.typo[100]};
  }
  li{
    color: ${colors.redMain[300]};
  }
  h1, h2, h3, h4, h6{
    color: ${colors.redMain[300]};
  }
  h1{
    font-size: ${sizes.font.highlight};
    font-weight: bold;
  }
  h2{
    font-size: ${sizes.font.title};
  }
  h3{
    margin-top: 8px;
    font-size: ${sizes.font.section};
  }
  h4{
    font-size: ${sizes.font.sectionSubtitle};
  }
  h5{
    font-size: ${sizes.font.normal};
  }
  h6{
    font-size: ${sizes.font.imageSubtitle};
  }
  a{
    text-decoration: underline;
  }
  ul{
    margin-left: 20px;
    list-style: disc;
  }
  blockquote, pre{
    margin-top: 8px;
    border-radius: 10px;
  }
  blockquote{
    display: flex;
    padding: 20px;
    background-color: ${colors.feedback.info};
    font-weight: bold;
  }
  pre{
    background-color: ${colors.typo[700]};
    margin: 10px 0px;
    padding: 20px;
    padding-top: 36px;
    color: ${colors.typo[100]};
    position: relative;
    overflow-x: scroll;

    &::-webkit-scrollbar{
      display: none;
    }
  }
  code{
    &::after{
      position: absolute;
      top: 10px;
      left: 14px;
      font-size: ${sizes.font.imageSubtitle};
      color: ${colors.typo[300]};
    }
    ${props => props.$languages.map(({ abbreviation, name }) => `
      &.language-${abbreviation} {
        &::after {
          content: "${name}";
        }
      }
    `).join('')}
  }
`