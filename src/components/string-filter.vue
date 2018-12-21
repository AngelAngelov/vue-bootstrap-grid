<template>
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
            <button class="btn btn-primary">Apply</button>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Title",
      type: "",
      text: ""
    };
  }
};
</script>

<style>
</style>
