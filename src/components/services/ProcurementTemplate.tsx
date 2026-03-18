import { ShoppingCart, Search, BarChart2, Globe, Target, Clock, ExternalLink , ArrowRight} from "lucide-react";

export function ProcurementTemplate({ id }: { id: string }) {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Hero: Поиск и Статистика */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 w-fit rounded-2xl text-blue-600"><ShoppingCart size={32} /></div>
            <h1 className="text-3xl font-bold text-slate-900">Мониторинг закупок: {id}</h1>
            <p className="text-slate-500 max-w-md">Автоматический поиск лотов на площадках Goszakup, Самрук-Казына и других порталах РК.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">Найдено лотов</p>
              <span className="text-3xl font-black text-slate-800">1,284</span>
            </div>
            <div className="bg-blue-600 p-6 rounded-3xl text-white">
              <p className="text-xs font-bold text-blue-200 uppercase mb-2">Ваш шанс</p>
              <span className="text-3xl font-black">82%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Воронка тендеров */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Target className="text-blue-600" /> Аналитика воронки</h3>
            <div className="space-y-4">
              <FunnelStep label="Опубликовано" value="450" width="w-full" color="bg-blue-500" />
              <FunnelStep label="Допущено" value="120" width="w-3/4" color="bg-blue-400" />
              <FunnelStep label="Победы" value="12" width="w-1/4" color="bg-green-500" />
            </div>
          </div>

          {/* Список актуальных лотов */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden">
            <div className="p-6 border-b font-bold">Актуальные объявления</div>
            <div className="divide-y divide-slate-100">
              <TenderItem title="Строительство школы на 600 мест" price="1.2 млрд ₸" date="До 25.03" />
              <TenderItem title="Капитальный ремонт моста" price="450 млн ₸" date="До 20.03" />
              <TenderItem title="Текущий ремонт офиса" price="15 млн ₸" date="До 18.03" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
            <h4 className="font-bold mb-6 flex items-center gap-2"><Globe size={18} /> Площадки</h4>
            <div className="space-y-3">
              {['goszakup.gov.kz', 'zakup.sk.kz', 'eep.mitwork.kz'].map(site => (
                <div key={site} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-sm">{site}</span>
                  <ExternalLink size={14} className="text-slate-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FunnelStep({ label, value, width, color }: any) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm font-bold">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} ${width} transition-all duration-1000`}></div>
      </div>
    </div>
  );
}

function TenderItem({ title, price, date }: any) {
  return (
    <div className="p-6 hover:bg-slate-50 transition-colors flex justify-between items-center">
      <div>
        <h4 className="font-bold text-slate-800">{title}</h4>
        <div className="flex gap-4 mt-1 text-xs text-slate-400 font-medium uppercase tracking-wider">
          <span className="flex items-center gap-1"><Clock size={12}/> {date}</span>
          <span>{price}</span>
        </div>
      </div>
      <button className="p-2 hover:bg-blue-100 rounded-lg text-blue-600 transition-colors"><ArrowRight size={20}/></button>
    </div>
  );
}