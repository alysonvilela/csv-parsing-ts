import axios from "axios";
import { logger } from "./logger";

export async function getData(item: string) {
  try {
    logger.log(
      `${getData.name} invoking request`,
      JSON.stringify({ item, date: new Date() })
    );
    await axios.get(`http://localhost:4002/${item}`);
  } catch (err) {
    logger.log(`${getData.name} error`, String(err));
  }
}

export async function getDatas(item: string[]) {
  try {
    logger.log(
      `${getData.name} invoking request`,
      JSON.stringify({ item, date: new Date() })
    );
    await axios.get(`http://localhost:4002/${item}`);
  } catch (err) {
    logger.log(`${getData.name} error`, String(err));
  }
}
