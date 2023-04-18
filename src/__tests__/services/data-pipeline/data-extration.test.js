import { DataExtractor } from "../../../services/data-pipeline/data-extractor";
import fetch from "node-fetch";

jest.mock("node-fetch");

describe("DataExtractor", () => {
  const dataExtractor = new DataExtractor();

  afterEach(() => {
    fetch.mockClear();
  });

  it("should fetch data from the provided URL", async () => {
    const mockUrl = "https://example.com/data";
    const mockData = { data: "sample data" };
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
    });

    const data = await dataExtractor.extract(mockUrl);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(mockUrl);
    expect(data).toEqual(mockData);
  });
});