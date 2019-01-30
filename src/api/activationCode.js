import createService from '@/utils/request'

const request = createService()

export default {
  generateBulkCode(resourceName, data) {
    return request({
      method: 'post',
      url: `/admins/${resourceName}/bulk`,
      data
    })
  },
  purchaseBulkCode(resourceName, data) {
    return request({
      method: 'put',
      url: `/admins/${resourceName}/bulk`,
      data
    })
  }
}
