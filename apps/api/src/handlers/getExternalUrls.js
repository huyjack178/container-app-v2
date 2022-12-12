const configs = require('../configs');

const getExternalUrls = async (req, res) => {
  try {
    res.code(200).send(configs.externalUrls);
  } catch (err) {
    res.code(500).send({
      err,
    });
    console.log(err);
  }
};

module.exports = { getExternalUrls };
