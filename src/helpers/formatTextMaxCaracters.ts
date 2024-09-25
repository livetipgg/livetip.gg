export const formatTextMaxCaracters = (text: string, maxCaracters: number) => {
  if (text.length > maxCaracters) {
    return text.slice(0, maxCaracters) + "...";
  }
  return text;
};
