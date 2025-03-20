const geoip = require("geoip-lite");

const requestLogger = (req, res, next) => {
  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  // Convert IPv6 localhost (::1) to IPv4 (127.0.0.1)
  if (ip === "::1" || ip === "127.0.0.1") {
    ip = "127.0.0.1";
  }

  const geo = geoip.lookup(ip);
  const country = geo ? geo.country : "Localhost"; // Show "Localhost" for local testing
  const dateTime = new Date().toLocaleString();
  const method = req.method;
  const route = req.originalUrl;

  console.log(
    `[${dateTime}] ${method} ${route} - IP: ${ip}, Country: ${country}`
  );

  next();
};

module.exports = requestLogger;
