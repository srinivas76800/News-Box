import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import SelectedProvider from '@/context/SelectedContext'
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Tech News",
    template: "%s | Tech News India",
  },
  description: "Latest tech updates daily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SelectedProvider>
          {children}
        </SelectedProvider>
      </body>
    </html>
  );
}
