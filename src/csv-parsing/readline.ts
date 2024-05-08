import { createReadStream } from "fs";
import { Readline } from "node:readline/promises";
import { createInterface } from "readline";
import { asapScheduler, from } from "rxjs";
import { logger } from "../utils/logger";
import { getData } from "../utils/get-data";

export class ReadLineStream {
  public static execute() {
    const file = createReadStream("file.csv");
    const line = createInterface({
      input: file,
    });

    from(line).subscribe({
      next(value) {
        logger.log(`${ReadLineStream.name} processing line`, value);
        asapScheduler.schedule(async () => await getData(value));
      },
      error(err) {
        logger.log(`${ReadLineStream.name} error`, err);
      },
      complete() {
        logger.log(`${ReadLineStream.name}`, "complete");
      },
    });
  }
}
