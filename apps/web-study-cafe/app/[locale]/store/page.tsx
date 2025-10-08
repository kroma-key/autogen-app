import { LocaleTypes } from "@/lib/localization/setting";
import { StorePageContent } from "./content";

interface PageProps {
  params: Promise<{
    locale: LocaleTypes;
  }>;
}

export default async function StorePage({ params }: PageProps) {
  const { locale } = await params;
  return <StorePageContent locale={locale} />;
}
