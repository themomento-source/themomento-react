export function normalizeFancyText(input) {
  const boldOffsetUpper = 0x1D400 - 0x41; // A-Z
  const boldOffsetLower = 0x1D41A - 0x61; // a-z

  let result = '';

  for (let char of input) {
    const code = char.codePointAt(0);
    if (code >= 0x1D400 && code <= 0x1D419) {
      result += String.fromCodePoint(code - boldOffsetUpper);
    } else if (code >= 0x1D41A && code <= 0x1D433) {
      result += String.fromCodePoint(code - boldOffsetLower);
    } else {
      result += char;
    }
  }

  return result;
}
