export function start_and_end(str) {
  if (str.length > 35) {
    return str.substr(0, 10) + "..." + str.substr(str.length - 10, str.length);
  }
  return str;
}
