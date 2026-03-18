import { 
  Calculator, TrendingUp, Table as TableIcon, 
  Download, AlertCircle, CheckCircle2, FileText,
  Info, ArrowRight, PieChart, Banknote
} from "lucide-react";

export function AccountingTemplate({ id }: { id: string }) {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* 1. Верхний информационный блок */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-6 items-center">
          <div className="p-4 bg-green-50 rounded-2xl text-green-600">
            <Calculator size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Бухгалтерский анализ: {id}</h1>
            <p className="text-slate-500">Автоматизированная проверка финансовых показателей компании</p>
          </div>
        </div>
        <div className="bg-slate-900 text-white p-6 rounded-3xl min-w-[220px] shadow-xl">
          <p className="text-xs text-slate-400 uppercase font-black tracking-widest mb-1 text-center">Статус ПФУ</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl font-black text-green-400 font-mono">4.82</span>
            <div className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded-md border border-green-500/30 font-bold uppercase">Safe</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* 2. Детализированный график налогов */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-600" /> 
                Динамика налоговой нагрузки (млн ₸)
              </h3>
              <div className="flex gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">2025</span>
              </div>
            </div>
            <div className="h-56 flex items-end gap-3 px-2">
              {[35, 65, 42, 88, 55, 75, 95, 68, 82, 58, 72, 90].map((h, i) => (
                <div key={i} className="flex-1 bg-slate-50 rounded-t-xl relative group">
                  <div 
                    style={{ height: `${h}%` }} 
                    className="bg-blue-500 rounded-t-xl group-hover:bg-blue-600 transition-all cursor-help relative"
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20 whitespace-nowrap">
                      {h} 250 000 ₸
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] text-slate-400 font-bold uppercase px-2">
              <span>Янв</span><span>Мар</span><span>Май</span><span>Июл</span><span>Сен</span><span>Ноя</span>
            </div>
          </div>

          {/* 3. Детализация данных (Таблица) */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <TableIcon size={20} className="text-slate-400" />
                Расшифровка финансовой устойчивости
              </h3>
              <button className="text-blue-600 text-xs font-black uppercase flex items-center gap-2 tracking-widest border border-blue-100 px-4 py-2 rounded-xl hover:bg-blue-50 transition-all">
                <Download size={14} /> Отчет PDF
              </button>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[10px] uppercase tracking-widest font-black border-b border-slate-50">
                  <th className="px-8 py-5">Наименование показателя</th>
                  <th className="px-8 py-5">Значение</th>
                  <th className="px-8 py-5">Статус допуска</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <TableRow label="Доходы за последние 3 года" value="2.45 млрд ₸" status="Проходит" />
                <TableRow label="Суммарные налоговые отчисления" value="48.5 млн ₸" status="Проходит" />
                <TableRow label="Фонд оплаты труда (средний)" value="12.2 млн ₸" status="В норме" />
                <TableRow label="Оборотные активы" value="184.0 млн ₸" status="Требует внимания" alert />
                <TableRow label="Задолженность по налогам" value="0.00 ₸" status="Чисто" />
              </tbody>
            </table>
          </div>
        </div>

        {/* Правая колонка: Аналитика и действия */}
        <div className="space-y-6">
          <div className="bg-blue-600 rounded-[3rem] p-8 text-white shadow-xl shadow-blue-100">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Banknote size={20} /> Прогноз на тендер
            </h4>
            <p className="text-blue-100 text-sm mb-6 leading-relaxed">
              С текущим баллом 4.82 вы можете претендовать на участие в лотах до <strong>500 млн ₸</strong> без дополнительного обеспечения.
            </p>
            <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all">
              Вызвать бухгалтера
            </button>
          </div>

          {/* Инфо-блок с формулой */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200">
            <div className="flex items-center gap-2 mb-4 text-slate-800">
              <Info size={18} className="text-blue-500" />
              <h4 className="font-bold">Как считается ПФУ?</h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed italic border-l-2 border-slate-100 pl-4">
              "ПФУ = (Налоги / Доходы) * Коэффициент категории. Для строительного сектора важным является порог в 4% от общего оборота."
            </p>
          </div>

          {/* Документы для загрузки */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-6">Архив документов</h4>
            <div className="space-y-3">
              <FileItem title="Форма 100.00 (2024)" size="1.2 MB" />
              <FileItem title="Выписка лицевого счета" size="0.8 MB" />
              <FileItem title="Регистр по налогам" size="2.5 MB" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Вспомогательные компоненты
function TableRow({ label, value, status, alert }: any) {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      <td className="px-8 py-5 text-sm font-bold text-slate-700">{label}</td>
      <td className="px-8 py-5 text-sm text-slate-500 font-mono">{value}</td>
      <td className="px-8 py-5">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
          alert ? "bg-amber-100 text-amber-600" : "bg-green-100 text-green-600"
        }`}>
          {alert ? <AlertCircle size={12} /> : <CheckCircle2 size={12} />}
          {status}
        </span>
      </td>
    </tr>
  );
}

function FileItem({ title, size }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 cursor-pointer transition-all group">
      <div className="flex items-center gap-3">
        <FileText size={20} className="text-slate-400 group-hover:text-blue-600" />
        <span className="text-[10px] font-bold text-slate-700 truncate max-w-[140px]">{title}</span>
      </div>
      <span className="text-[9px] text-slate-400 font-black">{size}</span>
    </div>
  );
}