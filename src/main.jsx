import React from 'react';
import { createRoot } from 'react-dom/client';
import '../app/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/components/language-provider';
import Home from '@/app/page';
// Apply base classes that were in Next RootLayout
try {
    document.documentElement.lang = 'en';
    document.body.classList.add('font-sans', 'antialiased');
}
catch (_a) { }
const root = createRoot(document.getElementById('root'));
root.render(<React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <LanguageProvider defaultLanguage="en">
        <Home />
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>);
