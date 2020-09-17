import { useState, FormEvent, ChangeEvent } from "react";
import Layout from "../components/Layout";
import { channels } from "../utils/channels";

const DashboardPage = () => {
  const [channel, setChannel] = useState<string>("");
  const [notification, setNotification] = useState<string>("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (channel && notification) {
      return fetch("/api/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel, notification }),
      });
    }
  };

  return (
    <Layout title="Dashboard">
      <h2>Dashboard</h2>

      <form onSubmit={handleSubmit} method="post">
        <p>
          <label>User</label>
          <br />
          <select
            value={channel}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setChannel(e.target.value)
            }
          >
            <option></option>
            {channels.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </p>

        <p>
          <label>Notification</label>
          <br />
          <input
            type="text"
            value={notification}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNotification(e.target.value)
            }
          />
        </p>

        <p>
          <button type="submit">Send Notification</button>
        </p>
      </form>
    </Layout>
  );
};

export default DashboardPage;
