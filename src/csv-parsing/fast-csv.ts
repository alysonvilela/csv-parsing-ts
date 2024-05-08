import { createReadStream } from "node:fs";
import * as csv from "fast-csv";
import { asapScheduler, from } from "rxjs";
import { logger } from "../utils/logger";
import { getData } from "../utils/get-data";
export class FastCsvStream {
  public static execute() {
    const file = createReadStream("file.csv").pipe(
      csv.parse({ headers: false })
    );

    from(file).subscribe({
      next(value) {
        logger.log(`${FastCsvStream.name} processing line`, value);
        asapScheduler.schedule(async () => await getData(value));
      },
      error(err) {
        logger.log(`${FastCsvStream.name} error`, err);
      },
      complete() {
        logger.log(`${FastCsvStream.name} complete`);
      },
    });
  }
}
