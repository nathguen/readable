export const sortArray = (arr, filter, direction) => {
  if(arr.length) {
    switch(typeof arr[0][filter]) {
      case 'number':
        return sortByNumber(arr, filter, direction)
      case 'string':
        return sortByString(arr, filter, direction)
      default:
        console.warn(`Couldn't find proper type for sort: ${typeof arr[0][filter]}`)
        return []
    }
  }
  return arr
}

export const sortByNumber = (arr, filter, direction) => {
  return arr.sort((a, b) => {
    if(direction) {
      return a[filter] - b[filter]
    }
    return b[filter] - a[filter]
  })
}

export const sortByString = (arr, filter, direction) => {
  return arr.sort((a, b) => {
    const nameA = a[filter].toUpperCase()
    const nameB = b[filter].toUpperCase()
    if(direction) {
      if(nameA > nameB) return 1
      if(nameB > nameA) return -1
    } else {
      if(nameA > nameB) return -1
      if(nameB > nameA) return 1
    }
    return 0
  })
}

export default sortArray