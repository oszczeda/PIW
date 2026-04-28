import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "GierkiPlanszowe - Sklep",
  description: "Aplikacja do handlu grami planszowymi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body>
        <header className="main-header">
          <Link href="/">
            <h1>GierkiPlanszowe</h1>
          </Link>
          <div className="header-actions">
            <button className="calc-button">Koszyk (0)</button>
            <button className="calc-button calc-button-operator">Zaloguj</button>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}