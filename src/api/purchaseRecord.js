import createService from '@/utils/request'

const request = createService()

export default {
  create(data) {
    data.purchase = 1
    const url = '/admins/paracraftGameCoinKeys'
    return request({
      method: 'post',
      url,
      data
    })
  }
}
