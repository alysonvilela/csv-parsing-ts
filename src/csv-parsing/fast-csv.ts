import { createReadStream } from "node:fs";
import * as csv from "fast-csv";
import { Observable, bufferCount, count, from, map } from "rxjs";
import { logger } from "../utils/logger";
export class FastCsvStream {
  private _observable!: Observable<string> | undefined;

  constructor(private path: string) {}
  execute(cb: (data: string[]) => void, queueSize = 1) {
    this._observable = from(
      createReadStream(this.path).pipe(
        csv.parse({ headers: false, delimiter: "\n" })
      )
    ) as Observable<string>;

    return this._observable.pipe(bufferCount(queueSize)).subscribe({
      next(value) {
        logger.log(
          `${FastCsvStream.name} processing line`,
          JSON.stringify(value)
        );

        cb(value);
      },
      error(err) {
        logger.log(`${FastCsvStream.name} error`, err);
      },
      complete() {
        logger.log(`${FastCsvStream.name}`, "complete");
      },
    });
  }

  get observable() {
    return this._observable as Observable<string>;
  }
}
