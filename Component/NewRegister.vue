<template>
  <div class="collapse-wrap">
    <el-form ref="registerFormRef" :model="registerForm">
      <el-collapse :accordion="true" v-model="collapseActiveName">
        <el-collapse-item
          v-for="(item, index) of res"
          :name="item.flag"
          :key="index"
        >
          <template slot="title">
            <span class="registerTitle">{{ item.title }}</span>
          </template>

          <el-row :gutter="24">
            <el-col :span="12" v-for="(i, k) of item.content" :key="k">
              <div>
                <el-form-item>
                  <div>{{ i.subTitle }}：</div>
                  <el-input
                    placeholder="内容を入力してください。"
                    v-model="registerForm[i.prop]"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <!-- test start -->
          <!--          <div v-if="dataLabel" v-for="i of item.content">-->
          <!--            <el-collapse :accordion="true">-->
          <!--              <el-collapse-item>-->
          <!--                <template slot="title">-->
          <!--                  <span class="registerSubTitle">{{ i.subTitle }}</span>-->
          <!--                </template>-->
          <!--                <el-row :gutter="24" class="subContent">-->
          <!--                  <el-col :span="12" v-for="j of i.content">-->
          <!--                    <div>-->
          <!--                      <el-form-item>-->
          <!--                        <div>{{ j.subTitle }}：</div>-->
          <!--                        <el-input-->
          <!--                          placeholder="内容を入力してください。"-->
          <!--                          v-model="registerForm[j.prop]"-->
          <!--                        ></el-input>-->
          <!--                      </el-form-item>-->
          <!--                    </div>-->
          <!--                  </el-col>-->
          <!--                </el-row>-->
          <!--              </el-collapse-item>-->
          <!--            </el-collapse>-->
          <!--          </div>-->
          <!-- test end -->

          <el-form-item class="collapse-btn-group">
            <el-button
              type="primary"
              plain
              icon="el-icon-arrow-down"
              @click="test"
              >さらに読み込み</el-button
            >
            <el-button
              type="primary"
              plain
              icon="el-icon-arrow-up"
              @click="handleClose"
              >閉じる</el-button
            >
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
      <el-form-item class="collapse-save-wrap">
        <el-button type="primary" @click="saveUserInfo">保存</el-button>
      </el-form-item>
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
  Collapse,
  CollapseItem,
  Row,
  Col,
} from "element-ui";

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Row);
Vue.use(Col);

const url = process.env.apiUrl;
export default {
  name: "NewRegister",
  data() {
    return {
      collapseActiveName: "",
      collapseSubActiveName: "",
      collapseLabelOne: "",
      collapseLabelTwo: "",
      registerForm: {},
      res: [
        {
          title: "基本情報",
          flag: "1",
          content: [
            {
              subTitle: "登録番号",
              type: "input",
              prop: "usernameNo",
            },
            {
              subTitle: "氏名",
              type: "input",
              prop: "username",
            },
            {
              subTitle: "フリガナ",
              type: "input",
              prop: "usernameKana",
            },
            {
              subTitle: "生年月日",
              type: "input",
              prop: "birthday",
            },
            {
              subTitle: "性別",
              type: "input",
              prop: "gender",
            },
          ],
        },
        {
          title: "登録情報",
          flag: "2",
          content: [
            {
              subTitle: "支部",
              type: "input",
              prop: "shibu",
            },
            {
              subTitle: "種別",
              type: "input",
              prop: "syubetu",
            },
            {
              subTitle: "会員番号",
              type: "input",
              prop: "kaiinno",
            },
            {
              subTitle: "整理番号",
              type: "input",
              prop: "seirino",
            },
            {
              subTitle: "コード",
              type: "input",
              prop: "code",
            },
            {
              subTitle: "登録年月日",
              type: "input",
              prop: "registerDate",
            },
            {
              subTitle: "入会年月日",
              type: "input",
              prop: "nyukaiDate",
            },
            {
              subTitle: "退会年月日",
              type: "input",
              prop: "taikaiDate",
            },
            {
              subTitle: "変更年月日",
              type: "input",
              prop: "henkouDate",
            },
          ],
        },
        {
          title: "事務所等情報",
          flag: "3",
          content: [
            {
              subTitle: "名称",
              type: "input",
              prop: "companyName",
            },
            {
              subTitle: "所在地",
              type: "input",
              prop: "address",
            },
            {
              subTitle: "電話",
              type: "input",
              prop: "tel",
            },
            {
              subTitle: "FAX",
              type: "input",
              prop: "fax",
            },
          ],
        },
      ],
    };
  },
  computed: {
    dataLabel() {
      let flag = false;
      this.res.forEach((item) => {
        if (item.content && Array.isArray(item.content)) {
          item.content.forEach((i) => {
            if (i.content && Array.isArray(i.content)) {
              flag = true;
              return;
            }
          });
        }
      });
      return flag;
    },
  },
  methods: {
    saveUserInfo() {
      console.log(this.registerForm);
    },
    handleClose() {
      console.log();
      this.collapseActiveName = "";
    },
    test() {
      console.log(this.dataLabel);
    },
  },
};
</script>

<style scoped>
.collapse-wrap {
  padding: 10px 24px;
  margin: 24px 0px;
}

.collapse-btn-group {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.collapse-save-wrap {
  margin-top: 24px;
  text-align: center;
}

.collapse-wrap .registerTitle {
  font-size: 16px;
  font-weight: 600;
}

.collapse-wrap .registerSubTitle {
  font-size: 14px;
  font-weight: 600;
  padding-left: 48px;
}

.collapse-wrap .subContent {
  padding-left: 48px;
}
</style>
