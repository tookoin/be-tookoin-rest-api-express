const model = require('../Models/product');
const jwtdecode = require('jwt-decode');
const form = require('../Helpers/form');

const redis = require('redis');
// const port_redis = process.env.PORT_REDIS || 6379;
const port_redis = 6379;
const redis_client = redis.createClient(port_redis);

module.exports = {
  getAllProduct: (req, res) => {
    const { query } = req;

    //// REDIS

    redis_client.get(req.url, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }

      const resp = JSON.parse(data)
      //if no match found
      if (data != null) {
        console.log('get redis');

        page = parseInt(resp[2]);
        limit = parseInt(resp[1]);
        dataAmount = resp[3];

        totalPage = Math.ceil(dataAmount / limit);
        nextPage = totalPage - page;
        prevPage = totalPage - 1 - nextPage;

        paginate = {
          totalPage: totalPage,
          per_page: limit,
          page: page,
          total: dataAmount,
          next: nextPage,
          prev: prevPage
        };

        form.allData(res, resp[0], paginate);

      } else {
        //proceed to next middleware function
        console.log('set redis');
        model
      .getAllProduct(query)
      .then(response => {
        page = parseInt(response[2]);
        limit = parseInt(response[1]);
        dataAmount = response[3];

        totalPage = Math.ceil(dataAmount / limit);
        nextPage = totalPage - page;
        prevPage = totalPage - 1 - nextPage;

        paginate = {
          totalPage: totalPage,
          per_page: limit,
          page: page,
          total: dataAmount,
          next: nextPage,
          prev: prevPage
        };
        data = response[0];
        redis_client.setex(req.url, 3600, JSON.stringify(response));

        form.allData(res, data, paginate);
      })
      .catch(err => console.log(err));
      }
    });
    /////////////end redis////////////
    
  },
  postProduct: (req, res) => {
    const { body } = req;
    const token = req.headers['authorization'];
    const decoded = jwtdecode(token);
    model
      .postProduct(body, decoded['id_user'])
      .then(response => {
        const data = {
          id: response.insertId
        };
        form.success(res, data);
      })
      .catch(err => console.log(err));
  },
  patchProduct: (req, res) => {
    const { query, params } = req;
    const token = req.headers['authorization'];
    const decoded = jwtdecode(token);
    model
      .patchProduct(query, params, decoded['id_user'])
      .then(response => {
        const data = {
          desc: 'Update Success'
        };
        form.success(res, data);
      })
      .catch(err => console.log(err));
  },
  deleteProduct: (req, res) => {
    const { params } = req;
    const token = req.headers['authorization'];
    const decoded = jwtdecode(token);
    model
      .deleteProduct(decoded['id_user'], params)
      .then(reponse => {
        const data = {
          desc: 'Delete Success'
        };
        form.success(res, data);
      })
      .catch(err => console.log(err));
  }
};
