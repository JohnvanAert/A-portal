import { ShieldAlert, HardHat, ClipboardList, Zap, Flame, Microscope, CheckCircle } from "lucide-react";

const SAFETY_DATA: Record<string, any> = {
  "safety-training": {
    title: "Подготовка специалистов",
    desc: "Обучение и аттестация руководителей и работников в области промышленной безопасности.",
    icon: <HardHat size={32} />
  },
  "safety-expertise": {
    title: "Экспертиза промбезопасности",
    desc: "Проведение технического освидетельствования оборудования и экспертиза деклараций.",
    icon: <Microscope size={32} />
  },
  "gas-service": {
    title: "Техобслуживание газовых систем",
    desc: "Комплексное обслуживание газопотребляющих систем и котельного оборудования.",
    icon: <Zap size={32} />
  }
};

export function SafetyTemplate({ id }: { id: string }) {
  const content = SAFETY_DATA[id] || SAFETY_DATA["safety-training"];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
      <div className="bg-slate-900 rounded-[3rem] p-10 text-white flex flex-col md:flex-row justify-between items-center gap-8 border-b-8 border-red-600">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-xs">
            <ShieldAlert size={16} /> Промышленная безопасность
          </div>
          <h1 className="text-4xl font-black leading-tight">{content.title}</h1>
          <p className="text-slate-400 text-lg max-w-lg">{content.desc}</p>
        </div>
        <div className="p-8 bg-red-600 rounded-[2.5rem] shadow-2xl shadow-red-900/20">
          {content.icon}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SafetyCard title="Аттестат МЧС" text="Работаем на основании действующего аттестата комитета промышленной безопасности." />
        <SafetyCard title="Выезд специалиста" text="Технический осмотр объектов в любой точке Казахстана в течение 48 часов." />
        <SafetyCard title="Реестр" text="Внесение результатов экспертизы в государственные реестры РК." />
      </div>

      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold mb-8">Что входит в регламент проверки:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {["Визуально-измерительный контроль", "Ультразвуковая дефектоскопия", "Проверка автоматики безопасности", "Выдача технического заключения"].map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="mt-1 bg-green-100 p-1 rounded-full text-green-600"><CheckCircle size={16} /></div>
              <span className="font-bold text-slate-700">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SafetyCard({ title, text }: any) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-red-200 transition-all group">
      <div className="w-12 h-1 bg-red-600 mb-6 group-hover:w-24 transition-all" />
      <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
      <p className="text-sm text-slate-500 leading-relaxed">{text}</p>
    </div>
  );
}