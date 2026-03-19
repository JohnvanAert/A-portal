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
  };
}

export function AccountingTemplate({ id }: { id: string }) {
  // 1. Состояние для входных данных (начальные значения для примера)
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

  // 2. Логика расчета ПФУ с защитой от undefined (решение вашей ошибки)
  const results: CalculationResults = useMemo(() => {
    const { sd, sgz, un, fot } = values;

    // Дефолтные значения, если данные не введены или некорректны
    const defaultRes = {
      pd: 0, pun: 0, pfot: 0, total: 0,
      raw: { pdPerc: 0, punPerc: 0, pfotPerc: 0 }
    };

    if (!sgz || !sd || sgz <= 0 || sd <= 0) return defaultRes;

    // Расчет ПД: Порог 50%, шаг 0.1%, бонус 0.05%
    const pdPerc = (sd / sgz) * 100;
    const pdPoints = pdPerc > 50 ? Math.floor((pdPerc - 50) / 0.1) * 0.05 : 0;

    // Расчет ПУН: Порог 3%, шаг 0.1%, бонус 0.5%
    const punPerc = (un / sd) * 100;
    const punPoints = punPerc > 3 ? Math.floor((punPerc - 3) / 0.1) * 0.5 : 0;

    // Расчет ПФОТ: Порог 6.6%, шаг 0.1%, бонус 0.1%
    const pfotPerc = (fot / sgz) * 100;
    const pfotPoints = pfotPerc > 6.6 ? Math.floor((pfotPerc - 6.6) / 0.1) * 0.1 : 0;

    return {
      pd: pdPoints,
      pun: punPoints,
      pfot: pfotPoints,
      total: pdPoints + punPoints + pfotPoints,
      raw: { pdPerc, punPerc, pfotPerc }
    };
  }, [values]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 p-4">
      
      {/* 1. Хедер с итоговым баллом */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-6 items-center">
          <div className="p-4 bg-green-50 rounded-2xl text-green-600">
            <Calculator size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Бухгалтерский анализ: {id}</h1>
            <p className="text-slate-500 text-sm">Автоматизированная проверка показателей финансовой устойчивости</p>
          </div>
        </div>
        <div className="bg-slate-900 text-white p-6 rounded-3xl min-w-[220px] shadow-xl text-center">
          <p className="text-xs text-slate-400 uppercase font-black tracking-widest mb-1">Итоговый балл ПФУ</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl font-black text-green-400 font-mono">
              {results.total.toFixed(2)}
            </span>
            <div className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded-md border border-green-500/30 font-bold uppercase">
              {results.total > 0 ? 'Active' : 'Empty'}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* 2. Блок ввода данных */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
              <Coins size={20} className="text-blue-600" /> Исходные финансовые данные
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Доход за 3 года (СД)" name="sd" value={values.sd} onChange={handleChange} icon={<Landmark size={14}/>} />
              <InputField label="Сумма лота (СГЗ)" name="sgz" value={values.sgz} onChange={handleChange} icon={<Percent size={14}/>} />
              <InputField label="Уплаченные налоги (УН)" name="un" value={values.un} onChange={handleChange} icon={<Banknote size={14}/>} />
              <InputField label="Фонд оплаты труда (ФОТ)" name="fot" value={values.fot} onChange={handleChange} icon={<TableIcon size={14}/>} />
            </div>
          </div>

          {/* 3. Таблица результатов */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                <TrendingUp size={20} className="text-slate-400" />
                Детализация начислений
              </h3>
              <button className="text-blue-600 text-[10px] font-black uppercase flex items-center gap-2 tracking-widest border border-blue-100 px-4 py-2 rounded-xl hover:bg-blue-50 transition-all">
                <Download size={14} /> Отчет PDF
              </button>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-[10px] uppercase tracking-widest font-black border-b border-slate-50">
                  <th className="px-8 py-5">Показатель (формула)</th>
                  <th className="px-8 py-5">Текущий %</th>
                  <th className="px-8 py-5">Бонусный балл</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <TableRow 
                  label="Доходность (ПД > 50%)" 
                  value={`${results.raw.pdPerc.toFixed(2)}%`} 
                  status={`+${results.pd.toFixed(2)}%`}
                  isPositive={results.pd > 0} 
                />
                <TableRow 
                  label="Налоговая нагрузка (ПУН > 3%)" 
                  value={`${results.raw.punPerc.toFixed(2)}%`} 
                  status={`+${results.pun.toFixed(2)}%`}
                  isPositive={results.pun > 0}
                />
                <TableRow 
                  label="Фонд оплаты труда (ПФОТ > 6.6%)" 
                  value={`${results.raw.pfotPerc.toFixed(2)}%`} 
                  status={`+${results.pfot.toFixed(2)}%`}
                  isPositive={results.pfot > 0}
                />
              </tbody>
            </table>
          </div>
        </div>

        {/* Правая колонка */}
        <div className="space-y-6">
          <div className="bg-blue-600 rounded-[3rem] p-8 text-white shadow-xl shadow-blue-200/50">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Banknote size={20} /> Прогноз участия
            </h4>
            <p className="text-blue-50 text-sm mb-6 leading-relaxed">
              С баллом <strong className="text-white">{results.total.toFixed(2)}</strong> система оценивает вашу устойчивость как 
              {results.total > 2 ? " высокую. Вы проходите порог большинства крупных тендеров." : " среднюю. Рекомендуется увеличить налоговую прозрачность."}
            </p>
            <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition-all active:scale-95">
              Связаться с экспертом
            </button>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200">
            <div className="flex items-center gap-2 mb-4 text-slate-800">
              <Info size={18} className="text-blue-500" />
              <h4 className="font-bold text-sm">Справка по формуле</h4>
            </div>
            <div className="space-y-3">
              <p className="text-[11px] text-slate-500 leading-relaxed italic border-l-2 border-blue-100 pl-4">
                ПФУ — это автоматический показатель веб-портала. Начисляется сверх минимальных требований за каждые 0.1% превышения порога.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl font-mono text-[9px] text-slate-400 space-y-1">
                <p>ПД: (СД/СГЗ) - шаг 0.05</p>
                <p>ПУН: (УН/СД) - шаг 0.50</p>
                <p>ПФОТ: (ФОТ/СГЗ) - шаг 0.10</p>
              </div>
            </div>
          </div>

          {/* Документы */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-6 text-sm">Архив отчетов</h4>
            <div className="space-y-3">
              <FileItem title="Расчет_ПФУ_2026.pdf" size="1.2 MB" />
              <FileItem title="Налоговый_регистр.xlsx" size="0.8 MB" />
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
      <div className="relative">
        <input 
          type="number" 
          name={name} 
          value={value === 0 ? "" : value} 
          placeholder="0.00"
          onChange={onChange}
          className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-slate-900 font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-300"
        />
      </div>
    </div>
  );
}

function TableRow({ label, value, status, isPositive }: any) {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors group">
      <td className="px-8 py-5 text-sm font-bold text-slate-700">{label}</td>
      <td className="px-8 py-5 text-sm text-slate-500 font-mono">{value}</td>
      <td className="px-8 py-5">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
          isPositive ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"
        }`}>
          {isPositive ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
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
        <FileText size={18} className="text-slate-400 group-hover:text-blue-600" />
        <span className="text-[10px] font-bold text-slate-700 truncate max-w-[120px]">{title}</span>
      </div>
      <span className="text-[9px] text-slate-400 font-black">{size}</span>
    </div>
  );
}