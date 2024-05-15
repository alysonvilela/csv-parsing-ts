import { Mock, afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FastCsvStream } from "./fast-csv";
import { Observable, firstValueFrom, lastValueFrom, map } from "rxjs";

let mockCb: Mock;
let mockAsapScheduler: Mock = vi.fn();

vi.mock("../utils/logger", () => ({
  logger: {
    log: vi.fn(),
  },
}));

describe(FastCsvStream.name, () => {
  beforeEach(async () => {
    mockCb = vi.fn((data: string[]) => {
      mockAsapScheduler(async () => {
        return await new Promise((resolve) =>
          setTimeout(() => resolve(data), 1000)
        );
      });
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should make a bulk request", async () => {
    const iot = new FastCsvStream("somefile.csv");
    iot.execute(mockCb);

    const result = await lastValueFrom(iot.observable);
    console.log(result);
    expect(mockCb).toBeCalledTimes(4);
    expect(mockCb).toBeCalledWith([]);
  });
});
