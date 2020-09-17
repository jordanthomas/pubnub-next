import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Pubnub Demo" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <header>
      <h1>Notification Demo</h1>

      <nav>
        <Link href="/dashboard">Dashboard</Link> |{" "}
        <Link href="/inbox">Inbox</Link>
      </nav>
    </header>

    <hr />

    {children}

    <footer>
      <hr />
    </footer>
  </div>
);

export default Layout;
