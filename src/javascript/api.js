export function sendMessage(number, message) {
  var key = process.env.REACT_APP_TEXT_BLUE_API;
  var sandbox = process.env.REACT_APP_SANDBOX_MODE;

  if (sandbox === "true") {
    key += "_test";
  }
  return fetch("https://textbelt.com/text", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone: number,
      message: message,
      key: key,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.error("Error getting user by ID:", error);
      return { success: false };
    });
}

export async function fetchQuote() {
  try {
    const response = await fetch("https://animechan.xyz/api/random");
    const quote = await response.json();
    return quote;
  } catch (error) {
    console.error("Error fetching quote", error.message);
    return null;
  }
}
