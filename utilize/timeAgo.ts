import dayjs from 'dayjs'

const timeAgo = (value: string) => {
  if (value) {
    return dayjs(value)?.fromNow()
  }
  return
}

export { timeAgo }
