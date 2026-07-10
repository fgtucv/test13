import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { buildTable } from "../build/buildTabel";
import { data } from "../data/compliteDataToCanculate.js";
import { calculated } from "./calculateResult.js";

// Імпортуємо файли перекладів
import ukTranslation from '../../langues/uk.json';
import enTranslation from '../../langues/en.json';

export let currentLengues;

export function formatNumber(value) {
  const currentLang = i18next.language || 'uk';
  const locale = currentLang.substring(0, 2) === 'uk' ? 'uk-UA' : 'en-US';
  return Number(value).toLocaleString(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}

const resources = {
  uk: { translation: ukTranslation },
  en: { translation: enTranslation }
};

i18next
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  })
  .then(() => {
    updateContent();
    // Викликаємо кастомну подію, щоб інші файли знали, що мова завантажилась
    document.dispatchEvent(new CustomEvent('i18n:ready', { detail: i18next.language.substring(0, 2) }));
  });

export function changeSiteLanguage(lng) {
    currentLengues = lng;
  return i18next.changeLanguage(lng).then(() => {
    updateContent();
    const result = calculated(data);
    buildTable(result.yearlyHistory);
    document.dispatchEvent(new CustomEvent('i18n:languageChanged', { detail: lng }));
  });
}

export function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    
    if (key.startsWith('[')) {
      const parts = key.split(']');
      const attr = parts[0].substring(1);
      const realKey = parts[1];
      element.setAttribute(attr, i18next.t(realKey));
    } else {
      if (element.hasAttribute('data-i18n-options')) {
        const options = JSON.parse(element.getAttribute('data-i18n-options'));
        element.innerText = i18next.t(key, options);
      } else {
        element.innerText = i18next.t(key);
      }
    }
  });
}

export default i18next;