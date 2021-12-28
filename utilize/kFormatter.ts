import numeral from 'numeral'

const kFormatter = (value: number) => {
  if (value) {
    if (value < 1000) {
      return numeral(value).format('0a')
    }
    return numeral(value).format('0.0a')
  }
  return value || 0
}

export { kFormatter }
