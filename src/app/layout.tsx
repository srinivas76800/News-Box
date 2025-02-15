import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import SelectedProvider from '@/context/SelectedContext'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SelectedProvider>
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
    </SelectedProvider>
  );
}
