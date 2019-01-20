url=require('url')
address='http://localhost:8080/default.htm?year=2017&month=february'
q=url.parse(address,true)
// console.log(q.host)
// console.log(q.pathname); //returns '/default.htm'
// console.log(q.search);
var que = q.query
console.log(que)
console.log(que.year)