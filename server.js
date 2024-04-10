const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const gametype_routes = require('./routes/gametypes');
const player_routes = require('./routes/players');
const phase10_routes = require('./routes/phase10');
const rage_routes = require('./routes/rage');

app.use('/', require('./routes/index'));
app.use('/', gametype_routes);
app.use('/', player_routes);
app.use('/', phase10_routes);
app.use('/', rage_routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception Origin ${origin}`);
});

app.listen(process.env.PORT || port);
console.log('Web Server is listenting at port '+ (process.env.PORT || port))