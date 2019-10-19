<template>
  <div class="container">
    <script src="/qrcode.js"></script>
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{payData.price}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <!-- <canvas id="qrcode-stage"></canvas> -->
            <div id="qrcode"></div>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    let { id } = this.$route.query;
    setTimeout(() => {
      this.$axios({
        url: "/airorders/" + id,
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        console.log(res);
        this.payData = res.data;
        new QRCode(
          document.getElementById("qrcode"),
          this.payData.payInfo.code_url
        );
      });

      //订单是否支付成功轮询
      this.timer = setInterval(async () => {
        let res  = await this.$axios({
          url: "/airorders/checkpay",
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
          },
          data: {
            id,
            nonce_str: this.payData.price,
            out_strade_no: this.payData.orderNo
          }
        });


        //支付成功后停止轮询
        let { statusTxt } = res.data;
        if (statusTxt === "支付完成") {
          this.$message.success(statusTxt);
          clearInterval(this.timer);
        }
      }, 3000);
    }, 10);
  },
  data() {
    return {
      payData: {},
      timer: null
    };
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>