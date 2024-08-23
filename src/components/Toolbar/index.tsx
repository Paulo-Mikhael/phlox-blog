import clsx from "clsx";
import { colors } from "../../styles/variables";
import { Type, Bold, Italic, List, ListOrdered, ImagePlus, ImageUp, Eraser, Link } from "lucide-react";
import { ElementType, useEffect } from "react";
import styled from "styled-components";

const StyledLine = styled.div`
  height: 24px;
  width: 2px;
  background-color: ${colors.typo[500]};
`

interface ToolbarProps {
  highlightedTxt: string,
  setHighlightedTxt: React.Dispatch<React.SetStateAction<string>>,
  setContent: React.Dispatch<React.SetStateAction<string>>,
  fileInput?: React.RefObject<HTMLInputElement>
}

export function Toolbar({ highlightedTxt, setHighlightedTxt, setContent, fileInput }: ToolbarProps) {
  const toolbarItems: { icon: ElementType, onClick?: () => void, onHover?: () => void }[] = [
    {
      icon: Type,
      onClick: () => {
        setContent(prv => "#" + `${prv}`);
      }
    },
    {
      icon: Bold,
      onClick: () => {
        const formatedText = `**${highlightedTxt}**`;

        if (highlightedTxt.length > 1) {
          setContent(prv => {
            if (prv.includes(formatedText)) {
              return prv.replace(formatedText, highlightedTxt);
            } else {
              return prv.replace(highlightedTxt, formatedText);
            }
          });
        }
        else {
          return setContent(prv => prv + " **Texto em negrito**");
        }
      }
    },
    {
      icon: Italic,
      onClick: () => {
        const formatedText = `*${highlightedTxt}*`;

        if (highlightedTxt.length > 1) {
          setContent(prv => {
            if (prv.includes(formatedText)) {
              return prv.replace(formatedText, highlightedTxt);
            } else {
              return prv.replace(highlightedTxt, formatedText);
            }
          });
        }
        else {
          return setContent(prv => prv + " *Texto em itálico*");
        }
      }
    },
    {
      icon: List,
      onClick: () => {
        const formatedText = `\n**Título da lista**\n* Item da lista\n* Item da lista\n\n`;

        setContent(prv => {
          if (prv.includes(formatedText)) {
            return prv.replace(formatedText, "");
          } else {
            return prv + formatedText;
          }
        });
      }
    },
    {
      icon: ListOrdered,
      onClick: () => {
        const formatedText = `\n**Título da lista**\n1. Item da lista\n2. Item da lista\n\n`;

        setContent(prv => {
          if (prv.includes(formatedText)) {
            return prv.replace(formatedText, "");
          } else {
            return prv + formatedText;
          }
        });
      }
    },
    {
      icon: ImagePlus,
      onClick: () => {
        const formatedText = `![${highlightedTxt}](url_da_imagem)`;

        if (highlightedTxt.length > 1) {
          setContent(prv => {
            if (prv.includes(formatedText)) {
              return prv.replace(formatedText, highlightedTxt);
            } else {
              return prv.replace(highlightedTxt, formatedText);
            }
          });
        }
        else {
          return setContent(prv => prv + " ![descrição da imagem](url_da_imagem)");
        }
      }
    },
    {
      icon: ImageUp,
      onClick: () => {
        fileInput && fileInput.current?.click();
      }
    },
    {
      icon: Link,
      onClick: () => {
        const formatedText = `[${highlightedTxt}](url_do_link)`;

        if (highlightedTxt.length > 1) {
          setContent(prv => {
            if (prv.includes(formatedText)) {
              return prv.replace(formatedText, highlightedTxt);
            } else {
              return prv.replace(highlightedTxt, formatedText);
            }
          });
        }
        else {
          return setContent(prv => prv + " [texto do link](url_do_link)");
        }
      }
    }
  ];

  useEffect(() => {
    const setSelectedText = () => {
      const selection = window.getSelection();
      if (!selection) return;

      const selectedText = selection.toString();
      if (selectedText === "") return;

      setHighlightedTxt(selectedText);
    }

    document.addEventListener("mouseup", () => {
      setSelectedText();
    });
    document.addEventListener("keyup", () => {
      setSelectedText();
    });

    return () => {
      document.removeEventListener("mouseup", setSelectedText);
      document.removeEventListener("keyup", setSelectedText);
    };
  }, []);

  return (
    <span className="h-[40px] bg-typo-200 rounded-[10px] flex justify-between items-center px-3 mt-[20px]">
      <div className="h-full flex items-center gap-2">
        {toolbarItems.map((item, index) => (
          <div key={index} className="flex gap-2">
            <item.icon
              className={clsx(
                "cursor-pointer transition-all",
                {
                  "text-typo-600 hover:text-main-red-500": !(item.icon === ImageUp && !fileInput),
                  "text-typo-300": item.icon === ImageUp && !fileInput
                }
              )}
              size={22}
              onClick={item.onClick}
              onMouseOver={item.onHover}
            />
            <StyledLine />
          </div>
        ))}
      </div>
      <Eraser onClick={() => setContent("")} className="cursor-pointer text-typo-600 hover:text-main-red-500 transition-all" size={22} />
    </span>
  );
}