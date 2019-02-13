import {
  resourceCRUD
} from '@/api/resources'
import activationCodeApi from '@/api/activationCode'
import BaseResource from './base'
import uuid from 'uuid/v4'
import _ from 'lodash'
import store from '@/store'

const crudAPI = _.merge({}, resourceCRUD('paracraftGameCoinKeys'), activationCodeApi)

const getKeyValue = (inputObj, key) => {
  return inputObj[key]
}
const inputData = [{
  label: '购买者名称',
  key: 'purchaseName',
  value: '',
  required: true
}, {
  label: '购买者身份',
  key: 'identity',
  value: '',
  required: true,
  component: 'select',
  options: [{
    key: '0',
    value: '代理商'
  }, {
    key: '1',
    value: '商户'
  }]
}, {
  label: '购买者电话',
  key: 'purchaseCellphone',
  value: '',
  required: true,
  rules: [{
    min: 8,
    max: 11,
    message: '长度在 3 到 5 个字符',
    trigger: 'blur'
  }]
}]

const addCodeInputData = [{
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
}]
export default class ActivationCode extends BaseResource {
  static attributes() {
    return [{
      name: 'id',
      type: 'Number',
      edit: false
    }, {
      name: 'active',
      type: 'Number',
      edit: false,
      filter(value) {
        return value === 0 ? '未激活' : '已激活'
      }
    }, {
      name: 'purchase',
      type: 'Number',
      edit: true,
      show: false
    }, {
      name: 'purchaseName',
      type: 'String'
    }, {
      name: 'identity',
      type: 'Number',
      filter(value) {
        return value === 0 ? '代理商' : '商户'
      }
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
      disabled: ['destroy', 'delete', 'create', 'edit'],
      extra: [{
        name: 'isPurchase',
        button: 'primary',
        type(row) {
          return Number(row.purchase) === 1 ? 'info' : 'success'
        },
        title(row) {
          return Number(row.purchase) === 1 ? '已购买' : '购买'
        },
        async func(row, that) {
          if (Number(row.purchase) === 1) {
            that.$message({
              type: 'info',
              message: '此激活码已经被购买!'
            })
            return
          }
          that.selected.push(row)
          const params = {
            data: inputData,
            type: 'input',
            title: '批量购买',
            status: 'purchaseCode'
          }
          that.showDialog(params)
        }
      }]
    }
  }

  static buttons() {
    return {
      append: [{
        name: '新增激活码',
        type: 'primary',
        refresh: false,
        checkSelected: false,
        async func(selected, that) {
          const params = {
            data: addCodeInputData,
            type: 'input',
            title: '生成激活码',
            status: 'generateCode'
          }
          that.showDialog(params)
        }
      }, {
        name: '批量购买',
        type: 'primary',
        refresh: false,
        checkSelected: false,
        async func(selected, that) {
          console.log('selected', selected)
          if (selected.length === 0) {
            that.$message.warning('请选择购买项!')
            return
          }
          for (let j = 0; j < selected.length; j++) {
            if (Number(selected[j].purchase) === 1) {
              that.$message({
                type: 'warning',
                message: '含有已购买的项，请重新选择！'
              })
              return
            }
          }
          const params = {
            data: inputData,
            type: 'input',
            title: '批量购买',
            status: 'purchaseCode'
          }
          that.showDialog(params)
        }
      }],
      callback: {
        async generateCode(inputObj, that) {
          const count = getKeyValue(inputObj, 'count')
          const data = []
          for (let i = 0; i < count; i++) {
            data.push({
              price: getKeyValue(inputObj, 'price'),
              gameCoin: getKeyValue(inputObj, 'gameCoin'),
              description: getKeyValue(inputObj, 'description'),
              key: uuid().replace(/-/ig, '')
            })
          }
          await crudAPI.generateBulkCode('paracraftGameCoinKeys', {
            datas: data
          })
        },
        async purchaseCode(inputObj, that) {
          // if (that.selected.length === 0) {
          //   that.$message({
          //     type: 'info',
          //     message: '请选择购买项'
          //   })
          //   return
          // }
          // for (let j = 0; j < that.selected.length; j++) {
          //   if (Number(that.selected[j].purchase) === 1) {
          //     that.$message({
          //       type: 'warning',
          //       message: '含有已购买的项，请重新选择！'
          //     })
          //     return
          //   }
          // }
          const data = _.map(that.selected, i => {
            return {
              ...i,
              purchase: 1,
              purchaseName: getKeyValue(inputObj, 'purchaseName'),
              identity: getKeyValue(inputObj, 'identity'),
              purchaseCellphone: getKeyValue(inputObj, 'purchaseCellphone'),
              purchaseTime: new Date()
            }
          })
          await Promise.all(data.map(i => crudAPI.update(i)))
          store.dispatch('setSelectedResouces', {
            selectedResources: []
          })
          that.$message({
            type: 'success',
            message: '购买成功!'
          })
        }
      }
    }
  }
}
