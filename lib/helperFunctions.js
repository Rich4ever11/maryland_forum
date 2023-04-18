export function formatDate(dateString) {
  var date = new Date(dateString);
  return date.toGMTString();
}

export function formatSignUpDate(dateString) {
  var date = new Date(dateString);
  return date.toLocaleDateString();
}
