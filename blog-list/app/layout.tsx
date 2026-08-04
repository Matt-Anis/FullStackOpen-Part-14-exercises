import "./globals.css";
import AuthSessionsProviders from "./components/SessionProvider";
import NavBar from "./components/NavBar";
import Notification from "./components/Notification";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthSessionsProviders>
          <NavBar />
          <Notification />
          {children}
        </AuthSessionsProviders>
      </body>
    </html>
  );
}
