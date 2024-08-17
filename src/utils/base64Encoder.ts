export const encodeImageToBase64 = (image: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      resolve(reader.result as string); // O resultado é uma string com o prefixo "data:image/png;base64,"
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};