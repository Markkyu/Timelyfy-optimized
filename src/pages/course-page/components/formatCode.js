export function formatCode2(collegeCode, subjCode) {
  const normalizedCode = subjCode.replace(/\s+/g, "").toUpperCase(); // remove spaces

  return `${collegeCode}_${normalizedCode}`;
}
