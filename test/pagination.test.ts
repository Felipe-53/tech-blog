import { PaginationManager } from '../utils/pagination'
import { generateList } from './testUtils'

let manager: PaginationManager<number>;

let currentPage: number
const setCurrentPage = (page: number) => currentPage = page

beforeEach(() => {
  currentPage = 1

  const items = generateList(10)
  const itemsPerPage = 3

  manager = new PaginationManager({
    currentPage,
    items,
    itemsPerPage,
    setPage: setCurrentPage,
  })
})

test('Should return the correct number of pages', () => {
  manager.setItems(generateList(10))
  manager.setItemsPerPage(3)
  expect(manager.getNumberOfPages()).toBe(4)

  manager.setItemsPerPage(2)
  expect(manager.getNumberOfPages()).toBe(5)

  manager.setItems(generateList(13))
  expect(manager.getNumberOfPages()).toBe(7)
})


