
function buildPaginationManager<T>({
  items,
  itemsPerPage,
  currentPage
}: {
  items: T[],
  itemsPerPage: number,
  currentPage: number
}) {
  const currentIndex = currentPage - 1

  const numberOfItems = items.length
  const remainder = numberOfItems % itemsPerPage
  
  let numberOfPages = Math.floor(numberOfItems / itemsPerPage)
  if (remainder) numberOfPages++

  console.log(numberOfPages, 'odiwej')

  function getCurrentPageItems() {
    if (currentPage === numberOfPages && remainder) {
      return items.slice(
        currentIndex * itemsPerPage,
        currentIndex * itemsPerPage + remainder
      )
    }

    return items.slice(
      currentIndex * itemsPerPage,
      currentIndex * itemsPerPage + itemsPerPage
    )
  }

  function getPages() {
    const pages = []
    for (let i = 1; i <= numberOfPages; i++) {
      pages.push(i)
    }
    return pages
  }

  return {
    getCurrentPageItems,
    getPages
  }
}

export default buildPaginationManager
