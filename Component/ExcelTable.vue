<template>
  <div class="container">
    <vue-table
      class="tables"
      v-model="products"
      :headers="headers"
      :custom-options="customOptions"
      :style-wrap-vue-table="styleWrapVueTable"
      :disable-cells="disableCells"
      :disable-sort-thead="disableSortThead"
      :parent-scroll-element="parentScrollElement"
      :select-position="selectPosition"
    >
      <div slot="header">Specific Header</div>
      <div slot="loader">Loader</div>
    </vue-table>
  </div>
</template>

<script>
export default {
  name: "ExcelTable",
  data() {
    return {
      customOptions: {
        tbodyIndex: false,
        sortHeader: false,
        trad: {
          lang: "fr",
          en: {
            select: {
              placeholder: "Search by typing",
            },
          },
          fr: {
            select: {
              placeholder: "Taper pour chercher",
            },
          },
        },
        newData: {
          type: "input",
          value: "",
          active: false,
          style: {
            color: "#000",
          },
        },
        fuseOptions: {
          shouldSort: true,
          threshold: 0.2,
          location: 0,
          distance: 30,
          maxPatternLength: 64,
          minMatchCharLength: 1,
          findAllMatches: false,
          tokenize: false,
          keys: ["value"],
        },
      },

      disableCells: ["a"],
      loading: false,
      parentScrollElement: {
        attribute: "html",
        positionTop: 0,
      },
      selectPosition: {
        top: 0,
        left: 0,
      },
      disableSortThead: ["a"],
      styleWrapVueTable: {
        // border: "1px solid black",
      },
      headers: [
        {
          headerName: "日付",
          headerKey: "date",
          style: {
            width: "88.5px",
            minWidth: "88.5px",
            color: "#8898AA",
            backgroundColor: "#F6F9FC",
            fontSize: "12px",
            fontWeight: "600",
            borderWidth: "1px 0px",
          },
        },
        {
          headerName: "支部",
          headerKey: "local",
          style: {
            width: "88.5px",
            minWidth: "88.5px",
            color: "#8898AA",
            backgroundColor: "#F6F9FC",
            fontSize: "12px",
            fontWeight: "600",
            borderWidth: "1px 0px",
          },
        },
        {
          headerName: "コード",
          headerKey: "code",
          style: {
            width: "88.5px",
            minWidth: "88.5px",
            color: "#8898AA",
            backgroundColor: "#F6F9FC",
            fontSize: "12px",
            fontWeight: "600",
            borderWidth: "1px 0px",
          },
        },
        {
          headerName: "摘要",
          headerKey: "abstract",
          style: {
            width: "88.5px",
            minWidth: "88.5px",
            color: "#8898AA",
            backgroundColor: "#F6F9FC",
            fontSize: "12px",
            fontWeight: "600",
            borderWidth: "1px 0px",
          },
        },
        {
          headerName: "相手科目",
          headerKey: "aite",
          style: {
            width: "88.5px",
            minWidth: "88.5px",
            color: "#8898AA",
            backgroundColor: "#F6F9FC",
            fontSize: "12px",
            fontWeight: "600",
            borderWidth: "1px 0px",
          },
        },
        {
          headerName: "借方科目",
          headerKey: "karikata",
          style: {
            width: "88.5px",
            minWidth: "88.5px",
            color: "#8898AA",
            backgroundColor: "#F6F9FC",
            fontSize: "12px",
            fontWeight: "600",
            borderWidth: "1px 0px",
          },
        },
        {
          headerName: "借方金額",
          headerKey: "karikataokane",
          style: {
            width: "88.5px",
            minWidth: "88.5px",
            color: "#8898AA",
            backgroundColor: "#F6F9FC",
            fontSize: "12px",
            fontWeight: "600",
            borderWidth: "1px 0px",
          },
        },
        {
          headerName: "貸方科目",
          headerKey: "kashikata",
          style: {
            width: "88.5px",
            minWidth: "88.5px",
            color: "#8898AA",
            backgroundColor: "#F6F9FC",
            fontSize: "12px",
            fontWeight: "600",
            borderWidth: "1px 0px",
          },
        },
        {
          headerName: "貸方金額",
          headerKey: "kashikataokane",
          style: {
            width: "88.5px",
            minWidth: "88.5px",
            color: "#8898AA",
            backgroundColor: "#F6F9FC",
            fontSize: "12px",
            fontWeight: "600",
            borderWidth: "1px 0px",
          },
        },
        {
          headerName: "入金事由",
          headerKey: "nyuukin",
          style: {
            width: "88.5px",
            minWidth: "88.5px",
            color: "#8898AA",
            backgroundColor: "#F6F9FC",
            fontSize: "12px",
            fontWeight: "600",
            borderWidth: "1px 0px",
          },
        },
        {
          headerName: "備考",
          headerKey: "bikou",
          style: {
            width: "88.5px",
            minWidth: "88.5px",
            color: "#8898AA",
            backgroundColor: "#F6F9FC",
            fontSize: "12px",
            fontWeight: "600",
            borderWidth: "1px 0px",
          },
        },
        {
          headerName: "台帳転記",
          headerKey: "daicyou",
          style: {
            width: "88.5px",
            minWidth: "88.5px",
            color: "#8898AA",
            backgroundColor: "#F6F9FC",
            fontSize: "12px",
            fontWeight: "600",
            borderWidth: "1px 0px",
          },
        },
      ],
      products: [
        {
          date: {
            type: "input",
            value: "2021, 04, 01",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          local: {
            type: "input",
            value: "",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          code: {
            type: "input",
            value: "16",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          abstract: {
            type: "input",
            value: "手数料",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          aite: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          karikata: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          karikataokane: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          kashikata: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          kashikataokane: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          nyuukin: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          bikou: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          daicyou: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
        },
        {
          date: {
            type: "input",
            value: "2021, 04, 01",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          local: {
            type: "input",
            value: "",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          code: {
            type: "input",
            value: "16",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          abstract: {
            type: "input",
            value: "手数料",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          aite: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          karikata: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          karikataokane: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          kashikata: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          kashikataokane: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          nyuukin: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          bikou: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
          daicyou: {
            type: "input",
            value: "123",
            active: false,
            style: {
              color: "#000",
              borderWidth: "1px 0px",
              borderColor: "#ebeef5",
            },
          },
        },
      ],
    };
  },

  methods: {
    changeData(row, header) {
      console.log(row, header);
    },
    sortProduct(event, header, colIndex) {
      console.log("sort product");
    },
    // callback
    changeColorThead(event, header, colIndex) {
      this.headers[colIndex].style.color = "#e40000";
    },
    changeColorTbody(event, header, rowIndex, colIndex) {
      this.products[rowIndex][header].style = {};
      this.products[rowIndex][header].style.color = "#e40000";
    },
    changeValueTbody(event, header, rowIndex, colIndex) {
      this.products[rowIndex][header].value = "T-shirt";
    },
    changeValueThead(event, entry, colIndex) {
      this.headers[colIndex].headerName = "T-shirt";
    },
  },
};
</script>

<style scoped>
.container {
  padding: 24px;
  margin: 24px 0px;
}

::-moz-selection {
  color: #2c3e50;
  background: transparent;
}
::selection {
  color: #2c3e50;
  background: transparent;
}

/deep/ .vue-spreadsheet .td span {
  font-size: 12px;
}
</style>
