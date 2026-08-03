import AuthSessionsProviders from "./components/SessionProvider";
import NavBar from "./components/NavBar";

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
          {children}
        </AuthSessionsProviders>
      </body>
    </html>
  );
}
