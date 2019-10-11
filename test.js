// var a = 2; {
//   let a = 3;
//   console.log(a); // 3
// }
// console.log(a); // 2


// var arr = [1, 2, 3, 4];

// arr2 = arr.filter(v => {
//   return v > 2;
// })

// var arr2 = arr.map(v => {
//   if (v > 2) {
//     return v + 1;
//   }
// })

// console.log(arr);
// console.log(arr2);

// var obj1 = { a: 1, b: 2 ,c:5};
// var obj2 = { c: 3, d: 4 ,a:6};
// // var obj3 = { ...obj1, ...obj2 };
// // Object.assign(obj1, obj2);
// // console.log(obj1);
// // console.log(obj3);
// var { a, b, ...props } = obj1;
// console.log(props);


var obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
};
var newObj1 = {};
for (var key in obj) {
  newObj1[key] = obj[key] + 1;
}
console.log(newObj1);

var newObj2 = {};
Object.keys(obj).forEach(v => {
  newObj2[v] = obj[v] + 1;
});
console.log(newObj2);
console.log(Object.entries(obj));
console.log(obj);




