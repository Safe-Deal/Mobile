import am from "./locales/am.json";
import ar from "./locales/ar.json";
import bg from "./locales/bg.json";
import bn from "./locales/bn.json";
import ca from "./locales/ca.json";
import cs from "./locales/cs.json";
import da from "./locales/da.json";
import de from "./locales/de.json";
import el from "./locales/el.json";
import en from "./locales/en_US.json";
import en_AU from "./locales/en_AU.json";
import en_GB from "./locales/en_GB.json";
import en_US from "./locales/en_US.json";
import es from "./locales/es.json";
import es_419 from "./locales/es_419.json";
import et from "./locales/et.json";
import fa from "./locales/fa.json";
import fi from "./locales/fi.json";
import fil from "./locales/fil.json";
import fr from "./locales/fr.json";
import gu from "./locales/gu.json";
import he from "./locales/he.json";
import hi from "./locales/hi.json";
import hr from "./locales/hr.json";
import hu from "./locales/hu.json";
import id from "./locales/id.json";
import it from "./locales/it.json";
import ja from "./locales/ja.json";
import kn from "./locales/kn.json";
import ko from "./locales/ko.json";
import lt from "./locales/lt.json";
import lv from "./locales/lv.json";
import ml from "./locales/ml.json";
import mr from "./locales/mr.json";
import ms from "./locales/ms.json";
import nl from "./locales/nl.json";
import no from "./locales/no.json";
import pl from "./locales/pl.json";
import pt_BR from "./locales/pt_BR.json";
import pt_PT from "./locales/pt_PT.json";
import ro from "./locales/ro.json";
import ru from "./locales/ru.json";
import sk from "./locales/sk.json";
import sl from "./locales/sl.json";
import sr from "./locales/sr.json";
import sv from "./locales/sv.json";
import sw from "./locales/sw.json";
import ta from "./locales/ta.json";
import te from "./locales/te.json";
import th from "./locales/th.json";
import tr from "./locales/tr.json";
import uk from "./locales/uk.json";
import vi from "./locales/vi.json";
import zh_CN from "./locales/zh_CN.json";
import zh_TW from "./locales/zh_TW.json";

export const RESOURCES = {
	am,
	ar,
	bg,
	bn,
	ca,
	cs,
	da,
	de,
	el,
	en,
	en_AU,
	en_GB,
	en_US,
	es,
	es_419,
	et,
	fa,
	fi,
	fil,
	fr,
	gu,
	he,
	hi,
	hr,
	hu,
	id,
	it,
	ja,
	kn,
	ko,
	lt,
	lv,
	ml,
	mr,
	ms,
	nl,
	no,
	pl,
	pt_BR,
	pt_PT,
	ro,
	ru,
	sk,
	sl,
	sr,
	sv,
	sw,
	ta,
	te,
	th,
	tr,
	uk,
	vi,
	zh_CN,
	zh_TW,
};

