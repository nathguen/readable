export function set (itemName, data) {
  window.localStorage.setItem(itemName, data)
}

export function get (itemName) {
  return window.localStorage.getItem(itemName)
}