function generateList(size: number) {
  const list = []
  for (let i = 0; i < size; i++) list.push(i + 1)
  return list
}

export { generateList }
