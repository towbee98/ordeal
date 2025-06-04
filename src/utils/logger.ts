type LogArgs = unknown[];

const logger = {
  info: (message: string, ...args: LogArgs): void => {
    console.log(`[INFO] ${message}`, ...args);
  },
  error: (message: string, ...args: LogArgs): void => {
    console.error(`[ERROR] ${message}`, ...args);
  },
  warn: (message: string, ...args: LogArgs): void => {
    console.warn(`[WARN] ${message}`, ...args);
  },
  debug: (message: string, ...args: LogArgs): void => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  },
};

export default logger;
