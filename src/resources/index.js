import _ from 'lodash'
import Admin from './admin'
import User from './user'
import Role from './role'
import Device from './device'
import ActivationCode from './activationCode'
import PurchaseRecord from './purchaseRecord'
import ConsumptionRecord from './consumptionRecord'

export const resources = {
  Admin,
  User,
  Role,
  Device,
  ActivationCode,
  PurchaseRecord,
  ConsumptionRecord
}

export const newResource = (name, row) => {
  const Klass = resources[_.upperFirst(name)]
  if (!Klass) throw new Error('Invlid resource: ' + _.upperFirst(name))
  return new Klass(row)
}

export const getResourceClass = (name) => {
  return resources[_.upperFirst(name)]
}

export default {
  resources,
  newResource,
  getResourceClass
}
