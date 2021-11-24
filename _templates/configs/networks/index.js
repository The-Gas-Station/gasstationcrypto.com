const networks = require('../../../src/networks.json');

module.exports = {
  params: ({ args }) => {
    return networks;
  },
};
