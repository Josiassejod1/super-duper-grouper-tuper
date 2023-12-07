import { fetchQuote, sendMessage } from "../../javascript/api";
import { request } from "../vcr";

test("sendMessage should send a text message successfully", async () => {
  const result = await request(
    sendMessage("1234567890", "Hello!"),
    "sendMessage",
    {
      path: "./test.json",
      replay: true,
      ignoreFields: [],
      override: true,
      record: false,
    },
  );

  expect(result).toBeDefined();
});

test("fetchQuote should fetch a random quote", async () => {
  const result = await request(fetchQuote(), "AnimeQuote", {
    path: "./test.json",
    replay: true,
    ignoreFields: [],
    override: false,
    record: true,
  });

  expect(result).toBeDefined();
});
