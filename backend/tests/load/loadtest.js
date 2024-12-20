const autocannon = require('autocannon');
const { writeFileSync } = require('fs');
const logger = require('../../src/config/logger');

const instance = autocannon({
  url: 'http://localhost:5000',
  connections: 100,
  pipelining: 1,
  duration: 30,
  scenarios: [
    {
      name: 'Get Properties',
      method: 'GET',
      path: '/api/properties',
      weight: 50
    },
    {
      name: 'Search Properties',
      method: 'GET',
      path: '/api/properties/search?type=apartment&city=Delhi',
      weight: 30
    },
    {
      name: 'Get Property Details',
      method: 'GET',
      path: '/api/properties/{{propertyId}}',
      weight: 20,
      setupFn: async (context) => {
        // Get a random property ID for testing
        const response = await fetch('http://localhost:5000/api/properties');
        const data = await response.json();
        context.vars.propertyId = data.properties[0]._id;
      }
    }
  ],
  headers: {
    'Content-Type': 'application/json'
  }
}, finishedBench);

function finishedBench(err, res) {
  if (err) {
    logger.error('Load test error:', err);
    return;
  }

  const report = {
    timestamp: new Date(),
    stats: {
      latency: res.latency,
      throughput: res.throughput,
      errors: res.errors,
      timeouts: res.timeouts,
      duration: res.duration,
      connections: res.connections
    }
  };

  writeFileSync(
    `./tests/load/reports/report-${Date.now()}.json`,
    JSON.stringify(report, null, 2)
  );

  logger.info('Load test completed successfully');
}

// Track progress
autocannon.track(instance, { renderProgressBar: true }); 