export const RTL_LANGUAGES = ["ar", "he", "fa", "ur"];
export const LANGUAGES = [
	{ code: "am", name: "አማርኛ", enName: "Amharic", resource: am, intCode: 1 },
	{ code: "ar", name: "العربية", enName: "Arabic", resource: ar, intCode: 2 },
	{ code: "bg", name: "Български", enName: "Bulgarian", resource: bg, intCode: 3 },
	{ code: "bn", name: "বাংলা", enName: "Bengali", resource: bn, intCode: 4 },
	{ code: "ca", name: "Català", enName: "Catalan", resource: ca, intCode: 5 },
	{ code: "cs", name: "Čeština", enName: "Czech", resource: cs, intCode: 6 },
	{ code: "da", name: "Dansk", enName: "Danish", resource: da, intCode: 7 },
	{ code: "de", name: "Deutsch", enName: "German", resource: de, intCode: 8 },
	{ code: "el", name: "Ελληνικά", enName: "Greek", resource: el, intCode: 9 },
	{ code: "en", name: "English", enName: "English", resource: en, intCode: 10 },
	{ code: "en_AU", name: "English (Australia)", enName: "English (Australia)", resource: en_AU, intCode: 11 },
	{ code: "en_GB", name: "English (UK)", enName: "English (UK)", resource: en_GB, intCode: 12 },
	{ code: "en_US", name: "English (US)", enName: "English (US)", resource: en_US, intCode: 13 },
	{ code: "es", name: "Español", enName: "Spanish", resource: es, intCode: 14 },
	{ code: "es_419", name: "Español (Latinoamérica)", enName: "Spanish (Latin America)", resource: es_419, intCode: 15 },
	{ code: "et", name: "Eesti", enName: "Estonian", resource: et, intCode: 16 },
	{ code: "fa", name: "فارسی", enName: "Persian", resource: fa, intCode: 17 },
	{ code: "fi", name: "Suomi", enName: "Finnish", resource: fi, intCode: 18 },
	{ code: "fil", name: "Filipino", enName: "Filipino", resource: fil, intCode: 19 },
	{ code: "fr", name: "Français", enName: "French", resource: fr, intCode: 20 },
	{ code: "gu", name: "ગુજરાતી", enName: "Gujarati", resource: gu, intCode: 21 },
	{ code: "he", name: "עברית", enName: "Hebrew", resource: he, intCode: 22 },
	{ code: "hi", name: "हिन्दी", enName: "Hindi", resource: hi, intCode: 23 },
	{ code: "hr", name: "Hrvatski", enName: "Croatian", resource: hr, intCode: 24 },
	{ code: "hu", name: "Magyar", enName: "Hungarian", resource: hu, intCode: 25 },
	{ code: "id", name: "Bahasa Indonesia", enName: "Indonesian", resource: id, intCode: 26 },
	{ code: "it", name: "Italiano", enName: "Italian", resource: it, intCode: 27 },
	{ code: "ja", name: "日本語", enName: "Japanese", resource: ja, intCode: 28 },
	{ code: "kn", name: "ಕನ್ನಡ", enName: "Kannada", resource: kn, intCode: 29 },
	{ code: "ko", name: "한국어", enName: "Korean", resource: ko, intCode: 30 },
	{ code: "lt", name: "Lietuvių", enName: "Lithuanian", resource: lt, intCode: 31 },
	{ code: "lv", name: "Latviešu", enName: "Latvian", resource: lv, intCode: 32 },
	{ code: "ml", name: "മലയാളം", enName: "Malayalam", resource: ml, intCode: 33 },
	{ code: "mr", name: "मराठी", enName: "Marathi", resource: mr, intCode: 34 },
	{ code: "ms", name: "Bahasa Melayu", enName: "Malay", resource: ms, intCode: 35 },
	{ code: "nl", name: "Nederlands", enName: "Dutch", resource: nl, intCode: 36 },
	{ code: "no", name: "Norsk", enName: "Norwegian", resource: no, intCode: 37 },
	{ code: "pl", name: "Polski", enName: "Polish", resource: pl, intCode: 38 },
	{ code: "pt_BR", name: "Português (Brasil)", enName: "Portuguese (Brazil)", resource: pt_BR, intCode: 39 },
	{ code: "pt_PT", name: "Português (Portugal)", enName: "Portuguese (Portugal)", resource: pt_PT, intCode: 40 },
	{ code: "ro", name: "Română", enName: "Romanian", resource: ro, intCode: 41 },
	{ code: "ru", name: "Русский", enName: "Russian", resource: ru, intCode: 42 },
	{ code: "sk", name: "Slovenčina", enName: "Slovak", resource: sk, intCode: 43 },
	{ code: "sl", name: "Slovenščina", enName: "Slovenian", resource: sl, intCode: 44 },
	{ code: "sr", name: "Српски", enName: "Serbian", resource: sr, intCode: 45 },
	{ code: "sv", name: "Svenska", enName: "Swedish", resource: sv, intCode: 46 },
	{ code: "sw", name: "Kiswahili", enName: "Swahili", resource: sw, intCode: 47 },
	{ code: "ta", name: "தமிழ்", enName: "Tamil", resource: ta, intCode: 48 },
	{ code: "te", name: "తెలుగు", enName: "Telugu", resource: te, intCode: 49 },
	{ code: "th", name: "ไทย", enName: "Thai", resource: th, intCode: 50 },
	{ code: "tr", name: "Türkçe", enName: "Turkish", resource: tr, intCode: 51 },
	{ code: "uk", name: "Українська", enName: "Ukrainian", resource: uk, intCode: 52 },
	{ code: "vi", name: "Tiếng Việt", enName: "Vietnamese", resource: vi, intCode: 53 },
	{ code: "zh_CN", name: "中文 (简体)", enName: "Chinese (Simplified)", resource: zh_CN, intCode: 54 },
	{ code: "zh_TW", name: "中文 (繁體)", enName: "Chinese (Traditional)", resource: zh_TW, intCode: 55 },
];
