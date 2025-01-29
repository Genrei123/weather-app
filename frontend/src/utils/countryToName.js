import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

// const getCountryName = (countryCode) => countries.getName(countryCode, "en") || countryCode;


export function countryToName(countryCode) {
    // const codePoints = countryCode
    //   .toUpperCase()
    //   .split('')
    //   .map(char => 127397 + char.charCodeAt(0));
    // return String.fromCodePoint(...codePoints);
    const getCountryName = (countryCode) => countries.getName(countryCode, "en") || countryCode;
    return getCountryName(countryCode);
  }
  