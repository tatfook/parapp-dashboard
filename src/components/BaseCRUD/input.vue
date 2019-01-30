<template>
  <div class="input-dialog">
    <!-- <div class="input-dialog-input-row" v-for="item in inputArr" :key="item.key">
      <div class="input-dialog-input-row-label"> {{item.label || item.key}}:</div>
      <el-input style="width: 200px;" :label="item.label" size="medium" v-model.trim="item.value"></el-input>
    </div> -->
    <el-form ref="inputDataForm" :rules="attrRules" :model="inputModel" label-position="left" label-width="200px" style='width: 400px;margin-left:50px'>
      <el-form-item v-for="(attr) in inputArr" :key="attr.key" :label="attr.label" :prop="attr.key">
        <el-input v-if="attrComponent(attr, 'input')" v-model="inputModel[attr.key]"></el-input>
        <el-input v-else-if="attrComponent(attr, 'text')" v-model="inputModel[attr.key]" type="textarea"></el-input>
        <el-select v-else-if="attrComponent(attr, 'select')" v-model="inputModel[attr.key]">
          <el-option v-for="item in attr.options" :key="item.key" :label="item.value" :value="item.key"></el-option>
        </el-select>
        <el-date-picker v-else-if="attrComponent(attr, 'time')" v-model="inputModel[attr.key]" :colors="attr.colors" :max="attr.max"></el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" style="text-align: right;">
      <el-button @click="cancel">{{$t('cancel')}}</el-button>
      <el-button type="primary" @click="confirm">{{$t('ok')}}</el-button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'CRUDInput',
  props: {
    list: Array
  },
  data() {
    return {
      inputArr: [],
      inputModel: {}
    }
  },
  watch: {
    inputModel: {
      handler(value) {
        _.forEach(this.inputArr, attr => {
          attr.value = value[attr.key]
        })
      },
      deep: true
    }
  },
  mounted() {
    this.inputArr = this.list
  },
  computed: {
    attrRules() {
      const rules = {}
      _.forEach(this.inputArr, attr => {
        if (attr.required) {
          rules[attr.key] = [
            {
              required: true,
              message: attr.requiredMessage || `${attr.label}必须要填写`,
              trigger: attr.requiredTrigger || 'change'
            }
          ]
        }
        if (attr.rules) {
          rules[attr.key] = _.concat(rules[attr.key], attr.rules)
        }
      })
      return rules
    }
  },
  methods: {
    attrComponent(attr, type) {
      const comp = attr.component || 'input'
      return comp === type
    },
    async confirm() {
      const valid = await this.$refs['inputDataForm'].validate()
      valid && this.$emit('callback', this.inputModel)
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
.input-dialog {
  max-width: 800px;
}

.input-dialog-input-row {
  display: flex;
  margin-top: 20px;
  align-items: center;
}
.input-dialog-input-row-label {
  margin-right: 10px;
  min-width: 210px;
  text-align: right;
}
</style>

