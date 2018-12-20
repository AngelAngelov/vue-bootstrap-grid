<template>
  <div>
    <popper trigger="click" :options="{placement: 'left'}" ref="pop">
      <div class="popper">
        <div class="p-2">
          <form @submit="applyFilter">
            <div class="form-group">
              <label>Operator</label>
              <select class="form-control" v-model="operator" v-if="col.type == 'number' || col.type == 'date'" required>
                <option value="==">Equal</option>
                <option value=">">Greater than</option>
                <option value="<">Less than</option>
              </select>
              <select class="form-control" v-model="operator" v-if="col.type == 'string' || col.type == 'html'" required>
                <option value="==">Equal</option>
                <option value="~">Contains</option>
                <option value="/">Starts with</option>
              </select>
            </div>
            <div class="form-group">
              <label>Value</label>
              <input type="text" class="form-control" v-model="value" v-if="col.type == 'string' || col.type == 'html'" required>
              <input type="number" class="form-control" v-model="value" v-if="col.type == 'number'" required>
              <input type="date" class="form-control" v-model="value" v-if="col.type == 'date'" required>
            </div>
            <div class="text-center">
              <button class="btn btn-primary mr-1" type="submit">Apply</button>
              <button class="btn btn-secondary ml-1" type="button" @click="clearFilter" v-if="isApplied">Clear</button>
            </div>
          </form>
        </div>
      </div>
      <button class="btn btn-link popper-btn" slot="reference" type="button" v-bind:class="{'not-applied': !isApplied }">
        <font-awesome-icon icon="filter"/>
      </button>
    </popper>
  </div>
</template>

<script>
import Popper from 'vue-popperjs';

export default {
  components: {
    popper: Popper
  },
  props: {
    col: Object
  },
  data() {
    return {
      isApplied: false,
      operator: '',
      value: ''
    };
  },
  methods: {
    applyFilter(e) {
      e.preventDefault();
      this.isApplied = true;
      this.$emit('change', {
        operator: this.operator,
        value: this.value,
        col: this.col
      });

      this.$refs.pop.doClose();
    },
    clearFilter() {
      this.isApplied = false;
      this.value = null;
      this.operator = null;
      this.$emit('clear', this.col);
      this.$refs.pop.doClose();
    }
  }
};
</script>

<style scoped>
.popper-btn {
  padding: 0;
}

.not-applied {
  color: inherit;
}
</style>
