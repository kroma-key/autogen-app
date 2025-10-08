import { createInstance, i18n, TFunction } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions, LocaleTypes } from "./setting";

const initI18next = async (lang: LocaleTypes, ns: string | string[]) => {
  const i18nInstance = createInstance();

  // 단일 네임스페이스 혹은 다중 네임스페이스 처리
  const namespaces = Array.isArray(ns) ? ns : [ns];

  // 네임스페이스 데이터를 동적으로 로드하는 함수
  const loadNamespaceData = async (
    language: string,
    namespace: string
  ): Promise<object> => {
    return import(`./locales/${language}/${namespace}.json`);
  };

  // resourcesToBackend를 다중 네임스페이스와 통합
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(async (language: string, namespace: string) => {
        if (namespaces.includes(namespace)) {
          return await loadNamespaceData(language, namespace);
        }
        throw new Error(`Namespace ${namespace} not found`);
      })
    )
    .init(getOptions(lang, namespaces));

  return i18nInstance;
};

export async function translation(
  lang: LocaleTypes,
  ns: string | string[]
): Promise<{
  t: TFunction<string[], undefined>;
  i18n: i18n;
}> {
  const i18nextInstance = await initI18next(lang, ns);
  return {
    t: i18nextInstance.getFixedT(lang, Array.isArray(ns) ? ns : [ns]),
    i18n: i18nextInstance, // 초기화된 인스턴스
  };
}
