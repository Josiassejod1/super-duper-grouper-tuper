import { fetchQuote, sendMessage } from "../../javascript/api";

test("sendMessage should send a text message successfully", async () => {
  const fetchMock = jest.spyOn(window, "fetch").mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce({ success: true }),
  });

  const result = await sendMessage("+1234567890", "Hello!");

  expect(fetchMock).toHaveBeenCalledWith("https://textbelt.com/text", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone: "+1234567890",
      message: "Hello!",
      key: process.env.REACT_APP_TEXT_BLUE_API,
    }),
  });

  expect(result.success).toBe(true);
});

test("fetchQuote should fetch a random quote", async () => {
  const expectedQuote = { author: "Some Author", quote: "Some Quote" };
  const fetchMock = jest.spyOn(window, "fetch").mockResolvedValueOnce({
    json: jest.fn().mockResolvedValueOnce(expectedQuote),
  });

  const result = await fetchQuote();

  expect(fetchMock).toHaveBeenCalledWith("https://animechan.xyz/api/random");
  expect(result).toEqual(expectedQuote);
});
