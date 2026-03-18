"use client";
import { useState } from "react";
import { 
  LayoutDashboard, Calculator, ShoppingCart, 
  HardHat, Scale, FileBadge, ShieldCheck, ChevronDown 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Превращаем строки в объекты, чтобы у каждого был свой уникальный путь (slug)
const menuStructure = [
  { id: 'dashboard', icon: LayoutDashboard, name: "Дашборд", href: "/" },
  { 
    id: 'accounting', 
    icon: Calculator, 
    name: "Бухгалтерия", 
    items: [
      { name: "Консультация по фин. устойчивости", slug: "fin-consult" },
      { name: "Расчет финансовой устойчивости", slug: "fin-calc" },
      { name: "Прогноз устойчивости на 3 года", slug: "fin-forecast" },
      { name: "Расчет показателя ПФУ", slug: "pfu-calc" }
    ] 
  },
  { 
    id: 'procurement', 
    icon: ShoppingCart, 
    name: "Закупки", 
    items: [
      { name: "Госзакупки (goszakup.gov.kz)", slug: "goszakup" },
      { name: "Самрук-Казына (zakup.sk.kz)", slug: "samruk" },
      { name: "Евразийский портал (eep.mitwork.kz)", slug: "eep" },
      { name: "Реестр опыта работы", slug: "exp-registry" }
    ] 
  },
  { 
    id: 'pto', 
    icon: HardHat, 
    name: "ПТО", 
    items: [
      { name: "Основы строительства", slug: "build-basics" },
      { name: "Курс инженера-сметчика", slug: "smetchik-course" },
      { name: "Услуги сметчика (Формы 2, 3)", slug: "smetchik-services" },
      { name: "Акты приемки объектов", slug: "acceptance-acts" }
    ] 
  },
  { 
    id: 'legal', 
    icon: Scale, 
    name: "Юридическая часть", 
    items: [
      { name: "Подписание договоров", slug: "contract-signing" },
      { name: "Коммуникация с заказчиками", slug: "client-comm" },
      { name: "Претензионно-исковая работа", slug: "legal-claims" }
    ] 
  },
  { 
    id: 'licensing', 
    icon: FileBadge, 
    name: "Лицензирование", 
    items: [
      { name: "Категории 1, 2, 3", slug: "license-categories" }
    ] 
  },
  { 
    id: 'safety', 
    icon: ShieldCheck, 
    name: "Промбезопасность", 
    items: [
      { name: "Подготовка специалистов", slug: "safety-training" },
      { name: "Экспертиза безопасности", slug: "safety-expert" },
      { name: "Техобслуживание газовых систем", slug: "gas-service" }
    ] 
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const toggleMenu = (id: string) => {
    setOpenMenus(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <aside className="w-72 h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 overflow-y-auto z-50">
      <div className="p-6 text-2xl font-bold text-blue-600 border-b border-slate-50">
        Help Construction
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {menuStructure.map((menu) => (
          <div key={menu.id}>
            {menu.items ? (
              <>
                <button 
                  onClick={() => toggleMenu(menu.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-medium ${
                    openMenus.includes(menu.id) ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <menu.icon size={20} />
                    <span>{menu.name}</span>
                  </div>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${openMenus.includes(menu.id) ? "rotate-180" : ""}`} />
                </button>

                {/* Подпункты теперь используют Link */}
                <div className={`ml-9 mt-1 space-y-1 border-l-2 border-slate-100 pl-4 overflow-hidden transition-all duration-300 ${
                  openMenus.includes(menu.id) ? "max-h-96 opacity-100 py-1" : "max-h-0 opacity-0"
                }`}>
                  {menu.items.map((item) => (
                    <Link 
                      key={item.slug} 
                      href={`/services/${item.slug}`}
                      className={`block py-2 text-sm transition-colors ${
                        pathname === `/services/${item.slug}` 
                        ? "text-blue-600 font-semibold" 
                        : "text-slate-500 hover:text-blue-600"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link 
                href={menu.href!}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  pathname === menu.href ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <menu.icon size={20} />
                <span>{menu.name}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}