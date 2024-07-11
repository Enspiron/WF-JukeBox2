import Cors from 'cors';

const cors = Cors({
  origin: 'http://localhost:8000', // Replace with your origin
  methods: ['GET', 'POST'], // Allowed methods
});

export function withCors(handler) {
  return async (req, res) => {
    if (req.method === 'OPTIONS') {
      req.headers.allowedMethods = ['GET', 'POST', 'OPTIONS']; // Add allowed methods for preflight requests
      req.headers.allowedHeaders = ['Content-Type', 'Authorization']; // Allowed headers
      res.status(200).send();
    } else {
      return handler(req, res);
    }
  };
}
