<template>
  <div class="input-dialog">
    <div class="input-dialog-input-row" v-for="item in inputArr" :key="item.key">
      <div class="input-dialog-input-row-label"> {{item.label || item.key}}:</div>
      <el-input style="width: 200px;" :label="item.label" size="medium" v-model="item.value"></el-input>
    </div>
    <div slot="footer" style="text-align: right;">
      <el-button @click="cancel">{{$t('cancel')}}</el-button>
      <el-button type="primary" @click="confirm">{{$t('ok')}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CRUDInput',
  props: {
    list: Array
  },
  data() {
    return {
      inputArr: []
    }
  },
  mounted() {
    this.inputArr = this.list
  },
  methods: {
    confirm() {
      this.$emit('callback', this.inputArr)
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
  min-width: 80px;
}
</style>

