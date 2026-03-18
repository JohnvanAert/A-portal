import { 
  HardHat, Ruler, FileCheck, Layers, 
  FileSpreadsheet, ClipboardCheck, Construction, 
  ArrowRight, Download, History, FileText, Calculator, ShieldCheck
} from "lucide-react";

// Словарь уникального контента для каждой страницы ПТО
const PTO_CONTENT: Record<string, any> = {
  "build-basics": {
    title: "Основы строительства",
    badge: "Обучающий модуль",
    description: "Базовый курс по нормативно-технической документации РК, СНиП и стандартам качества.",
    features: [
      { icon: <Construction />, title: "Техпроцессы", text: "Изучение последовательности СМР" },
      { icon: <FileCheck />, title: "Нормативы", text: "Работа со СНиП и ГОСТ РК" }
    ],
    items: ["Введение в строительные нормы", "Виды исполнительной документации", "Основы охраны труда"]
  },
  "smetchik-course": {
    title: "Курс инженера-сметчика",
    badge: "Профессиональный рост",
    description: "Практическое обучение составлению смет в АВС-4, SANA и других программных комплексах.",
    features: [
      { icon: <Calculator />, title: "Ценообразование", text: "Расчет стоимости ресурсов" },
      { icon: <FileSpreadsheet />, title: "Программное ПО", text: "Освоение сметных программ" }
    ],
    items: ["Составление локальных смет", "Определение накладных расходов", "Ресурсный метод расчета"]
  },
  "smetchik-services": {
    title: "Услуги сметчика (Формы 2, 3)",
    badge: "Сервис",
    description: "Подготовка ежемесячных актов выполненных работ и справок о стоимости затрат.",
    features: [
      { icon: <ClipboardCheck />, title: "Форма №2", text: "Акты выполненных работ" },
      { icon: <FileText />, title: "Форма №3", text: "Справки о стоимости" }
    ],
    items: ["Закрытие объемов за месяц", "Сверка с технадзором", "Подготовка журналов работ"]
  },
  "acceptance-acts": {
    title: "Акты приемки объектов",
    badge: "Сдача объекта",
    description: "Полное сопровождение процесса ввода объекта в эксплуатацию и работа с госкомиссией.",
    features: [
      { icon: <ShieldCheck />, title: "Госприемка", text: "Подготовка к проверкам ГАСК" },
      { icon: <FileCheck />, title: "Декларации", text: "Оформление соответствия" }
    ],
    items: ["Сбор подписей всех сторон", "Подготовка техпаспорта", "Акт ввода в эксплуатацию"]
  }
};

export function PTOTemplate({ id }: { id: string }) {
  const content = PTO_CONTENT[id] || PTO_CONTENT["build-basics"];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header-блок */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-4">
            <span className="px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-xs font-black uppercase tracking-widest">
              {content.badge}
            </span>
            <h1 className="text-4xl font-black text-slate-900 leading-tight">
              {content.title}
            </h1>
            <p className="text-slate-500 max-w-xl text-lg">
              {content.description}
            </p>
          </div>
          <div className="p-8 bg-slate-50 rounded-4xl border border-slate-100">
            <HardHat size={48} className="text-amber-500" />
          </div>
        </div>
        {/* Декоративная сетка на фоне */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -mr-20 -mt-20 blur-3xl opacity-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Левая колонка: Основные инструменты */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.features.map((f: any, i: number) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-xl hover:shadow-blue-50 transition-all group">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>

          {/* Чек-лист этапов */}
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white">
            <h3 className="text-xl font-bold mb-8">План реализации модуля</h3>
            <div className="space-y-6">
              {content.items.map((item: string, i: number) => (
                <div key={i} className="flex items-center gap-4 group cursor-default">
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-xs font-bold group-hover:bg-amber-500 group-hover:border-amber-500 transition-all">
                    {i + 1}
                  </div>
                  <span className="text-slate-300 group-hover:text-white transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Правая колонка: Действия и История */}
        <div className="space-y-6">
          <div className="bg-blue-600 rounded-[3rem] p-8 text-white shadow-2xl shadow-blue-200 text-center">
            <h4 className="text-lg font-bold mb-2">Начать работу</h4>
            <p className="text-blue-100 text-sm mb-6">Сформируйте первый пакет документов за 5 минут</p>
            <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-sm hover:scale-105 transition-transform flex items-center justify-center gap-2">
              Запустить сервис <ArrowRight size={18} />
            </button>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <History size={18} className="text-slate-400" /> Последние файлы
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center group cursor-pointer hover:border-blue-300">
                <span className="text-xs font-bold text-slate-600">Шаблон_Акт_Скрытых.docx</span>
                <Download size={16} className="text-slate-400 group-hover:text-blue-600" />
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center group cursor-pointer hover:border-blue-300">
                <span className="text-xs font-bold text-slate-600">Журнал_работ_2026.xlsx</span>
                <Download size={16} className="text-slate-400 group-hover:text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}