<template>
  <div class="search-wrap">
    <el-form ref="searchFormRef" :model="searchForm">
      <el-row :gutter="24">
        <el-col :span="8" v-for="(item, index) of searchData" :key="index">
          <div>
            <el-form-item>
              <div>{{ item.title }}：</div>
              <el-input
                size="small"
                v-if="item.type == 'input'"
                placeholder="入力してください"
                v-model="searchForm[item.prop]"
              ></el-input>
              <el-select
                size="small"
                style="width: 100%"
                v-else-if="item.type == 'select'"
                placeholder="選択してください"
                v-model="searchForm[item.prop]"
              >
                <el-option
                  v-for="(i, key) of item.option"
                  :key="key"
                  :label="i.title"
                  :value="i.value"
                ></el-option>
              </el-select>
              <el-date-picker
                style="width: 100%"
                v-model="searchForm[item.prop]"
                type="daterange"
                range-separator="~"
                start-placeholder="Start"
                end-placeholder="End"
                size="small"
                v-else-if="item.type == 'date'"
              >
              </el-date-picker>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" class="search-wrap">
        <el-form-item>
          <el-button
            type="primary"
            plain
            icon="el-icon-arrow-down"
            @click="test"
            >さらに読み込み</el-button
          >
          <el-button type="primary" plain icon="el-icon-arrow-up"
            >閉じる</el-button
          >
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import Vue from "vue";

import {
  Form,
  FormItem,
  Input,
  Button,
  Row,
  Col,
  Select,
  Option,
} from "element-ui";

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Row);
Vue.use(Col);
export default {
  name: "Search",
  data() {
    return {
      searchForm: {},
      searchData: [
        {
          title: "会員名漢字",
          type: "input",
          flag: "1",
          prop: "usernameKanji",
        },
        {
          title: "会員名かな",
          type: "input",
          flag: "2",
          prop: "usernameKana",
        },
        {
          title: "登録番号",
          type: "input",
          flag: "3",
          prop: "registerNo",
        },
        {
          title: "支部コード",
          type: "input",
          flag: "4",
          prop: "shibuCode",
        },
        {
          title: "電話番号",
          type: "input",
          flag: "5",
          prop: "telNo",
        },
        {
          title: "FAX",
          type: "input",
          flag: "6",
          prop: "fax",
        },
        {
          title: "メールアドレス",
          type: "input",
          flag: "7",
          prop: "mail",
        },
        {
          title: "日付",
          type: "date",
          flag: "8",
          prop: "date",
        },
        {
          title: "会員種別（１）",
          type: "select",
          flag: "9",
          prop: "category1",
          option: [
            {
              title: "全会員",
              value: "1",
            },
            {
              title: "開業（個人）",
              value: "2",
            },
            {
              title: "開業（法人）",
              value: "3",
            },
            {
              title: "非開業（勤務）",
              value: "4",
            },
            {
              title: "非開業（その他）",
              value: "5",
            },
            {
              title: "退会",
              value: "6",
            },
            {
              title: "死亡退会",
              value: "7",
            },
            {
              title: "登録抹消",
              value: "8",
            },
          ],
        },
      ],
    };
  },
  methods: {
    test() {
      console.log(this.searchForm);
    },
  },
};
</script>

<style scoped>
.search-wrap {
  padding: 10px 24px;
  margin: 24px 0px;
}
search-wrap {
  margin-top: 24px;
}
</style>
