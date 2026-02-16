export const metadata = {
  title: "Job Application Form",
  description: "Submit your application details",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: "Poppins, sans-serif",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          minHeight: "100vh",
        }}
      >
        {children}
      </body>
    </html>
  );
}
