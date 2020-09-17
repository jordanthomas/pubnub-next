import { usePubNub } from "pubnub-react";
import { useState, useEffect, MouseEvent, ChangeEvent } from "react";
import Layout from "../components/Layout";
import { channels } from "../utils/channels";
import { PubnubNotification } from "../interfaces";

const IndexPage = () => {
  const isClientRender = typeof window !== "undefined";
  const pubnub = usePubNub();

  const [channel, setChannel] = useState<string>(channels[0]);

  const [notifications, setNotifications] = useState<Array<PubnubNotification>>(
    []
  );

  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(
    false
  );

  const notificationToggleText = notificationsEnabled
    ? "Disable Notifications"
    : "Enable Notifications";

  const handleNotificationToggle = async (
    _event: MouseEvent<HTMLButtonElement>
  ) => {
    if (Notification.permission === "granted") {
      setNotificationsEnabled(!notificationsEnabled);
      return;
    }

    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === "granted");
    }
  };

  const notificationListener = {
    message: (messageEvent: PubnubNotification) => {
      setNotifications([
        { timetoken: messageEvent.timetoken, message: messageEvent.message },
        ...notifications,
      ]);

      if (notificationsEnabled) {
        new Notification(messageEvent.message);
      }
    },
  };

  useEffect(() => {
    pubnub.addListener(notificationListener);

    return () => {
      pubnub.removeListener(notificationListener);
    };
  });

  useEffect(() => {
    pubnub.subscribe({ channels: [channel] });

    return () => {
      pubnub.unsubscribeAll();
    };
  }, [channel]);

  return (
    <Layout title="Inbox">
      <h2>
        Inbox For{" "}
        <select
          value={channel}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setChannel(e.target.value);
            setNotifications([]);
          }}
        >
          {channels.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </h2>

      <p>
        <button type="button" onClick={handleNotificationToggle}>
          {notificationToggleText}
        </button>{" "}
        (Browser permission set to: {isClientRender && Notification.permission})
      </p>

      <ol>
        {notifications.map((n) => (
          <li key={n.timetoken}>{n.message}</li>
        ))}
      </ol>
    </Layout>
  );
};

export default IndexPage;
