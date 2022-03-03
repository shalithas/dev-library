const axios = require("axios");
const _ = require("lodash");
const fs = require("fs");

const config = require("./zeplin-config.json");

const API_URL = `https://api.zeplin.dev/v1/projects/${config.project}/design_tokens?include_linked_styleguides=true`;
const TOKEN = config.token;

function fetchStyles() {
  axios
    .get(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
    .then((res) => {
      _.forEach(res.data, (item, key) => {
        exportToJSON(key, item);
      });
    });
}

const path = "properties/zeplin";
function exportToJSON(fileName, content) {
  const jsonContent = JSON.stringify(content);

  fs.writeFile(`${path}/${fileName}.json`, jsonContent, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }

    console.log(`JSON file ${fileName} has been saved.`);
  });
}

fetchStyles();
