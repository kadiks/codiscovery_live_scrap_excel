const { Parser } = require("htmlparser2");
const { DomHandler } = require("domhandler");

const rawHtml = "<body><div>Hello le stream</div><p id='abc'>DEF</p></body>";

const handler = new DomHandler((error, dom) => {
  if (!error) {
    // console.log("dom", dom);
    const bodyEl = dom[0];
    // console.log("bodyEl", bodyEl);
    const divEl = bodyEl.children[0];
    const pEl = bodyEl.children[1];
    // console.log("divText", divEl.children[0].data);
    console.log("p text", pEl.children[0].data);
    return;
  }
  console.log({ error });
});

const parser = new Parser(handler);

parser.write(rawHtml);
parser.end();
