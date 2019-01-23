import {
  resourceCRUD
} from '@/api/resources'
import deviceApi from '@/api/device'
import BaseResource from './base'
import _ from 'lodash'

const crudAPI = _.merge({}, resourceCRUD('paracraftDevices'), deviceApi)

export default class Device extends BaseResource {
  static attributes() {
    return [{
      name: 'id',
      type: 'Number',
      edit: false
    }, {
      name: 'deviceId',
      type: 'Number',
      edit: true
    }, {
      name: 'price',
      type: 'Number',
      edit: true
    }, {
      name: 'password',
      type: 'Number',
      search: false,
      edit: true
    }, {
      name: 'username',
      type: 'String',
      edit: true
    }, {
      name: 'cellphone',
      type: 'Number',
      edit: true
    }, {
      name: 'purchaseTime',
      type: 'Date',
      search: false,
      edit: false
    }, {
      name: 'gameCoin',
      type: 'Number',
      edit: true
    }, {
      name: 'description',
      type: 'String',
      search: false,
      edit: true
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
}
