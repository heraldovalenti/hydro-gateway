const axios = require("axios");
const querystring = require("node:querystring");

const RP5_URL = process.env.RP5_URL;
const rp5Handler = async (req, res) => {
  const { query } = req;
  const { stationId, period, date, rp5Cookie } = query;
  console.log("requesting data for stationId", stationId);
  let statusCode = 0;
  try {
    const params = new URLSearchParams({
      ArchDate: date,
      pe: period,
      lang: "es",
      time_zone_add: "-3",
    });

    const headers = {
      Referer: "https://rp5.ru",
      Origin: "https://rp5.ru",
      "Accept-Language": "en,en-US;q=0.9,es;q=0.8",
      Cookie: rp5Cookie,
    };

    const { headers: responseHeaders, status } = await axios.post(
      `${RP5_URL}/${stationId}`,
      params,
      {
        maxRedirects: 0,
        headers,
        validateStatus: function (status) {
          return status === 302;
        },
      }
    );
    statusCode = status;
    // console.log("redirecting to", responseHeaders.location);
    const { data } = await axios.get(responseHeaders.location, {
      maxRedirects: 0,
      headers,
    });
    console.log("response size = ", data.length);
    res.send(data);
  } catch (e) {
    console.warn(`Error fetching data from ${RP5_URL}`, e);
    const queryString = querystring.stringify(query);
    res.send({ queryString, statusCode });
  }
};

module.exports = { rp5Handler };
