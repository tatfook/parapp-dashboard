import {
  resourceCRUD
} from '@/api/resources'
import activationCodeApi from '@/api/activationCode'
import BaseResource from './base'
import uuid from 'uuid/v4'
import _ from 'lodash'

const crudAPI = _.merge({}, resourceCRUD('paracraftGameCoinKeys'), activationCodeApi)

const getKeyValue = (inputArr, key) => {
  return _.get(_.find(inputArr, item => item.key === key), 'value', 10)
}
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
      disabled: ['destroy', 'delete', 'create']
    }
  }

  static buttons() {
    return {
      append: [{
        name: '生成激活码',
        type: 'primary',
        refresh: false,
        checkSelected: false,
        async func(selected, that) {
          const params = {
            data: [{
              label: '数量',
              key: 'count',
              value: ''
            }, {
              label: '激活码售价',
              key: 'price',
              value: ''
            }, {
              label: '游戏币数量',
              key: 'gameCoin',
              value: ''
            }, {
              label: '备注',
              key: 'description',
              value: ''
            }],
            type: 'input',
            title: '生成激活码',
            status: 'generateCode'
          }
          that.showDialog(params)
        }
      }],
      callback: {
        async generateCode(inputArr, that) {
          const count = getKeyValue(inputArr, 'count')
          const data = []
          for (let i = 0; i < count; i++) {
            data.push({
              price: getKeyValue(inputArr, 'price'),
              gameCoin: getKeyValue(inputArr, 'gameCoin'),
              description: getKeyValue(inputArr, 'description'),
              key: uuid().replace(/-/ig, '')
            })
          }
          await crudAPI.generateBulkCode('paracraftGameCoinKeys', { datas: data })
        }
      }
    }
  }
}
