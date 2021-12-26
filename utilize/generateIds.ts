import { customAlphabet } from 'nanoid'

const generateIds = () => {
  const alphabet = '0123456789'
  const nanoid = customAlphabet(alphabet, 13)
  const generate = nanoid()
  return generate
}

export { generateIds }
