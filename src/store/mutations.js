import { GET_BRAND_INFO } from './mutation-type'

export default {
  [GET_BRAND_INFO](state, data) {
    state.brandObj = data
  },
}