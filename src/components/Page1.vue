<template>
  <div>
    <div class="col-md-12">
      <grid
        :useRemote="false"
        :baseUrl="url"
        :columns="gridCols"
        :paging="true"
        :pageSize="4"
        @rowClick="onRowClick"
        :items="gridData"
        :rowNumbers="true" 
      >
      </grid>
    </div>
  </div>
</template>

<script>
import grid from "./grid";
import BtnsTemplate from "./BtnsTemplate.vue";
import Vue from "vue";

export default {
  name: "HelloWorld",
  components: {
    grid,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      gridData: [
        {
          id: 1,
          date: "1998-09-04T00:00:00.000Z",
          company: "Google",
          founders: "Larry Page, Sergey Brin",
          website: "<a href='www.google.com'>www.google.com</a>",
        },
        {
          id: 2,
          date: "1976-04-01T00:00:00.000Z",
          company: "Apple",
          founders: "Steve Jobs, Steve Wozniak, Ronald Wayne",
          website: "<a href='www.aple.com'>www.aple.com</a>",
        },
        {
          id: 3,
          date: "1975-04-04T00:00:00.000Z",
          company: "Microsoft",
          founders: "Bill Gates, Paul Allen",
          website: "<a href='www.microsoft.com'>www.microsoft.com</a>",
        },
        {
          id: 4,
          date: "1994-07-05T00:00:00.000Z",
          company: "Amazon",
          founders: "Jeff Bezos",
          website: "<a href='www.amazon.com'>www.amazon.com</a>",
        },
        {
          id: 5,
          date: "2003-07-01T00:00:00.000Z",
          company: "Tesla",
          founders:
            "Martin Eberhard, Marc Tarpenning, Elon Musk, J. B. Straubel, Ian Wright",
          website: "<a href='www.tesla.com'>www.tesla.com</a>",
        },
        {
          id: 6,
          date: "1975-01-01T00:00:00.000Z",
          company: "Zara",
          founders: "Amancio Ortega, Rosalía Mera",
          website: "<a href='www.zara.com'>www.zara.com</a>",
        },
        {
          id: 7,
          date: "1905-01-01T00:00:00.000Z",
          company: "Nestle",
          founders: "Henri Nestle",
          website: "<a href='www.nestle.com'>www.nestle.com</a>",
        },
        {
          id: 8,
          date: "1977-06-16T00:00:00.000Z",
          company: "Oracle Corporation",
          founders: "Larry Ellison, Bob Miner, Ed Oates",
          website: "<a href='www.oracle.com'>www.oracle.com</a>",
        },
        {
          id: 9,
          date: "1911-06-16T00:00:00.000Z",
          company: "IBM",
          founders: "Charles Ranlett Flint",
          website: "<a href='www.ibm.com'>www.ibm.com</a>",
        },
        {
          id: 10,
          date: "1886-01-01T00:00:00.000Z",
          company: "Coca-Cola Company",
          founders: "John Pemberton",
          website:
            "<a href='www.coca-colacompany.com'>www.coca-colacompany.com</a>",
        },
      ],
      url: "http://localhost:3000/posts",
    };
  },
  computed: {
    gridCols() {
      return [
        {
          prop: "id",
          title: "ID",
          type: "number",
          sortable: true,
          textAlign: "left",
          filterable: true,
        },
        {
          prop: "date",
          title: "Date",
          type: "date",
          sortable: true,
          textAlign: "center",
          filterable: true,
        },
        {
          prop: "company",
          title: "Company",
          type: "string",
          sortable: true,
          filterable: true,
        },
        {
          prop: "founders",
          title: "Founders",
          type: "string",
          sortable: true,
          textAlign: "left",
          filterable: true,
        },
        {
          prop: "website",
          title: "Website",
          type: "html",
          sortable: false,
          textAlign: "right",
          filterable: true,
        },
        {
          prop: "id",
          title: "Actions",
          type: "vue",
          template: this.btnsTemplate,
        },
      ];
    },
  },
  methods: {
    onRowClick(row) {
      console.log("row clicked", row);
    },
    onRowDblClick(row) {
      console.log("row dbl clicked", row);
    },
    onActionClick() {
      console.log("action clicked");
    },
    btnsTemplate(e) {
      return {
        template: Vue.component("BtnsTemplate", BtnsTemplate),
        templateArgs: {
          ...e,
          btns: [
            {
              name: "download",
              text: "",
              tooltip: "download",
              class: "btn btn-info",
              icon: "far fa-file-pdf",
              show: true,
              clickHandler: this.downloadPdf,
            },
          ],
        },
      };
    },
    downloadPdf(e) {
      console.log("download pdf", e);
    },
  },
};
</script>

<style scoped>
</style>
