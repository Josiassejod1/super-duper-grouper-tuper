import { fetchQuote, sendMessage } from "../../javascript/api";
import { pollyConfig } from "../polly-config";

test("fetchQuote should fetch a random quote", async () => {
  const polly = await pollyConfig("FetchQuotes");
  const data = await fetchQuote();
  expect(data).toBeDefined();
  await polly.stop();
});

test("send text message", async () => {
  const polly = await pollyConfig("SendMessage");
  const data = await sendMessage("INSERT-TEST-NUMBER", "Hello!");
  expect(data).toBeDefined();
  await polly.stop();
});
