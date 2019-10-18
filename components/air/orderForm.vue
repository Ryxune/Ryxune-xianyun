<template>
  <div class="main">
    <input type="hidden" :value="allPrice" >
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in ticketDetail.insurances" :key="index">
          <el-checkbox
            :label="item.id"
            border
            v-model="insurances"
          >{{`${item.type}：￥${item.price}/份×${users.length}  最高赔付${item.compensation}元`}}</el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        {username:"",id:""}
      ],
      //机票详情
      ticketDetail: {},
      insurances: [],
      contactPhone: "",
      contactName: "",
      captcha: "",
    }
  },
  mounted() {
    let {id,seat_xid} = this.$route.query;
    this.$axios({
      url: "/airs/" + id,
      params: {seat_xid}
    }).then(res => {
      // console.log(res.data);
      this.ticketDetail = res.data;
      this.$emit("getTicketDetail",this.ticketDetail);
    })
  },
  computed: {
    allPrice() {

      if(!this.ticketDetail.seat_infos) return;

      let price = 0;
      let len = this.users.length;
      price +=this.ticketDetail.seat_infos.org_settle_price * len;

      this.insurances.forEach(v => {
        price += this.ticketDetail.insurances[v-1].price * len;
      });

      price += this.ticketDetail.airport_tax_audlet * len;

      this.$emit("getAllPrice",price);

      return price;

    }
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users.push({contactPhone:"",id:""});
    },

    // 移除乘机人
    handleDeleteUser(index) {
      this.users.splice(index,1);
    },

    // 发送手机验证码
    async handleSendCaptcha() {
      if (this.contactPhone.trim() == "") {
        this.$message.error("请先输入手机号码");
        return;
      }
      let res = await this.$store.dispatch("user/captcha", this.contactPhone);

      if (res.status == 200) {
        this.$message.success("您的闲云旅游验证码为: " + res.data.code);
      }
    },

    // 提交订单
    handleSubmit() {
      let {id,seat_xid} = this.$route.query;
      let data = {
        users:this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        invoice:false,
        seat_xid,
        air:id,
        captcha: this.captcha

      }

      this.$axios({
        url: "/airorders",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then( res => {
        console.log(111,res);
      })
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>