import {
  resourceCRUD
} from '@/api/resources'
import consumptionRecordApi from '@/api/consumptionRecord'
import BaseResource from './base'
import _ from 'lodash'

const crudAPI = _.merge({}, resourceCRUD('paracraftGameCoinKeys'), consumptionRecordApi)

export default class ConsumptionRecord extends BaseResource {
  static attributes() {
    return [{
      name: 'id',
      type: 'Number',
      edit: false
    }, {
      name: 'key',
      type: 'Number',
      edit: false
    }, {
      name: 'gameCoin',
      type: 'Number',
      edit: false
    }, {
      name: 'deviceId',
      type: 'Number',
      edit: false
    }, {
      name: 'activeTime',
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
      disabled: ['destroy', 'create', 'delete', 'edit']
    }
  }

  static queryFilter(query) {
    // will include all by default, to make sure every associate works
    query.include({ all: true, nested: false })
    query.where({ 'active-eq': 1 })
    return query
  }
}
