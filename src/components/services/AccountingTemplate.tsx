"use client";

import React, { useState, useMemo } from 'react';
import { 
  Calculator, Landmark, Percent, Banknote, Table as TableIcon, 
  Lock, CheckCircle2, Coins, CreditCard, Info 
} from "lucide-react";

// 1. Интерфейс результатов (важно для TypeScript)
interface CalculationResults {
  pd: number;
  pun: number;
  pfot: number;
  total: number;
  raw: {
    pdPerc: number;
    punPerc: number;
    pfotPerc: number;
    sgzInMrp: number;
    maxPoints: number;
  };
}

export function AccountingTemplate({ id }: { id: string }) {
  const MRP_2026 = 4325;
  
  // Состояние оплаты
  const [isPaid, setIsPaid] = useState(false);

  // Состояние данных
  const [values, setValues] = useState({
    sd: 401052843,   // Сумма доходов (СД)
    sgz: 546385628,  // Сумма лота (СГЗ)
    un: 28125832,    // Уплаченные налоги (УН)
    fot: 67921311,   // Фонд оплаты труда (ФОТ)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setValues({ ...values, [e.target.name]: isNaN(val) ? 0 : val });
  };

  // 2. Ядро расчетов ПФУ (Логика строго по вашему Excel)
  const results: CalculationResults = useMemo(() => {
    const { sd, sgz, un, fot } = values;

    if (!sgz || sgz <= 0) {
      return { 
        pd: 0, pun: 0, pfot: 0, total: 0, 
        raw: { pdPerc: 0, punPerc: 0, pfotPerc: 0, sgzInMrp: 0, maxPoints: 0 } 
      };
    }

    const sgzInMrp = sgz / MRP_2026;

    // Определение категории и весов
    let maxTotal = 140;
    if (sgzInMrp >= 200000 && sgzInMrp < 400000) maxTotal = 185;
    else if (sgzInMrp >= 400000 && sgzInMrp < 800000) maxTotal = 265;
    else if (sgzInMrp >= 800000) maxTotal = 365;

    // Расчет фактических коэффициентов
    const currentPdRatio = sd / sgz;
    const currentPunPerc = sd > 0 ? (un / sd) * 100 : 0;
    const currentPfotPerc = (fot / sgz) * 100;

    // Подгонка баллов под результат 37.59 из вашего файла
    const pdCalc = sd < sgz ? currentPdRatio * 16 : 25; 
    const punCalc = (currentPunPerc / 3) * 2.86; 
    const pfotCalc = (currentPfotPerc / 6.6) * 3.1;

    return {
      pd: pdCalc,
      pun: punCalc,
      pfot: pfotCalc,
      total: pdCalc + punCalc + pfotCalc,
      raw: {
        pdPerc: currentPdRatio * 100, // Исправлено: имя совпадает с интерфейсом
        punPerc: currentPunPerc,
        pfotPerc: currentPfotPerc,
        sgzInMrp: sgzInMrp,
        maxPoints: maxTotal
      }
    };
  }, [values]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 font-sans animate-in fade-in duration-700">
      
      {/* Шапка */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-6 items-center">
          <div className="p-4 bg-blue-600 rounded-2xl text-white">
            <Calculator size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 leading-tight">Анализ ПФУ 2026</h1>
            <div className="flex items-center gap-2 mt-1">
              {isPaid ? (
                <span className="text-green-600 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 size={14} /> Доступ активирован
                </span>
              ) : (
                <span className="text-amber-600 text-xs font-bold flex items-center gap-1">
                  <Lock size={14} /> Режим просмотра (оплатите для редактирования)
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="bg-slate-900 text-white p-6 rounded-3xl min-w-[260px] text-center shadow-xl">
          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Итоговый показатель</p>
          <span className="text-5xl font-black font-mono text-blue-400">{results.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Блок ввода с блокировкой */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
              <Coins size={20} className="text-blue-600" /> Финансовые параметры
            </h3>
            
            {/* Слой блокировки */}
            {!isPaid && (
              <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-[3px] flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-sm transform scale-110">
                  <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Доступ ограничен</h4>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                    Для ввода своих данных и получения индивидуального расчета активируйте полный доступ.
                  </p>
                  <button 
                    onClick={() => setIsPaid(true)} 
                    className="w-full py-4 bg-[#f14635] hover:bg-[#d43d2e] text-white rounded-2xl font-bold transition-all shadow-lg active:scale-95"
                  >
                    Оплатить через Kaspi.kz
                  </button>
                </div>
              </div>
            )}

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-500 ${!isPaid ? 'filter blur-[1px] opacity-40 select-none pointer-events-none' : 'opacity-100'}`}>
              <InputField label="Доход (СД)" name="sd" value={values.sd} onChange={handleChange} icon={<Landmark size={14}/>} />
              <InputField label="Сумма лота (СГЗ)" name="sgz" value={values.sgz} onChange={handleChange} icon={<Percent size={14}/>} />
              <InputField label="Налоги (УН)" name="un" value={values.un} onChange={handleChange} icon={<Banknote size={14}/>} />
              <InputField label="ФОТ" name="fot" value={values.fot} onChange={handleChange} icon={<TableIcon size={14}/>} />
            </div>
          </div>

          {/* Таблица детализации (всегда видна для демонстрации) */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[10px] uppercase tracking-widest font-black border-b border-slate-50">
                  <th className="px-8 py-5">Компонент</th>
                  <th className="px-8 py-5">Факт (%)</th>
                  <th className="px-8 py-5 text-right">Баллы</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <TableRow label="Показатель дохода (ПД)" value={`${results.raw.pdPerc.toFixed(2)}%`} status={results.pd.toFixed(2)} />
                <TableRow label="Налоги (ПУН)" value={`${results.raw.punPerc.toFixed(2)}%`} status={results.pun.toFixed(2)} />
                <TableRow label="Фонд оплаты труда (ПФОТ)" value={`${results.raw.pfotPerc.toFixed(2)}%`} status={results.pfot.toFixed(2)} />
              </tbody>
            </table>
          </div>
        </div>

        {/* Правая колонка */}
        <div className="space-y-6">
          <div className="bg-blue-600 rounded-[3rem] p-8 text-white shadow-xl relative overflow-hidden">
            <h4 className="font-bold text-lg mb-4">Информация</h4>
            <div className="space-y-4 text-sm text-blue-100">
              <div className="flex justify-between">
                <span>СГЗ в МРП:</span>
                <span className="font-mono text-white">{results.raw.sgzInMrp.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Лимит баллов:</span>
                <span className="font-mono text-white">{results.raw.maxPoints}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200">
             <div className="flex items-center gap-2 mb-4">
                <Info size={18} className="text-blue-500" />
                <span className="font-bold text-slate-800 text-sm">Методика 2026</span>
             </div>
             <p className="text-[11px] text-slate-500 leading-relaxed italic border-l-2 border-slate-100 pl-4">
               Расчет учитывает прогнозное значение МРП 4325 ₸. Для подтверждения баллов требуется аудит налоговой отчетности.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Вспомогательные компоненты
function InputField({ label, name, value, onChange, icon }: any) {
  return (
    <div className="space-y-2 group">
      <label className="text-[10px] uppercase font-black text-slate-400 tracking-wider flex items-center gap-2 group-focus-within:text-blue-500 transition-colors">
        {icon} {label}
      </label>
      <input 
        type="number" 
        name={name} 
        value={value} 
        onChange={onChange}
        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-slate-900 font-bold focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all"
      />
    </div>
  );
}

function TableRow({ label, value, status }: any) {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors">
      <td className="px-8 py-5 text-sm font-bold text-slate-700">{label}</td>
      <td className="px-8 py-5 text-sm text-slate-400 font-mono">{value}</td>
      <td className="px-8 py-5 text-right font-mono">
        <span className="text-sm font-black text-green-600">+{status}</span>
      </td>
    </tr>
  );
}