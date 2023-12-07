import "./styles.css";
import React, { useEffect, useState, useMemo } from "react";

import UserRepository from "./javascript/repository/user_repository";
import PouchRepository from "./javascript/repository/pouch_repository";
import { SettingsPanel } from "./SettingsPanel";

export default function App() {
  const userRepository = new UserRepository();
  const pouchRepository = new PouchRepository();

  const [sms, setSMS] = useState("");
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [settings, setShowSettings] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allUsers = await userRepository.getAllDocuments();
        setUsers(allUsers);
      } catch (error) {
        console.error("Error in fetching documents:", error.message);
      }
    };

    if (settings) {
      fetchData();
    }

    const changes = pouchRepository.subscribeToChanges(fetchData);

    return () => {
      changes.cancel();
    };
  }, [settings]);

  async function handleSubmit(e) {
    e.preventDefault();
    const user = await userRepository.findOrCreate(sms, name);
    if (user) {
      setSMS("");
      setName("");
    }
  }

  async function handleSettings() {
    setShowSettings(!settings);
  }

  return (
    <div className="App">
      <button onClick={handleSettings} className="settings">
        ⚙️
      </button>
      <div className="header">
        <h1>Anime Text Service</h1>
      </div>
      <p>
        Put your phone number in to get an inspiring quote from an anime
        character periodically
      </p>
      <div>
        <form>
          <input
            placeholder="8773934448"
            maxLength="10"
            pattern="\d{10}"
            type="tel"
            required
            value={sms}
            onChange={(e) => setSMS(e.target.value)}
          />
          <input
            placeholder="John Doe"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>
      <SettingsPanel
        settings={settings}
        users={users}
        deleteUserBy={userRepository.deleteUserBy}
      />
    </div>
  );
}
