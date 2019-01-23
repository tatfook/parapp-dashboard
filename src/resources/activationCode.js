import {
  resourceCRUD
} from '@/api/resources'
import activationCodeApi from '@/api/activationCode'
import BaseResource from './base'
import _ from 'lodash'

const crudAPI = _.merge({}, resourceCRUD('paracraftGameCoinKeys'), activationCodeApi)

export default class ActivationCode extends BaseResource {
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
      name: 'price',
      type: 'Number',
      edit: true
    }, {
      name: 'gameCoin',
      type: 'Number',
      edit: true
    }, {
      name: 'createdAt',
      type: 'Date',
      edit: false
    }, {
      name: 'description',
      type: 'String',
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
