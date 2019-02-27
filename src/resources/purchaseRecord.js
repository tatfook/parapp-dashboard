import {
  resourceCRUD
} from '@/api/resources'
import purchaseRecordApi from '@/api/purchaseRecord'
import BaseResource from './base'
import _ from 'lodash'

const crudAPI = _.merge({}, resourceCRUD('paracraftGameCoinKeys'), purchaseRecordApi)

const identityMap = [{
  key: 0,
  value: '代理商'
}, {
  key: 1,
  value: '商户'
}]
export default class PurchaseRecord extends BaseResource {
  static attributes() {
    return [{
      name: 'id',
      type: 'Number',
      edit: false
    }, {
      name: 'key',
      type: 'Number',
      required: true,
      edit: true
    }, {
      name: 'price',
      type: 'Number',
      edit: false
    }, {
      name: 'gameCoin',
      type: 'Number',
      edit: false
    }, {
      name: 'purchaseName',
      type: 'String',
      required: true,
      edit: true
    }, {
      name: 'identity',
      type: 'Number',
      required: true,
      component: 'select',
      options: identityMap,
      filter(value) {
        return value === 0 ? '代理商' : '商户'
      }
    }, {
      name: 'purchaseCellphone',
      type: 'Number',
      required: true,
      edit: true
    }, {
      name: 'purchaseTime',
      type: 'Date',
      search: false,
      required: true,
      component: 'time',
      edit: true
    }]
  }
  static api() {
    return crudAPI
  }

  static actions() {
    return {
      disabled: ['destroy', 'delete', 'create', 'edit']
    }
  }

  static queryFilter(query) {
    // will include all by default, to make sure every associate works
    query.include({ all: true, nested: false })
    query.where({ 'purchase-eq': 1 })
    query.order('purchaseTime-DESC')
    return query
  }
}
