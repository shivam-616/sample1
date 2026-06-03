const { describe, it } = require('node:test');
const assert = require('node:assert');
const http = require('node:http');

// Import the app (it won't listen during tests because we only call app.listen in index.js when run directly)
const app = require('./index.js');

describe('Health endpoint', () => {
  it('should return status ok', async () => {
    // Start the server on a random port for testing
    const server = app.listen(0);
    const { port } = server.address();

    const response = await new Promise((resolve, reject) => {
      http.get(`http://localhost:${port}/health`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
      }).on('error', reject);
    });

    assert.strictEqual(response.statusCode, 200);
    assert.deepStrictEqual(JSON.parse(response.body), { status: 'ok' });

    server.close();
  });
});
