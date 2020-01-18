// const port_redis = process.env.PORT || 6379;
// const port = process.env.PORT || 5000;

// export const redis_client = redis.createClient(port_redis);

// checkCache = (req, res, next) => {
//     const { id } = req.params;
  
//     redis_client.get(req.url, (err, data) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send(err);
//       }
//       //if no match found
//       if (data != null) {
//         res.send(data);
//         console.log('get redis')
//       } else {
//         //proceed to next middleware function
//       console.log('set redis')
//         next();
//       }
//     });
//   };
  