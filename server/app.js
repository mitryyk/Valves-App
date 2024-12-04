const os = require('os');
const express = require('express');

const _d = (par) => { console.log(par) };
//

const networkInterfaces = os.networkInterfaces();
console.log(networkInterfaces);
const opnvpn = { netname: "Подключение по локальной сети", addr: "192.168.89" };
const wifi = { netname: "Беспроводная сеть", addr:"192.168.1" }

let regexp, obj;
if (opnvpn.netname in networkInterfaces) { obj = opnvpn } else { obj = wifi }
let {netname, addr} = obj;
const ip = networkInterfaces[netname].find((el) => {
  regexp = new RegExp(addr + "\\.((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))", "g");
  if (el.address.match(regexp)) {return el} return false
});
console.log(ip);
const app = express();
const port = 3000;

app.listen(port, ip.address, () => {
  console.log(`Example app listening on port ${port}`)
});

app.use('/', express.static("./public"));

/* const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!')); */