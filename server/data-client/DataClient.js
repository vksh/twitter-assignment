const fetch = require('node-fetch');

function checkStatus(res) {
    if (res.ok) {
        return res.json();
    }
    throw new Error(res.status);
}
const fetchWrapper = {
  get: function (url) {
    return fetch(url, {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer AAAAAAAAAAAAAAAAAAAAAP9bMwEAAAAA%2BDIeKwNq5x7qKns11QMs3FpPbi0%3D3leArwDfl1Gdf7fQAcmwELqP4F4F29gAcauqjdbXeMGrj33tbQ'
      }
    })
      .then(checkStatus)
      .then(response => response)
      .catch(err => err);
  }
};

module.exports = fetchWrapper;
