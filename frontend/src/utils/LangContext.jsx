import { createContext, useEffect, useState } from 'react';

export const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const DEFAULT_LANG = 'en';

  const savedLang = localStorage.getItem('lang') || DEFAULT_LANG;

  const [lang, setLang] = useState(savedLang);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(`http://localhost:5000/api/lang/${lang}`)
      .then((res) => {
        if (!res.ok) throw new Error('Language fetch failed');
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;

        // 🔒 STRICT schema validation
        const requiredKeys = [
          'nav',
          'footer',
          'hero',
          'about',
          'objectives',
          'contact',
          'queries'
        ];

        const missing = requiredKeys.filter((key) => !data[key]);

        if (missing.length > 0) {
          throw new Error(
            `Invalid language schema. Missing: ${missing.join(', ')}`
          );
        }

        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('[LangContext]', err);

        if (lang !== DEFAULT_LANG) {
          localStorage.setItem('lang', DEFAULT_LANG);
          setLang(DEFAULT_LANG);
        } else {
          // Even English failed → app is broken, stop rendering
          setContent(null);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [lang]);

  const changeLang = (newLang) => {
    if (newLang === lang) return;
    localStorage.setItem('lang', newLang);
    setLang(newLang);
  };

  return (
    <LangContext.Provider
      value={{
        lang,
        content,
        loading,
        changeLang
      }}
    >
      {children}
    </LangContext.Provider>
  );
};
