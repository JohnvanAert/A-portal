import { AccountingTemplate } from "@/components/services/AccountingTemplate";
import { PTOTemplate } from "@/components/services/PTOTemplate";
import { ProcurementTemplate } from "@/components/services/ProcurementTemplate"; // Импорт
import { LegalTemplate } from "@/components/services/LegalTemplate"; // Импорт
// ... остальные импорты
import { LicenseTemplate } from "@/components/services/LicenseTemplate";
import { SafetyTemplate } from "@/components/services/SafetyTemplate";

const CATEGORIES = {
  accounting: ["fin-consult", "fin-calc", "fin-forecast", "pfu-calc"],
  pto: ["build-basics", "smetchik-course", "smetchik-services", "acceptance-acts"],
  procurement: ["goszakup", "samruk", "eep", "exp-registry"],
  legal: ["contract-signing", "client-comm", "legal-claims"],
  license: ["cat-1-2-3"], // Добавили
  safety: ["safety-training", "safety-expertise", "gas-service"], // Добавили
};

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (CATEGORIES.accounting.includes(id)) return <AccountingTemplate id={id} />;
  if (CATEGORIES.pto.includes(id)) return <PTOTemplate id={id} />;
  if (CATEGORIES.procurement.includes(id)) return <ProcurementTemplate id={id} />;
  if (CATEGORIES.legal.includes(id)) return <LegalTemplate id={id} />;
  if (CATEGORIES.license.includes(id)) return <LicenseTemplate id={id} />; // Условие
  if (CATEGORIES.safety.includes(id)) return <SafetyTemplate id={id} />; // Условие

  return <div className="p-20 text-center font-bold">Страница в разработке...</div>;
}