import { Award, FileCheck, Landmark, ShieldCheck, ChevronRight, Download } from "lucide-react";

const LICENSE_DATA: Record<string, any> = {
  "cat-1-2-3": {
    title: "Получение строительных лицензий",
    subtitle: "Сопровождение ГАСК (1, 2, 3 категории)",
    desc: "Полный комплекс услуг по подготовке документов для получения или повышения категории государственной лицензии на СМР и проектирование.",
    steps: ["Аудит штата инженеров", "Проверка материально-технической базы", "Формирование пакета в e-license.kz"],
    requirements: [
      { label: "Состав ИТР", value: "от 2 до 20 чел." },
      { label: "Опыт работы", value: "от 5 до 10 лет" },
      { label: "Тех. база", value: "Собственная/Аренда" }
    ]
  }
};

export function LicenseTemplate({ id }: { id: string }) {
  const content = LICENSE_DATA[id] || LICENSE_DATA["cat-1-2-3"];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Шапка с эффектом золотой печати */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
        <div className="space-y-4 z-10">
          <div className="flex items-center gap-3 text-blue-600 font-bold uppercase tracking-tighter text-sm">
            <Landmark size={18} /> Государственная услуга РК
          </div>
          <h1 className="text-4xl font-black text-slate-900 leading-none">{content.title}</h1>
          <p className="text-slate-500 text-lg max-w-lg">{content.desc}</p>
        </div>
        <div className="relative z-10 bg-linear-to-br from-amber-400 to-amber-600 p-8 rounded-[3rem] shadow-xl shadow-amber-100 text-white">
          <Award size={64} strokeWidth={1.5} />
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-slate-50 rounded-full blur-3xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ShieldCheck className="text-green-500" /> Квалификационные требования
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {content.requirements.map((req: any, i: number) => (
                <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{req.label}</p>
                  <p className="text-lg font-bold text-slate-800">{req.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
            <h3 className="text-xl font-bold mb-6">Этапы получения через e-license</h3>
            <div className="space-y-4">
              {content.steps.map((step: string, i: number) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">{i+1}</span>
                  <span className="text-slate-300">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm h-fit">
          <h4 className="font-bold mb-6">Необходимые документы</h4>
          <div className="space-y-3">
             {["Уставные документы", "Дипломы специалистов", "Договора аренды техники"].map(doc => (
               <div key={doc} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl text-xs font-bold text-slate-600">
                 {doc} <Download size={14} className="text-slate-400" />
               </div>
             ))}
          </div>
          <button className="w-full mt-8 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-100">
            Оставить заявку
          </button>
        </div>
      </div>
    </div>
  );
}