import { redirect } from "next/navigation";
import { fallbackLng } from "@/lib/localization/setting";

export default function RootPage() {
  redirect(`/${fallbackLng}`);
}
