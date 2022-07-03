const request = require("request");
const himalaya = require("himalaya");

request(
  {
    url: "https://codequiz.azurewebsites.net/",
    method: "GET",
    headers: {
      Cookie: "hasCookie=true",
    },
  },
  function (err, res, body) {
    readNavData(himalaya.parse(body));
  }
);

function readNavData(data) {
  var tmp,
    obj = {},
    key_obj,
    arg = process.argv[2];

  if (!arg) {
    console.log("Please input FUNDCODE");
    return;
  }

  data[1].children[1].children[3].children.forEach(function (table) {
    table.children.forEach(function (row) {
      if (row.tagName == "td") {
        tmp = row.children;
        for (var i = 0; i < tmp.length; i++) {
          if (isNaN(parseFloat(tmp[i].content))) {
            key_obj = tmp[i].content + "";
            key_obj = key_obj.trim();
            obj[key_obj] = [];
          } else {
            obj[key_obj].push(parseFloat(tmp[i].content));
          }
        }
      }
    });
  });

  console.log(obj[arg][0]);
}
