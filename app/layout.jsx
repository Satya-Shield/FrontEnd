import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-900 text-white">
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
