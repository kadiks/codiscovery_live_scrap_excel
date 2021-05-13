const CSSselect = require("css-select");

const cleanText = require("./cleanText");

const extractDataFromJobInfo = (jobInfoEl, { ROOT_URL }) => {
  // Get title
  const titleEl = CSSselect.selectOne(".job-title", jobInfoEl);

  let title = "";
  titleEl.children.forEach(({ type, data }) => {
    if (type === "text") {
      title = data;
    }
  });
  title = cleanText(title);

  // Get URL
  const url = ROOT_URL + titleEl.attribs.href;

  // Get tags
  const tagEls = CSSselect.selectAll(".tags .tag", jobInfoEl);

  const tags = tagEls.map((tagEl) => {
    let text = "";
    tagEl.children.forEach(({ type, data }) => {
      if (type === "text") {
        text = data;
      }
    });
    return cleanText(text);
  });

  return {
    title,
    url,
    tags,
  };
};

module.exports = extractDataFromJobInfo;
