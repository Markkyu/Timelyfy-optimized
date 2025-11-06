export function formatCode(college, major, code) {
  const getInitials = (str) =>
    str
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  const collegeInitials = getInitials(college);
  const majorInitials = major ? getInitials(major) : null;
  const normalizedCode = code.replace(/\s+/g, "").toUpperCase(); // remove spaces

  return majorInitials
    ? `${collegeInitials}-${majorInitials}_${normalizedCode}`
    : `${collegeInitials}_${normalizedCode}`;
}
