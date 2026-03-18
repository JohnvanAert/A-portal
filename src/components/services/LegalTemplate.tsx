import { Scale, ShieldAlert, FileSearch, Gavel, CheckCircle, FileText, Lock } from "lucide-react";

export function LegalTemplate({ id }: { id: string }) {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-6 items-center">
          <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600"><Scale size={32} /></div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Юридическое сопровождение</h1>
            <p className="text-slate-500">Минимизация рисков и защита интересов в строительных спорах</p>
          </div>
        </div>
        <div className="flex -space-x-3">
          {[1,2,3].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center text-xs font-bold">ЮР</div>)}
          <div className="w-12 h-12 rounded-full border-4 border-white bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">+5</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LegalCard icon={<ShieldAlert className="text-red-500" />} title="Анализ рисков" desc="Проверка договора на наличие «кабальных» условий" status="Выполнено" />
        <LegalCard icon={<FileSearch className="text-blue-500" />} title="Проверка контрагента" desc="Комплаенс-контроль и проверка на благонадежность" status="В процессе" />
        <LegalCard icon={<Gavel className="text-indigo-500" />} title="Арбитраж" desc="Подготовка претензий и исковых заявлений" status="Требует внимания" alert />
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 font-mono"><Lock size={20} className="text-slate-400" /> Реестр защищенных документов</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DocLink name="Договор субподряда (Шаблон)" date="15.03.2026" />
          <DocLink name="Доп. соглашение №4" date="12.03.2026" />
          <DocLink name="Протокол разногласий" date="10.03.2026" />
        </div>
      </div>
    </div>
  );
}

function LegalCard({ icon, title, desc, status, alert }: any) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed">{desc}</p>
      <div className={`text-[10px] font-black uppercase tracking-widest ${alert ? 'text-red-500' : 'text-slate-400'}`}>
        • {status}
      </div>
    </div>
  );
}

function DocLink({ name, date }: any) {
  return (
    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3 group cursor-pointer hover:bg-indigo-50 transition-colors">
      <FileText className="text-slate-300 group-hover:text-indigo-600" />
      <div>
        <div className="text-xs font-bold text-slate-800">{name}</div>
        <div className="text-[10px] text-slate-400">{date}</div>
      </div>
    </div>
  );
}