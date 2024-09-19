import styled from "styled-components";
import { colors, sizes } from "./variables";
import { languages } from "../data/languages";

export const StyledMarkdown = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.typo[700]};

  p{
    margin-top: 4px;
    overflow: hidden;
  }
  span, p{
    img{
      max-height: 300px;
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
    margin: 20px 0px 10px 0px;
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
  ul, ol{
    margin-left: 20px;
  }
  ul{
    list-style: disc;
  }
  ol{
    list-style: decimal;
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
    ${languages.map(({ abbreviation, name }) => `
      &.lang-${abbreviation} {
        &::after {
          content: "${name}";
        }
      }
    `).join('')}
  }
  table {
    min-width: 500px;
    width: 100%;
    border: 2px solid ${colors.typo[500]};
    
    th {
      background-color: ${colors.typo[700]};
      padding: 10px 0px;
      color: ${colors.typo[150]};
    }
    td {
      border: 2px solid ${colors.redMain[300]};
      background-color: ${colors.typo[150]};
      color: ${colors.typo[700]};
      text-align: center;
      padding: 6px 10px;
      max-width: 100px;
      overflow-wrap: break-word;
    }
  }
`