"use client";

import React, { useState, useMemo } from 'react';
import { 
  Calculator, TrendingUp, Table as TableIcon, 
  Download, AlertCircle, CheckCircle2, FileText,
  Info, Banknote, Coins, Percent, Landmark
} from "lucide-react";

// Интерфейс для типизации расчетов
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
  };
}

export function AccountingTemplate({ id }: { id: string }) {
  // Константы из ваших расчетов
  const MRP_2026 = 4325;

  // 1. Состояние для входных данных
  const [values, setValues] = useState({
    sd: 2450000000, // Сумма дохода (СД)
    sgz: 500000000, // Сумма закупки (СГЗ)
    un: 48500000,   // Уплаченные налоги (УН)
    fot: 12200000,  // Фонд оплаты труда (ФОТ)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setValues({ ...values, [e.target.name]: isNaN(val) ? 0 : val });
  };

  // 2. Логика расчета ПФУ (строго по Excel)
  const results: CalculationResults = useMemo(() => {
    const { sd, sgz, un, fot } = values;

    if (!sgz || sgz <= 0) {
      return {
        pd: 0, pun: 0, pfot: 0, total: 0,
        raw: { pdPerc: 0, punPerc: 0, pfotPerc: 0, sgzInMrp: 0 }
      };
    }

    // --- Расчет ПД (Показатель дохода по категориям СГЗ) ---
    const sgzInMrp = sgz / MRP_2026;
    let pdBase = 0;
    if (sgzInMrp < 200000) pdBase = 25;
    else if (sgzInMrp < 400000) pdBase = 50;
    else if (sgzInMrp < 800000) pdBase = 100;
    else if (sgzInMrp < 1600000) pdBase = 200;
    else if (sgzInMrp < 3200000) pdBase = 500;
    else pdBase = 700;

    // --- Расчет ПУН (Налоги) ---
    // Формула: ((УН / СД * 100) - 3%) / 0.1% * 0.5
    const punPerc = sd > 0 ? (un / sd) * 100 : 0;
    const punExcess = punPerc - 3.0;
    const punPoints = (punExcess / 0.1) * 0.5;

    // --- Расчет ПФОТ (Зарплаты) ---
    // Формула: ((ФОТ / СГЗ * 100) - 6.6%) / 0.1% * 0.1
    const pfotPerc = (fot / sgz) * 100;
    const pfotExcess = pfotPerc - 6.6;
    const pfotPoints = (pfotExcess / 0.1) * 0.1;

    return {
      pd: pdBase,
      pun: punPoints,
      pfot: pfotPoints,
      total: pdBase + punPoints + pfotPoints,
      raw: {
        pdPerc: pdBase, // Здесь фиксированный балл
        punPerc: punPerc,
        pfotPerc: pfotPerc,
        sgzInMrp: sgzInMrp
      }
    };
  }, [values]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 p-4">
      
      {/* 1. Верхний информационный блок */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-6 items-center">
          <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
            <Calculator size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 leading-tight">Анализ ПФУ: {id}</h1>
            <p className="text-slate-500 text-sm">Расчет по методике 2026 года (МРП: {MRP_2026} ₸)</p>
          </div>
        </div>
        <div className="bg-slate-900 text-white p-6 rounded-3xl min-w-[240px] shadow-xl text-center border-t border-white/10">
          <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Итоговый показатель ПФУ</p>
          <div className="flex items-center justify-center gap-2">
            <span className={`text-4xl font-black font-mono ${results.total >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {results.total.toFixed(2)}
            </span>
            <div className="text-[10px] bg-white/10 px-2 py-1 rounded-md border border-white/20 font-bold">
              {results.total > 15 ? 'HIGH' : 'MID'}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* 2. Блок ввода данных */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
              <Coins size={20} className="text-blue-600" /> Финансовые параметры
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Доход за 3 года (СД)" name="sd" value={values.sd} onChange={handleChange} icon={<Landmark size={14}/>} />
              <InputField label="Сумма лота (СГЗ)" name="sgz" value={values.sgz} onChange={handleChange} icon={<Percent size={14}/>} />
              <InputField label="Уплаченные налоги (УН)" name="un" value={values.un} onChange={handleChange} icon={<Banknote size={14}/>} />
              <InputField label="Фонд оплаты труда (ФОТ)" name="fot" value={values.fot} onChange={handleChange} icon={<TableIcon size={14}/>} />
            </div>
            <div className="mt-6 p-4 bg-slate-50 rounded-2xl flex justify-between items-center border border-slate-100">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Текущая нагрузка в МРП</span>
                <span className="text-sm font-bold text-slate-700 font-mono">{results.raw.sgzInMrp.toLocaleString()} МРП</span>
            </div>
          </div>

          {/* 3. Таблица детализации */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                <TrendingUp size={20} className="text-slate-400" />
                Расшифровка баллов
              </h3>
              <div className="text-[10px] font-bold text-slate-400 bg-white px-3 py-1.5 rounded-lg border border-slate-200 uppercase tracking-tighter">
                Пороги: ПУН 3% | ПФОТ 6.6%
              </div>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[10px] uppercase tracking-widest font-black border-b border-slate-50">
                  <th className="px-8 py-5">Компонент</th>
                  <th className="px-8 py-5">Факт (%)</th>
                  <th className="px-8 py-5 text-right">Начислено</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <TableRow 
                  label="Показатель дохода (ПД)" 
                  value="Категория" 
                  status={results.pd.toFixed(0)}
                  isPositive={true} 
                />
                <TableRow 
                  label="Налоги (ПУН)" 
                  value={`${results.raw.punPerc.toFixed(2)}%`} 
                  status={results.pun.toFixed(2)}
                  isPositive={results.pun >= 0}
                />
                <TableRow 
                  label="Фонд оплаты труда (ПФОТ)" 
                  value={`${results.raw.pfotPerc.toFixed(2)}%`} 
                  status={results.pfot.toFixed(2)}
                  isPositive={results.pfot >= 0}
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* Правая колонка */}
        <div className="space-y-6">
          <div className="bg-blue-600 rounded-[3rem] p-8 text-white shadow-xl shadow-blue-200/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Banknote size={120} />
            </div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 relative z-10">
               Прогноз участия
            </h4>
            <p className="text-blue-50 text-sm mb-6 leading-relaxed relative z-10">
              С итоговым баллом <strong className="text-white">{results.total.toFixed(2)}</strong> ваш ПФУ оценивается как 
              {results.total > 15 ? " отличный." : " требующий оптимизации."} Для лота {values.sgz.toLocaleString()} ₸ вы 
              {results.total > 0 ? " имеете конкурентное преимущество." : " рискуете не пройти порог."}
            </p>
            <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition-all active:scale-95 relative z-10">
              Заказать аудит
            </button>
          </div>

          {/* Инфо-блок */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200">
            <div className="flex items-center gap-2 mb-4 text-slate-800">
              <Info size={18} className="text-blue-500" />
              <h4 className="font-bold text-sm">Справочные данные</h4>
            </div>
            <div className="space-y-4">
              <p className="text-[11px] text-slate-500 italic border-l-2 border-blue-100 pl-4">
                Баллы за ПУН и ПФОТ могут быть отрицательными, если показатели ниже 3% и 6.6% соответственно.
              </p>
              <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-slate-400">
                <div className="p-2 bg-slate-50 rounded-lg">СГЗ &lt; 200к МРП: 25</div>
                <div className="p-2 bg-slate-50 rounded-lg">СГЗ &lt; 400к МРП: 50</div>
                <div className="p-2 bg-slate-50 rounded-lg">СГЗ &lt; 800к МРП: 100</div>
                <div className="p-2 bg-slate-50 rounded-lg">СГЗ &gt; 3.2м МРП: 700</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ ---

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
        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-slate-900 font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all"
      />
    </div>
  );
}

function TableRow({ label, value, status, isPositive }: any) {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      <td className="px-8 py-5 text-sm font-bold text-slate-700">{label}</td>
      <td className="px-8 py-5 text-sm text-slate-400 font-mono">{value}</td>
      <td className="px-8 py-5 text-right font-mono">
        <span className={`text-sm font-black ${isPositive ? "text-green-600" : "text-red-500"}`}>
          {parseFloat(status) > 0 ? `+${status}` : status}
        </span>
      </td>
    </tr>
  );
}