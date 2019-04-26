<template>
  <div>
    <div class="card-box">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="card">
            <div class="iconfont icon-tianxieziliao" style="color:#9481f4;"></div>
            <div class="tit f18">机构信息</div>
            <div class="des f14 mt15">完善机构相关信息，方便您在小程序及推广时给消费者展示更专业的机构信息。</div>
            <el-button type="primary" plain size="medium" @click="$router.push({name:'clinic_info'})">去创建</el-button>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="card">
            <div class="iconfont icon-lingshoucaigou" style="color:#d27ff3;"></div>
            <div class="tit f18">机构项目</div>
            <div class="des f14 mt15">完善机构项目，方便您在小程序及推广时给消费者展示您等提供的服务项目。</div>
            <el-button type="primary" plain size="medium" @click="$router.push({name:'product_list'})">去创建</el-button>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="card">
            <div class="iconfont icon-xitongguanli-" style="color:#f482b6;"></div>
            <div class="tit f18">案例管理</div>
            <div class="des f14 mt15">完善机构相关诊疗效果案例，方便您在小程序及推广时给消费者展示，案例越多获得线索几率越大哦！</div>
            <el-button type="primary" plain size="medium" @click="$router.push({name:'case_list'})">去创建</el-button>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="card">
            <div class="iconfont icon-send" style="color:#80f2c1;"></div>
            <div class="tit f18">营销推广</div>
            <div class="des f14 mt15">给您提供拼团、大转盘、到店有礼、优惠券等多种营销工具，去创建活动有机会获得更多的线索哦！</div>
            <el-button type="primary" plain size="medium" @click="$router.push({name:'setactivity_list'})">去创建</el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 报名提示 -->
    <el-dialog title="" custom-class="enroll-tip-dialog" center :visible.sync="dialogEnroll.visible" :append-to-body="true" :close-on-press-escape="false" :before-close="beforeCloseEnroll">
      <div style="font-size: 16px;margin: 66px 20px 0;color: #bf7cff;height:42px;">美业云举办 “<span style="color:#e32271;">{{dialogEnroll.activity.activityName}}</span>”活动，限时免费，报名从速！</div>
      <div style="margin: 35px 0px 230px 265px;width: 97px;height: 72px;color: #fff;text-align: center;line-height: 72px;font-weight: bold;font-size: 44px;">
        {{dialogEnroll.activity.limitNum-dialogEnroll.activity.clinicNum}}
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="enroll">点击报名</el-button>
        <el-button @click="activityInfo">了解活动详情</el-button>
      </span>
    </el-dialog>

    <!-- 活动开始推广提示 -->
    <el-dialog title="活动开始推广啦！" :visible.sync="dialogPushStart.visible" :append-to-body="true" :close-on-press-escape="false" :before-close="beforeCloseEnroll" width="500px">
      <div class="f16">您提交的活动项目 {{dialogPushStart.data.productName}} 已经开始推广啦！</div>
      <div class="mt20 text-3">*在【推广中心】中查看美业云活动</div>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="$router.push({name:'spread_activity_detail',params:{id:dialogPushStart.data.activityId}})">去看看</el-button>
      </span>
    </el-dialog>

    <!-- 报名弹层 -->
    <el-dialog title="美业云活动报名" :visible.sync="dialogActivity.visible" width="500px">
      <activity-layer :activityId="dialogActivity.activityId" :productList="dialogActivity.productList" v-if="dialogActivity.visible" @close="dialogActivity.visible=false"></activity-layer>
    </el-dialog>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import access from "@/api/access";
