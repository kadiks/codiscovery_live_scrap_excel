const XLSX = require("xlsx");

const wb = XLSX.utils.book_new();
const ws_data = [
  ["titre", "contrat", "ville", "e", "t", "J", "S"],
  ["S", "h", "e", "e", "t", "J", "S"],
  ["S", "h", "e", "e", "t", "J", "S"],
];

const ws = XLSX.utils.aoa_to_sheet(ws_data);

XLSX.utils.book_append_sheet(wb, ws, "SheetJS");

const ts = new Date().getTime();
XLSX.writeFile(wb, `./tmp/${ts}.xlsx`);
