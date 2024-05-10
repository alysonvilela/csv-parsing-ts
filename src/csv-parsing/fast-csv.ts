import { createReadStream } from "node:fs";
import * as csv from "fast-csv";
import { asapScheduler, asyncScheduler, bufferCount, from } from "rxjs";
import { logger } from "../utils/logger";
import { getData, getDatas } from "../utils/get-data";
export class FastCsvStream {
  public static execute() {
    const file = createReadStream("bigfile.csv").pipe(
      csv.parse({ headers: false })
    );

    from(file)
      .pipe(bufferCount(1000)) // You can make a request after 1000 lines with the captured data from them
      .subscribe({
        next(value) {
          logger.log(
            `${FastCsvStream.name} processing line`,
            JSON.stringify(value)
          );

          // ASAP SCHEDULER - Runs FIFO
          // asapScheduler.schedule(async () => await getData(value));

          // ASYNC SCHEDULER - Runs when the there is space between processing events
          asyncScheduler.schedule(async () => await getDatas(value));
        },
        error(err) {
          logger.log(`${FastCsvStream.name} error`, err);
        },
        complete() {
          logger.log(`${FastCsvStream.name}`, "complete");
        },
      });
  }
}
