import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import './globals.css';
import '@uploadthing/react/styles.css';
import ThemeProvider from '@/providers/theme-provider';

const dm_sans = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Plura',
  description: 'Website Builder and Team management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html suppressHydrationWarning lang='en'>
        <body className={dm_sans.className}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
