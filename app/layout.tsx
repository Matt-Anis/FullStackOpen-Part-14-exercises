import "./globals.css";
import AuthSessionsProviders from "./components/SessionProvider";
import NavBar from "./components/NavBar";
import Notification from "./components/Notification";
import { NotificationProvider } from "./components/NotificationContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <AuthSessionsProviders>
          <NotificationProvider>
            <NavBar />
            <Notification />
            <main className="flex-1 flex my-4 mx-10">{children}</main>
          </NotificationProvider>
        </AuthSessionsProviders>
      </body>
    </html>
  );
}
