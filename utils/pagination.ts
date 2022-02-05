
class PaginationManager<T> {
  private items: T[]
  private itemsPerPage: number
  private currentPage: number
  private currentIndex: number
  private remainder: number
  private numberOfItems: number
  private numberOfPages: number
  private setPage: (page: number) => void

  constructor({
    items, itemsPerPage, currentPage, setPage
  }:{
    items: T[],
    itemsPerPage: number,
    currentPage: number,
    setPage: (page: number) => void
  }) {
    this.items = items,
    this.itemsPerPage = itemsPerPage,
    this.currentPage = currentPage,
    this.setPage = setPage

    this.numberOfItems = this.items.length
    this.currentIndex = currentPage - 1
    this.remainder = this.numberOfItems % this.itemsPerPage
    
    this.numberOfPages = Math.floor(this.numberOfItems / this.itemsPerPage)
    if (this.remainder) this.numberOfPages++
  }

  getCurrentPageItems() {
    if (this.currentPage === this.numberOfPages && this.remainder) {
      return this.items.slice(
        this.currentIndex * this.itemsPerPage,
        this.currentIndex * this.itemsPerPage + this.remainder
      )
    }

    return this.items.slice(
      this.currentIndex * this.itemsPerPage,
      this.currentIndex * this.itemsPerPage + this.itemsPerPage
    )
  }

  getPages() {
    const pages = []
    for (let i = 1; i <= this.numberOfPages; i++) {
      pages.push(i)
    }
    return pages
  }

  getNumberOfPages() {
    return this.getPages().length
  }

  getCurrentPage() {
    return this.currentPage
  }

  setItems(items: T[]) {
    this.items = items
  }

  setItemsPerPage(itemsPerPage: number) {
    if (itemsPerPage > this.items.length) {
      throw Error(`Items per page (${itemsPerPage}) greater than number of items ${this.items.length}`)
    }
    this.itemsPerPage = itemsPerPage
  }

  setCurrentPage(page: number) {
    if (!(page >= 1 && page <= this.numberOfPages)) {
      throw Error(`Page should be between 1 and ${this.numberOfPages}`)
    }
    this.setPage(page)
  }
}


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

export { PaginationManager }
