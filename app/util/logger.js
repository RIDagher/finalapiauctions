import log from 'npmlog';
import fs from 'fs';
import path from 'path';

// Define log file path
const logDir = path.join(process.cwd(), 'logs');
const logFile = path.join(logDir, 'app.log');

// Ensure logs directory exists if not it creates one
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Create a writable stream for logging
const logStream = fs.createWriteStream(logFile, { flags: 'a' });

// Custom log levels
log.level = 'info';
log.addLevel('http', 1500, { fg: 'cyan' });

// Function to log to file with optional IP
function logToFile(level, message, ipAddress = 'Unknown IP') {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] [${ipAddress}] ${message}\n`;
  logStream.write(logMessage);
}

// Override npmlog functions to also log IPs
['info', 'error', 'warn', 'http'].forEach((level) => {
  const original = log[level];
  log[level] = (message, ipAddress = 'Unknown IP') => {
    original(message);
    logToFile(level, message, ipAddress);
  };
});

export default log;
