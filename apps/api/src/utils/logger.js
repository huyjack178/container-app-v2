const getTimestamp = () => {
  return new Date().toISOString(); // ISO format: "2025-06-17T08:30:15.123Z"
};

const log = (...args) => {
  console.log(`[LOG - ${getTimestamp()}]`, ...args);
};

const info = (...args) => {
  console.info(`[INFO - ${getTimestamp()}]`, ...args);
};

const warn = (...args) => {
  console.warn(`[WARN - ${getTimestamp()}]`, ...args);
};

const error = (...args) => {
  console.error(`[ERROR - ${getTimestamp()}]`, ...args);
};

module.exports = {
  log,
  info,
  warn,
  error,
};
