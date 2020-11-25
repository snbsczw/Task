import {request} from "./request";
export function getBillCsv() {
  return request({
    url: '/bill.csv'
  })
}
export function getCategoriesCsv() {
  return request({
    url: '/categories.csv'
  })
}