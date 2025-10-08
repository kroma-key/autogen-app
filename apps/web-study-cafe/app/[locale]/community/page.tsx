import { LocaleTypes } from "@/lib/localization/setting";
import { CommunityPageContent } from "./content";

interface PageProps {
  params: Promise<{
    locale: LocaleTypes;
  }>;
}

export default async function CommunityPage({ params }: PageProps) {
  const { locale } = await params;
  return <CommunityPageContent locale={locale} />;
}
