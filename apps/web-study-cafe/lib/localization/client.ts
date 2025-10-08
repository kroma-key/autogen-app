"use client";

import { useEffect } from "react";
import {
  initReactI18next,
  useTranslation as useTransAlias,
} from "react-i18next";
import { getOptions, locales, type LocaleTypes } from "./setting";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";

const runsOnServerSide = typeof window === "undefined";

i18next
  .use(initReactI18next) // React와 i18next 연결
  .use(LanguageDetector) // 언어 자동 감지 기능 활성화
  .use(
    resourcesToBackend((language: LocaleTypes, namespace: string) => {
      return import(`./locales/${language}/${namespace}.json`);
    })
  ) // 백엔드에서 언어 리소스 동적으로 불러오기
  .init({
    ...getOptions(),
    lng: undefined, // 클라이언트에서 언어를 감지하도록 설정
    detection: { order: ["path"] }, // 언어 감지 순서 설정
    preload: runsOnServerSide ? locales : [], // 서버에서 미리 로드할 언어 설정
  });

export function useTranslation(lng: LocaleTypes, ns: string | string[]) {
  const namespaceArray = Array.isArray(ns) ? ns : [ns]; // 배열로 통일
  const translator = useTransAlias(namespaceArray);
  const { i18n } = translator;

  if (runsOnServerSide && lng) {
    i18n.changeLanguage(lng);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!lng || i18n.resolvedLanguage === lng) return;
      i18n.changeLanguage(lng);
    }, [lng, i18n]);
  }

  return translator;
}

export default i18next;
