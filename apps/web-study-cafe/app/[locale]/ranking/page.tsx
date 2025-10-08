import { LocaleTypes } from "@/lib/localization/setting";
import { RankingPageContent } from "./content";

interface PageProps {
  params: Promise<{
    locale: LocaleTypes;
  }>;
}

export default async function RankingPage({ params }: PageProps) {
  const { locale } = await params;
  return <RankingPageContent locale={locale} />;
}
