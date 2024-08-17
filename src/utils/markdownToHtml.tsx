import { useState } from "react";

export function MarkdownToHtml({ mdText }: { mdText: string }){
  const [textMd, setTextMd] = useState<string>(mdText);
  const [textUrl, setTextUrl] = useState<{ text: string, url: string, mdFormat: string }[]>([]);
  const [mdUrl, setMdUrl] = useState<string>("");

  const mdUrlFormat = textMd.includes("[") && textMd.includes("]") && textMd.includes("(") && textMd.includes(")");

  if (mdUrlFormat){
    const openPrts = textMd.search(/\(/);
    const closePrts = textMd.search(/\)/);
    const openCol = textMd.search(/\[/);
    const closeCol = textMd.search(/\]/);

    let whitinPrts: string = "";
    let whitinCol: string = "";

    for (let i = openPrts + 1; i < closePrts; i++){
      whitinPrts = whitinPrts + textMd[i];
    };
    for (let i = openCol + 1; i < closeCol; i++){
      whitinCol = whitinCol + textMd[i];
    };

    setMdUrl(`[${whitinCol}](${whitinPrts})`);
    setTextUrl(prv => [...prv, { text: whitinCol, url: whitinPrts, mdFormat: `[${whitinCol}](${whitinPrts})` }]);
    setTextMd(prv => prv.replace(mdUrl, String(textUrl.findIndex(item => item.mdFormat === mdUrl))));
  }

  return (
    <div>
      <p>
        {textMd}
      </p>
    </div>
  );
};