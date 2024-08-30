export const normalizeText = (text: string): string => {
  const normalizedText = text.toLocaleLowerCase().trim();

  return normalizedText;
}