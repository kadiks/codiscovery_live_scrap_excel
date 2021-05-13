// Imports (require)
const axios = require("axios");
const { Parser } = require("htmlparser2");
const { DomHandler } = require("domhandler");
const CSSselect = require("css-select");
const { Command } = require("commander");
const XLSX = require("xlsx");

const extractDataFromJobInfo = require("./src/extractDataFromJobInfo");

// Configure commander (command line)
const program = new Command();

program
  .option("-t, --title <title>", "Titre du poste recherché")
  .option("-c, --city <city>", "Ville du poste recherché", "paris");

program.parse(process.argv);

const options = program.opts();
let searchTitle = options.title || null;
let searchCity = options.city || null;

// Variables declaration
const ROOT_URL = "https://www.lesjeudis.com";

const url = `${ROOT_URL}/recherche?q=${encodeURI(
  searchTitle
)}&loc=${searchCity}`;

if (!searchCity || !searchTitle) {
  console.log("Missing parameters");
  process.exit();
}

// Excel workbook config
const wb = XLSX.utils.book_new();
const ws_data = [["title", "url", "tags"]];

// Page parser
const handler = new DomHandler((error, dom) => {
  if (!error) {
    // console.log("dom", dom);

    const jobInfoEls = CSSselect.selectAll(".job-info", dom);

    const extractedData = jobInfoEls.map((j) =>
      extractDataFromJobInfo(j, { ROOT_URL })
    );

    console.log(extractedData);
    // Update ws_data with extractedData
    extractedData.forEach(({ title, url, tags }) => {
      ws_data.push([title, url, tags.join(", ")]);
    });

    const ws = XLSX.utils.aoa_to_sheet(ws_data);

    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    const date = new Date().toLocaleDateString(options).replace(/\//gi, "-");

    XLSX.writeFile(wb, `./tmp/${searchTitle}-${searchCity}_${date}.xlsx`);

    return;
  }
  console.log({ error });
});

(async () => {
  const { data } = await axios.get(url);

  const rawHtml = data;

  const parser = new Parser(handler);

  parser.write(rawHtml);
  parser.end();
})();
