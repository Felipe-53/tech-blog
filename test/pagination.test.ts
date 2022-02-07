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
  expect(manager.getNumberOfPages()).toBe(4)

  manager.setItemsPerPage(2)
  expect(manager.getNumberOfPages()).toBe(5)

  manager.setItems(generateList(13))
  expect(manager.getNumberOfPages()).toBe(7)

  manager.setItemsPerPage(4)
  expect(manager.getNumberOfPages()).toBe(4)
})

test('Should retrieve the correct subset of items on each page', () => {
  expect(manager.getCurrentPageItems()).toEqual([1, 2, 3])

  manager.setCurrentPage(4)
  expect(manager.getCurrentPageItems()).toEqual([10])

  manager.setCurrentPage(2)
  expect(manager.getCurrentPageItems()).toEqual([4, 5, 6])

  manager.setItems(generateList(8)) // also rollback currentPage to 1
  expect(manager.getCurrentPageItems()).toEqual([1, 2, 3])

  manager.setCurrentPage(3)
  expect(manager.getCurrentPageItems()).toEqual([7, 8])

  manager.setItemsPerPage(5)
  manager.setCurrentPage(2)
  expect(manager.getCurrentPageItems()).toEqual([6, 7, 8])
})

test('Should throw on trying to set currentPage out of range', () => {
  expect(() => manager.setCurrentPage(5)).toThrow(/between/)
})

test('Should be able to set more items per page than number of items', () => {
  manager.setItemsPerPage(20)
  expect(manager.getCurrentPageItems()).toEqual(generateList(10))

  manager.setItems(generateList(3))
  expect(manager.getCurrentPageItems()).toEqual(generateList(3))
})
