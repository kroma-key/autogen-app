import { LocaleTypes } from "@/lib/localization/setting";
import { StudyCafePageContent } from "./content";

interface PageProps {
  params: Promise<{
    locale: LocaleTypes;
  }>;
}

export default async function StudyCafePage({ params }: PageProps) {
  const { locale } = await params;
  return <StudyCafePageContent locale={locale} />;
}
