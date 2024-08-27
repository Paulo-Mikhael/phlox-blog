export function getFirebaseArrayLength(firebaseArray: any): number {
  let arrayLength = 0;

  for (const arrayIndex in firebaseArray) {
    if (arrayIndex) {
      arrayLength++;
    };
  };

  return arrayLength;
}