<template>
  <div class="hello">
    <grid :items="gridData" :columns="gridCols"></grid>
  </div>
</template>

<script>
import grid from "./grid";
export default {
  name: "HelloWorld",
  components: {
    grid
  },
  props: {
    msg: String
  },
  data() {
    return {
      gridData: [
        {
          date: "1998-09-04T00:00:00.000Z",
          company: "Google",
          founders: "Larry Page, Sergey Brin",
          website: "<a href='www.google.com'>www.google.com</a>"
        },
        {
          date: "1976-04-01T00:00:00.000Z",
          company: "Apple",
          founders: "Steve Jobs, Steve Wozniak, Ronald Wayne",
          website: "<a href='www.aple.com'>www.aple.com</a>"
        },
        {
          date: "1975-04-04T00:00:00.000Z",
          company: "Microsoft",
          founders: "Bill Gates, Paul Allen",
          website: "<a href='www.microsoft.com'>www.microsoft.com</a>"
        },
        {
          date: "1994-07-05T00:00:00.000Z",
          company: "Amazon",
          founders: "Jeff Bezos",
          website: "<a href='www.amazon.com'>www.amazon.com</a>"
        }
      ],
      gridCols: [
        {
          prop: "date",
          title: "Date",
          type: "date",
          sortable: true,
          textAlign: "center"
        },
        {
          prop: "company",
          title: "Company",
          type: "string",
          sortable: true
        },
        {
          prop: "founders",
          title: "Founders",
          type: "string",
          sortable: true,
          textAlign: "left"
        },
        {
          prop: "website",
          title: "Website",
          type: "html",
          sortable: false,
          textAlign: "right"
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>
