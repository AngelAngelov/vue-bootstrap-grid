<template>
  <div>
    <span class="pull-right">
        <a href="#" :id="selector" class="filter-icon" @click="showFilter" :class="{ active: filters.includes(col.prop) }">
            <font-awesome-icon icon="filter" v-if="col.filterable" />
        </a>
    </span>

    <script type="text/html" :id="'test' + _uid">
      <div>
          <div class="form-group">
              <label for="">Type</label>
              <div class="w-100">
                  <select name="" class="form-control" v-model="type">
                      <option value="1">Starts with</option>
                      <option value="1">Contains</option>
                  </select>
              </div>
          </div>
          <div class="form-group">
              <label for="">Text</label>
              <div class="w-100">
                  <input type="text" class="form-control" v-model="text">
              </div>
          </div>
          <div class="form-group">
              <button class="btn btn-primary" :id="'button' + _uid">Apply</button>
          </div>
      </div>
    </script>
  </div>  
</template>

<script>
// import $ from "jquery";
import stringFilter from "./string-filter.vue";
export default {
  components: {
    "string-filter": stringFilter
  },
  props: {
    col: Object,
    filters: Array
  },
  data: function() {
    return {
      text: "Filter",
      type: null,
      selector: "popover" + this._uid,
      pop: null
    };
  },
  methods: {
    showFilter() {
      let template = $("#test" + this._uid);
      template.find('button').prop('id', 'button'+this._uid);

      this.pop = $("#" + this.selector).popover({
        html: true,
        content: $("#test" + this._uid).html()
      });

      this.pop.popover("show");

      $('button#button'+this._uid).on('click', function(){
        alert('applied!');
      })
    },
    onClick() {
      //$("#test" + this._uid).append("<string-filter></string-filter>");
    }
  },
  mounted: function() {
    console.log($);
  }
};
</script>

<style>
</style>