export default {
  data() {
    return {
      allTipsData: [], //保存所有提示数据
      dialogEnroll: {
        //报名提示
        visible: false,
        activity: {},
        productList: []
      },
      dialogPushStart: {
        visible: false,
        data: {}
      },
      dialogActivity: {
        visible: false,
        activityId: "",
        productList: []
      }
    };
  },
  created() {
    this.getClinicTipMsgList();
  },
  methods: {
    //获取活动提示数据
    getClinicTipMsgList() {
      access
        .getClinicTipMsgList({
          clinicId: this.userinfo.clinicId
        })
        .then(res => {
          if (res.code === "200") {
            if (res.data.messageList && res.data.messageList.length) {
              this.allTipsData = res.data.messageList;
              this.tips();
              if (res.data.newClue) {
                this.newClueTip();
              }
            }
          }
        });
    },
    // 新线索提示
    newClueTip() {
      this.cnzzEvent(this.CNZZ_ETYPE.activitySend, "新线索提示-展示");
      setTimeout(() => {
        this.$confirm(`有新线索啦！快来查看!`, "提示", {
          type: "success"
        }).then(() => {
          this.$router.push({ name: "spread_customdata" });
        });
      }, 110);
    },
    // 查看 报名提示 如果没有则 执行resolve
    checkEnrollData() {
      return new Promise(resolve => {
        let flag = false;
        this.each(this.allTipsData, (i, d) => {
          if (d.needShowEnroll && d.activity.enrollStatus) {
            access
              .checkActivity({
                clinicId: this.userinfo.clinicId,
                activityId: d.activity.activityId
              })
              .then(() => {}); //标记查看活动
            this.cnzzEvent(this.CNZZ_ETYPE.activitySend, "引导报名弹框-展示");
            flag = true;
            this.dialogEnroll = {
              visible: true,
              activity: d.activity,
              productList: d.productList
            };
            this.allTipsData.splice(i, 1);
            this.flag = true;
            return false;
          }
        });
        if (!flag) {
          resolve();
        }
      });
    },
    //查看开始推广提示 如果没有则 执行resolve
    checkStartPushData() {
      return new Promise(resolve => {
        let flag = false;
        this.each(this.allTipsData, (i, d) => {
          if (d.needShowPushStart) {
            this.cnzzEvent(this.CNZZ_ETYPE.activitySend, "开始推广弹层-展示");
            access
              .hasRead({ recordId: d.needShowPushStart.recordId })
              .then(() => {}); //标记已查看
            flag = true;
            this.dialogPushStart = {
              visible: true,
              data: d.activityEnroll
            };
            this.allTipsData.splice(i, 1);
            this.flag = true;
            return false;
          }
        });
        if (!flag) {
          resolve();
        }
      });
    },
    //查看结束推广提示
    checkEndPushData() {
      this.each(this.allTipsData, (i, d) => {
        if (d.needShowPushEnd) {
          this.cnzzEvent(this.CNZZ_ETYPE.activitySend, "推广结束弹层-展示");
          access
            .hasRead({ recordId: d.needShowPushEnd.recordId })
            .then(); //标记已查看
          this.$confirm(
            `您报名参加的 ${
              d.activityEnroll.productName ||'不限定项目'
            } 活动推广结束！请及时跟进活动线索！`,
            "提示",
            {
              confirmButtonText: "点击查看活动效果",
              type: "warning"
            }
          )
            .then(() => {
              this.cnzzEvent(
                this.CNZZ_ETYPE.activitySend,
                "推广结束弹层-点击查看活动效果"
              );
              access
                .getActivityCountNum({
                  activityId: d.activity.activityId,
                  clinicId: this.userinfo.clinicId
                })
                .then(res => {
                  if (res.code === "200") {
                    
                    if (res.data) {
                      const h = this.$createElement;
                      this.$msgbox({
                        title: "请查看本次活动数据报告",
                        message: h("div", { style: "padding:10px;" }, [
                          h("div", null, "浏览次数：" + res.data.pvNum),
                          h(
                            "div",
                            { style: "padding:10px 0" },
                            "浏览人数：" + res.data.uvNum
                          ),
                          h("div", null, "线索人数：" + res.data.mobileNum),
                          h(
                            "div",
                            { style: "padding:20px 0 0;color:#999" },
                            "*推广渠道处于测试阶段，请谅解"
                          )
                        ]),
                        confirmButtonText: "确定"
                      });
                    } else {
                      this.$confirm("没有线索数据！", "提示", {
                        type: "warning"
                      }).then(() => {}).catch(()=>{});
                    }
                  }
                });
            })
            .catch();
          this.allTipsData.splice(i, 1);
        }
      });
    },
    //点击报名
    enroll() {
      this.dialogEnroll.visible = false;
      this.dialogActivity = {
        visible: true,
        activityId: this.dialogEnroll.activity.activityId,
        productList: this.dialogEnroll.productList
      };
      this.cnzzEvent(this.CNZZ_ETYPE.activitySend, "引导报名弹框-点击报名");
    },
    activityInfo() {
      this.$router.push({
        name: "spread_activity_detail",
        params: { id: this.dialogEnroll.activity.activityId }
      });
      this.cnzzEvent(this.CNZZ_ETYPE.activitySend, "引导报名弹框-点击查看详情");
    },
    // 依次弹出提示
    tips() {
      setTimeout(() => {
        this.checkEnrollData().then(() => {
          //如果没有报名则执行 then
          this.checkStartPushData().then(() => {
            //如果没有开始推广执行 then
            this.checkEndPushData(); //推广结束提示
          });
        });
      }, 100);
    },
    // 关闭报名提示层
    beforeCloseEnroll(done) {
      this.tips();
      done();
    }
  },
  computed: {
    ...mapGetters(["userinfo"])
  }
};
</script>

<style lang="scss" scoped>
@media screen and(min-width: 1470px) {
  .card-box{
    width: 1300px;
    margin:100px auto;
  }
}
@media screen and(max-width: 768px) {
  .card-box{
    margin:0 auto;
  }
}
.card {
  height: 460px;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  padding: 25px;
  box-sizing: border-box;
  border: solid 1px #dfe4ed;
  max-width: 320px;
  margin: 10px auto;
  .iconfont {
    height: 50px;
    font-size: 50px;
    padding: 60px 0;
  }
  .tit {
    font-weight: bold;
    color: #324156;
  }
  .des {
    line-height: 1.8;
    color: #adb0b7;
    height: 125px;
  }
}
</style>
<style lang="scss">
//dialog 样式
.enroll-tip-dialog {
  min-width: 457px !important;
  width: 457px !important;
  height: 568px !important;
  border-radius: 5px;
  background: url("/img/baoming-bg.jpg") no-repeat !important;
}
</style>

