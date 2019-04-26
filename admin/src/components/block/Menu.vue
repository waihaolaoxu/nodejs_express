<template>
  <div class="aside-wrap">
    <div class="logo">
      <router-link to="/">管理后台</router-link>
    </div>
    <div class="menu-wrap">
      <el-menu :default-active="activePath" background-color="#324157" :default-openeds="openList" text-color="#B4BCCC" active-text-color="#fff" style="border-right:0" router>
        <el-submenu :index="'group-'+key" v-for="(value, key) in data" :key="key">
          <template slot="title">
            <i :class="value.icon"></i>
            <span slot="title" v-text="value.group"></span>
          </template>
          <el-menu-item :index="value.href" v-for="(value, key) in value.list" :key="key" :route="{path:value.href}" @click="selectMenu(value.serviceType)">
            {{value.name}}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import tip from "@/api/tip";
export default {
  data() {
    return {
      openList:[],
      data: [
        {
          icon: "iconfont icon-yijin10-zixunanli",
          group: "案例管理",
          list: [
            {
              id: "admin_clinic_case",
              serviceType:"1211",
              href: "/yx/case/list",
              name: "案例管理"
            },
            {
              id: "admin_manage_media",
              href: "/yx/material/list",
              name: "素材库管理"
            },
            {
              id: "admin_audit_media",
              href: "/yx/material/checklist",
              name: "待审核素材"
            },
            {
              id: "admin_select_media",
              href: "/yx/material/search",
              name: "素材检索"
            }
          ]
        },
        {
          group: "预约核销",
          icon: "iconfont icon-yuyue",
          list:[{
            id:"promote_activity",
            industryType:2,
            href: "/yx/mouth_activity/writeoff",
            name: "预约管理",
          },{
            id:"promote_activity",
            industryType:2,
            href: "/yx/verification/outside",
            name: "活动核销",
          }]
        },
        {
          icon: "iconfont icon-huodong",
          group: "营销中心",
          list: [
            {
              id: "admin_user_big_wheel",
              href: "/yx/rotate/list",
              name: "大转盘"
            },
            {
              id: "admin_user_setting_activity",
              href: "/yx/setactivity/list",
              name: "拼团活动"
            },
            {
              id: "admin_clinic_post",
              serviceType:"1215",
              href: "/yx/poster/list",
              name: "海报管理"
            },
            {
              id: "admin_clinic_gift",
              serviceType:"1216",
              href: "/yx/gift/list",
              name: "礼品管理"
            },
            {
              id: "admin_setting_coupon",
              serviceType:"1218",
              href: "/yx/coupon/list",
              name: "优惠券管理"
            },
            {
              id: "store_verification",
              href: "/yx/verification/index",
              name: "到店核销"
            },
            {
              id: "invitation_get_gift",//id是正确的
              href: "/yx/invitationGift/list",
              name: "邀请有礼"
            }
          ]
        },
      ],
    };
  },
  created() {
  },
  computed: {
    ...mapGetters(["userinfo"]),
    activePath() {
      var path = this.$route.path;
      var light = this.$route.meta.light;
      var param = this.$route.meta.param;
      if (light) {
        path = light;
        if (param) {
          path = path + "/" + this.$route.params[param];
        }
      }
      return path;
    }
  }
};
</script>
<style lang="scss" scoped>
.iconfont {
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
}
.point{
  width:6px;
  height:6px;
  display:inline-block;
  border-radius:50%;
  background:#c74747;
}
</style>
