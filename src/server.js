const express = require('express')
const next = require('next')
const PORT = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const isLambda = !!process.env.LAMBDA_TASK_ROOT;
const {
  AWS_API_URL,
} = process.env;

function createServer() {
  const server = express()

  server.all('/test', (req, res) => {
    res.send({status:'works'})
  })

  server.get('/person/:id', (req, res) => {
    app.render(req, res, '/person/[id]', req.query)
  });

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  return server
}

if (isLambda) {
  console.log("inlambda");
  module.exports = createServer();
} else {
  console.log("before app prepare");
  const server = createServer();
  app
    .prepare()
    .then(() => {
      console.log("after app prepare");
      server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> app ready on http://localhost:${PORT}`);
      });
    })
    .catch((ex) => {
      console.error(ex.stack);
      process.exit(1);
    });
  module.exports = server;
}