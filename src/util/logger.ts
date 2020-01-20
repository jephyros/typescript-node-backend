"use strict"
const { createLogger, format, transports } = require("winston");
import path from 'path';

require("winston-daily-rotate-file")

const fs = require("fs")

const env = process.env.NODE_ENV || "development";

const logDir = path.join(__dirname, '../logs')


//console.log(logDir);

//Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir)
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
  level: "debug",
  filename: `${logDir}/iEcoProC-APIServer_%DATE%.log`,
  datePattern: "YYYYMMDD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "3d"
})

export let logger = createLogger({
  level: env === "development" ? "debug" : "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    //format.json()
    format.printf(
      (info:any) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(
        format.colorize(),
        format.printf(
          (info:any) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),
    dailyRotateFileTransport
  ]
})

