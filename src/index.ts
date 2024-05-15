import { asapScheduler } from "rxjs";
import { FastCsvStream } from "./csv-parsing/fast-csv";
import { ReadLineStream } from "./csv-parsing/readline";

const asyncCallback = (data: string[]) => {
  asapScheduler.schedule(async () => {
    console.log(data);
  });
};

const fileCsvStream = new FastCsvStream("somefile.csv");
fileCsvStream.execute(asyncCallback, 1);
// ReadLineStream.execute();
