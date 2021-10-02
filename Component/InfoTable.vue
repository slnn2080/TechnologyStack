<template>
  <div>
    <el-upload
      class="upload-demo"
      :limit="1"
      :show-file-list="false"
      :on-change="handleChange"
      :http-request="uploadFile"
      :accept="uploadAccept"
      :auto-upload="false"
    >
      <el-button size="small" type="primary">excelインポート</el-button>
      <el-button size="small" type="danger" @click="exportExcel"
        >excelエクスポート</el-button
      >
      <div slot="tip" class="el-upload__tip"></div>
    </el-upload>

    <el-table
      :data="tableData"
      row-key="username"
      header-row-class-name="thead-light"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="hasCheck" type="selection" min-width="50">
      </el-table-column>
      <el-table-column
        v-for="(item, index) of tableColumn"
        :key="index"
        v-bind="item"
      >
        <template v-if="item.type == 'link'" scope="scope">
          <nuxt-link :to="linkTo">{{ info(scope.row, item.prop) }}</nuxt-link>
        </template>
        <template v-else scope="scope">
          {{ info(scope.row, item.prop) }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from "vue";
import { Table, TableColumn, Upload, Button } from "element-ui";
import xlsx from "xlsx";

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Upload);
Vue.use(Button);

export default {
  name: "InfoTable",
  data() {
    return {
      sheetField: {
        username: {
          text: "会員名",
          type: "string",
        },
        entrust: {
          text: "依頼情況",
          type: "string",
        },
        date: {
          text: "変更日",
          type: "string",
        },
        point: {
          text: "変更点",
          type: "string",
        },
      },
      hasCheck: true,
      linkTo: "",
      uploadAccept: ".xls,.xlsx",
      tableData: [],
      tableColumn: [
        {
          prop: "username",
          label: "会員名",
          minWidth: 100,
          sortable: true,
          type: "link",
        },
        {
          prop: "entrust",
          label: "依頼情況",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "date",
          label: "変更日",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "point",
          label: "変更点",
          minWidth: 100,
          sortable: true,
          type: "link",
        },
      ],
      tableSelectData: [],
    };
  },
  computed: {
    info() {
      return (row, prop) => {
        return row[prop];
      };
    },
  },
  methods: {
    readFile(file) {
      return new Promise((resolve) => {
        let reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (e) => {
          resolve(e.target.result);
        };
      });
    },
    async handleChange(e) {
      let file = e.raw;
      if (!file) return;

      let data = await this.readFile(file);
      let workBook = xlsx.read(data, { type: "binary" });

      let workSheet = workBook.Sheets[workBook.SheetNames[0]];
      data = xlsx.utils.sheet_to_json(workSheet);
      console.log(data);

      let arr = [];
      data.forEach((item) => {
        let o = {};
        for (let key in this.sheetField) {
          if (!this.sheetField.hasOwnProperty(key)) break;
          let v = this.sheetField[key],
            text = v.text,
            type = v.type;

          v = item[text] || "";
          type == "string" ? (v = String(v)) : null;
          o[key] = v;
        }
        arr.push(o);
      });
      this.tableData = arr;
    },

    handleSelectionChange(val) {
      this.tableSelectData = val;
    },
    exportExcel() {
      if (this.tableSelectData <= 0) return alert("データを選択してください");
      let arr = this.tableSelectData.map((item) => {
        return {
          会員名: item.username,
          依頼情況: item.entrust,
          変更日: item.date,
          変更点: item.point,
        };
      });
      let sheet = xlsx.utils.json_to_sheet(arr);
      let book = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(book, sheet, "sheet1");
      xlsx.writeFile(book, `user${+new Date()}.xls`);
    },
  },
};
</script>

<style scoped>
.info-table {
  margin: 24px;
}
.btnGroup {
  display: flex;
  margin-right: 8px;
}
</style>
