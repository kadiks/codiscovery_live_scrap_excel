const axios = require("axios");

const url =
  "https://www.lesjeudis.com/recherche?q=d%C3%A9veloppeur&loc=marseille";

// IIFE (Immediately Invoked Function Expression)
(async () => {
  const { data } = await axios.get(url);
})();
