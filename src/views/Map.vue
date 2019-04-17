<template>
  <div class="about">
    <div ref="container" id="container"></div>
  </div>
</template>
<script>
import request from '../libs/api.request'

export default {
  mounted(){
    var millisecond = new Date().getTime();
    var expiresTime = new Date(millisecond + 60 * 1000 * 1);

    request.get('/').then(function (response) {
　　alert(''.concat(response.data, '\r\n', response.status, '\r\n', response.statusText, '\r\n', response.headers, '\r\n', response.config));
}).catch(function (error) {
　　alert(error);
});
    
    var map = new BMap.Map(this.$refs.container);
    var mapStyle = { style: "bluish" }
    map.setMapStyle(mapStyle);
    // var myStyleJson = [
    //   {
    //     "featureType": "road",
    //     "elementType": "geometry.stroke",
    //     "stylers": {
    //       "color": "#ff0000"
    //     }
    //   }];
    // map.setMapStyle({ styleJson: myStyleJson });
    // 创建地图实例  
    var point = new BMap.Point(116.404, 39.915);
    // 创建点坐标  
    map.centerAndZoom(point, 15);
// 初始化地图，设置中心点坐标和地图级别
  }
}
</script>
<style  lang="stylus" scoped>
.about{
   height:  calc(100% - 30px);

  // border: 1px solid red;
  
  
}
#container {
       height: 100%;

    }
</style>
