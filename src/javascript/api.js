export function sendMessage(number, message) {
  var key = process.env.TEXT_BLUE_API;
  console.log(process.env);
  var sandbox = process.env.SANDBOX_MODE;

  if (sandbox === "true") {
    key += "_test";
  }
  fetch("https://textbelt.com/text", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone: number,
      message: message,
      key: "testbelt",
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.success) {
        return true;
      } else {
        console.error("Error sending message", data);
        return false;
      }
    })
    .catch((error) => {
      console.error("Error getting user by ID:", error);
      return false;
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
