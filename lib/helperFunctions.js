export function formatDate(dateString) {
  const date = new Date(dateString);
  const dateResult = date.toGMTString();
  if (dateResult === "Invalid Date") {
    return undefined;
  }
  return date.toGMTString();
}

export function formatSignUpDate(dateString) {
  const date = new Date(dateString);
  const dateResult = date.toLocaleDateString();
  if (dateResult === "Invalid Date") {
    return undefined;
  }
  return dateResult;
}
