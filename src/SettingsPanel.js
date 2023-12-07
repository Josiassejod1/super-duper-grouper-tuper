import React, { useState, useEffect } from "react";
import { sendMessage, fetchQuote } from "./javascript/api";

export function SettingsPanel({ users = [], settings, deleteUserBy }) {
  const [success, setSuccess] = useState(false);

  const [quote, setQuote] = useState(null);
  const [message, setMessage] = useState("");
  const messagePresent = message != "";
  async function handleQuote() {
    const quote = await fetchQuote();

    if (quote) {
      setQuote(quote);
      const template = `Hello {name}, this is inspirational quote from ${quote?.character}, a character from the show ${quote?.anime} '${quote?.quote}'`;
      setMessage(template);
    }
  }

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setSuccess(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [success]);

  return (
    settings && (
      <div className="setting-panel">
        <div className="text-container">
          <textarea
            value={message}
            placeholder="The grass is greener on the other side"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            style={{
              minWidth: 500,
              height: 115,
            }}
          >
            {quote}
          </textarea>
          <button onClick={handleQuote}>Get Quote</button>
        </div>
        <div>{success && <p>Message successfully sent</p>}</div>
        {users.length > 0 && (
          <table className="sms-chart">
            <thead className="t-head">
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {users.map(({ _id, name }) => {
                return (
                  <tr key={_id}>
                    <td>{_id}</td>
                    <td>{name}</td>

                    <td>
                      <button
                        onClick={() => {
                          deleteUserBy(_id);
                        }}
                      >
                        🗑️
                      </button>
                      <button
                        onClick={() => {
                          // If some uses curly braces replace with name
                          const template = message.replace(/{([^{}]+)}/g, name);
                          const result = sendMessage(_id, template);
                          setSuccess(result);
                        }}
                        disabled={!messagePresent}
                      >
                        📧
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    )
  );
}
