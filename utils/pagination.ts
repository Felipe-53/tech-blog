class PaginationManager<T> {
  private items: T[]
  private itemsPerPage: number
  private currentPage: number
  private numberOfPages!: number
  private setPage: (page: number) => void

  constructor({
    items,
    itemsPerPage,
    currentPage,
    setPage,
  }: {
    items: T[]
    itemsPerPage: number
    currentPage: number
    setPage: (page: number) => void
  }) {
    this.items = items
    this.itemsPerPage = itemsPerPage
    this.currentPage = currentPage
    this.setPage = setPage

    this.updateNumberOfPages()
  }

  getCurrentPageItems() {
    const currentIndex = this.currentPage - 1
    const remainder = this.items.length % this.itemsPerPage

    if (this.currentPage === this.numberOfPages && remainder) {
      return this.items.slice(
        currentIndex * this.itemsPerPage,
        currentIndex * this.itemsPerPage + remainder
      )
    }

    return this.items.slice(
      currentIndex * this.itemsPerPage,
      currentIndex * this.itemsPerPage + this.itemsPerPage
    )
  }

  getDisplayablePageOptions() {
    const MAX_DISPLAYED_PAGES = 4

    const pages: number[] = []

    if (this.numberOfPages < MAX_DISPLAYED_PAGES) {
      for (let i = 1; i <= this.numberOfPages; i++) {
        pages.push(i)
      }
      return pages
    }

    let numberOfPagesAhead = 2
    let numberOfPagesBehind = 1

    while (this.currentPage + numberOfPagesAhead > this.numberOfPages) {
      numberOfPagesAhead--
      numberOfPagesBehind++
    }

    if (this.currentPage - 1 === 0) {
      numberOfPagesAhead++
      numberOfPagesBehind--
    }

    for (let i = numberOfPagesBehind; i >= 1; i--) {
      pages.push(this.currentPage - i)
    }

    pages.push(this.currentPage)

    for (let i = 1; i <= numberOfPagesAhead; i++) {
      pages.push(this.currentPage + i)
    }

    return pages
  }

  getNumberOfPages() {
    return this.numberOfPages
  }

  getCurrentPage() {
    return this.currentPage
  }

  setItems(items: T[]) {
    this.items = items
    this.setCurrentPage(1)
    this.updateNumberOfPages()
  }

  setItemsPerPage(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage
    this.setCurrentPage(1)
    this.updateNumberOfPages()
  }

  setCurrentPage(page: number) {
    if (!(page >= 1 && page <= this.numberOfPages)) {
      throw Error(`Page should be between 1 and ${this.numberOfPages}`)
    }

    const previousCurrentPage = this.currentPage
    try {
      this.setPage(page)
      this.currentPage = page
    } catch (err) {
      // rollback to previous state if possible
      this.currentPage = previousCurrentPage
      this.setPage(previousCurrentPage)
      throw err
    }
  }

  private updateNumberOfPages() {
    const numberOfItems = this.items.length
    const remainder = numberOfItems % this.itemsPerPage

    this.numberOfPages = Math.floor(numberOfItems / this.itemsPerPage)
    if (remainder) this.numberOfPages++
  }
}

export { PaginationManager }
