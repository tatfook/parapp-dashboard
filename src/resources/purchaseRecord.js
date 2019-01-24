import {
  resourceCRUD
} from '@/api/resources'
import purchaseRecordApi from '@/api/purchaseRecord'
import BaseResource from './base'
import _ from 'lodash'

const crudAPI = _.merge({}, resourceCRUD('paracraftGameCoinKeys'), purchaseRecordApi)

export default class PurchaseRecord extends BaseResource {
  static attributes() {
    return [{
      name: 'id',
      type: 'Number',
      edit: false
    }, {
      name: 'key',
      type: 'Number',
      edit: true
    }, {
      name: 'purchase',
      type: 'Number',
      edit: true
    }, {
      name: 'gameCoin',
      type: 'Number',
      edit: true
    }, {
      name: 'purchaseName',
      type: 'String',
      edit: true
    }, {
      name: 'identity',
      type: 'String',
      edit: true
    }, {
      name: 'purchaseCellphone',
      type: 'Number',
      edit: true
    }, {
      name: 'purchaseTime',
      type: 'Date',
      search: false,
      edit: false
    }]
  }
  static api() {
    return crudAPI
  }

  static actions() {
    return {
      disabled: ['destroy', 'delete']
    }
  }

  static queryFilter(query) {
    // will include all by default, to make sure every associate works
    query.include({ all: true, nested: false })
    query.where({ 'purchase-eq': 1 })
    return query
  }
}
