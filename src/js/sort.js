export function sortBy(props) {
  return function (a, b) {
    return b[props] - a[props]
  }
}