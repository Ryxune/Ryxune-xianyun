/**
 * @desc: 计算相隔时间
 * 
 * @param: 参数 | 属性说明 | 参考值
 * @param: arr_time | 到达时间 | 14：10
 * @param: dep_time | 出发时间 | 12: 00
 * 
 * @return: 相隔时间的字符串
 */

export function computeTime(arr_time, dep_time) {
  if (!arr_time || !dep_time) return;

  let arr = arr_time.split(":");
  let dep = dep_time.split(":");

  if (arr[0] < dep[0]) {
    arr[0] = +arr[0] + 24;
  }
  let minutes = arr[0] * 60 + +arr[1] - (dep[0] * 60 + +dep[1]);
  let hours = Math.floor(minutes / 60);
  minutes = minutes % 60;

  // 不知何时才能获取到真正的数据,这里是为了不显示没有数据时显示机票列表布局
  // setTimeout(() => {
  //   this.opacity.opacity = 1;
  // }, 1600)
  return `${hours}小时${minutes}分`;
}
