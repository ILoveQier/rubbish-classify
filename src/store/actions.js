import { GET_BRAND_INFO } from './mutation-type'
export default {
  getBrand({ commit }, data) {
    commit(GET_BRAND_INFO, data)
  },
}