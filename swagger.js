const options = {
    autoHeaders: true
  }
  const swaggerAutogen = require('swagger-autogen')(options);
  
  const doc = {
    info: {
      title: 'Card Games Scoring API',
      description: 'Card Games Scoring API'
    },
    host: 'localhost:3000',
    schemes: ['http'],
    tags: [
        {name: "Phase 10"},
        {name: "Rage"},
        {name: "Players"},
        {name: "Game Types"},
        {name: "User"}
    ]
  };
  
  const outputFile = './swagger-output.json';
  const routes = ['./routes/index.js','./routes/gametypes.js', './routes/players.js', './routes/phase10.js', './routes/rage.js'];
  
  swaggerAutogen(outputFile, routes, doc);