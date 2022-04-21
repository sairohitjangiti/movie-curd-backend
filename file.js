const fs = require("fs");

fs.readFile("./welcome.txt", "UTF-8", (err, data) => {
  console.log(data);
});

const quote = "Never trust anyone because sometime you are stapped in back..";

fs.writeFile("./confidence.txt", quote, (err) => {
  console.log("Completed Writing..");
});

const quote2 = "Live more,worry less😀";

function createquote(quote) {
  for (let i = 1; i <= 10; i++) {
    fs.writeFile(`./backup/text-${i}.txt`, quote2, (err) => {
      console.log("Completed Writing..");
    });
  }
}
createquote(quote2);
