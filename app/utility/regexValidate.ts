export const validatePassword = (p: string) => {
  let counter = 0;
  let validationRegex = [
    { regex: /.{10,}/ }, // min 10 letters,
    { regex: /[0-9]/ }, // numbers from 0 - 9
    { regex: /[a-z]/ }, // letters from a - z (lowercase)
    { regex: /[A-Z]/ }, // letters from A-Z (uppercase),
    { regex: /[^A-Za-z0-9]/ }, // special characters
  ];

  validationRegex.forEach((item, i) => {
    let isValid = item.regex.test(p);
    if (isValid) {
      counter++;
    }
  });
  return counter;
};
