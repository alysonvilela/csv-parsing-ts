import axios from "axios";
import { logger } from "./logger";

export async function getData(item: string) {
  try {
    logger.log(
      `${getData.name} invoking request`,
      JSON.stringify({ item, date: new Date() })
    );
    const { data } = await axios.get(`http://localhost:4002/${item}`);
    console.log({ data });
  } catch (err) {
    logger.log(`${getData.name} error`, String(err));
  }
}
