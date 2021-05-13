const { DomHandler } = require("domhandler");
const CSSselect = require("css-select");

const handler = new DomHandler((error, dom) => {
  return new Promise((resolve, reject) => {
    if (!error) {
      // console.log("dom", dom);

      const jobInfoEls = CSSselect.selectAll(".job-info", dom);

      resolve(jobInfoEls);
      return;

      //   return;
    }
    reject(error);
  });
});

module.exports = {
  handler,
  callback,
};
