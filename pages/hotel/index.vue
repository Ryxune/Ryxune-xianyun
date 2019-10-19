<template>
  <div class="wrap">
    <h3>高德地图</h3>
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    window.onLoad = function() {
      var map = new AMap.Map("container");
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=39aefaadb780c5b0a42a6600125ea500&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>

<style scoped>
#container {
  width: 700px;
  height: 580px;
  margin: 0 auto;
}
.wrap h3 {
  font-family: "华文行楷";
  color: #007acc;
  text-align: center;
  margin: 10px;
}
</style>