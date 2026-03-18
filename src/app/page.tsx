import { 
  ShieldCheck, HardHat, Calculator, 
  Briefcase, Scale, FileBadge, ArrowRight, 
  Settings2, Users2, BarChart3, CloudLightning 
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto space-y-20 pb-24">
      
      {/* 1. HERO SECTION С ИНФОГРАФИКОЙ */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-700 to-blue-500 rounded-[3rem] p-12 text-white shadow-2xl">
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-400/30 rounded-full text-sm font-medium backdrop-blur-md">
              <CloudLightning size={16} />
              <span>Цифровое сопровождение стройки</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Ваш проект под защитой экспертов
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Комплексный инструмент для строительного бизнеса: от расчетов фин. устойчивости до получения актов ввода в эксплуатацию.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold hover:shadow-lg transition-all">
                Попробовать бесплатно
              </button>
            </div>
          </div>

          {/* Визуальная инфографика в Hero */}
          <div className="hidden md:grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/20 transform translate-y-8">
              <BarChart3 className="mb-4 text-blue-200" size={32} />
              <div className="text-2xl font-bold">+25%</div>
              <div className="text-xs text-blue-100">Шанс победы в тендере</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/20">
              <Settings2 className="mb-4 text-blue-200" size={32} />
              <div className="text-2xl font-bold">100%</div>
              <div className="text-xs text-blue-100">Автоматизация ПТО</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. БЛОК ИНФОГРАФИКИ: "КАК ЭТО РАБОТАЕТ" */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">Ваш надежный помощник</h2>
          <p className="text-slate-500 mt-4">Мы объединили IT-технологии и реальный опыт инженеров</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Линия-путь (для десктопа) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10" />
          
          <StepItem 
            icon={<Users2 size={24} />}
            title="Сбор данных"
            desc="Вы загружаете первичные документы или данные проекта в систему."
          />
          <StepItem 
            icon={<ShieldCheck size={24} />}
            title="Экспертиза"
            desc="Система и наши специалисты проверяют всё на соответствие нормам РК."
          />
          <StepItem 
            icon={<FileBadge size={24} />}
            title="Результат"
            desc="Получаете готовые расчеты, акты или подписанные договоры."
          />
        </div>
      </section>

      {/* 3. СЕТКА ОСНОВНЫХ УСЛУГ */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ServiceCard 
          icon={<Calculator />} 
          title="Бухгалтерия и ПФУ" 
          desc="Расчет показателей финансовой устойчивости для тендеров."
          href="/services/pfu-calc"
        />
        <ServiceCard 
          icon={<Briefcase />} 
          title="Закупки" 
          desc="Сопровождение на Goszakup, Самрук-Казына и Mitwork."
          href="/services/goszakup"
        />
        <ServiceCard 
          icon={<HardHat />} 
          title="Инженер ПТО" 
          desc="Формы 2, 3, исполнительная документация и обучение."
          href="/services/smetchik-course"
        />
        <ServiceCard 
          icon={<Scale />} 
          title="Юридический отдел" 
          desc="Претензии, иски и сопровождение договоров."
          href="/services/legal-claims"
        />
        <ServiceCard 
          icon={<FileBadge />} 
          title="Лицензирование" 
          desc="Помощь в получении лицензий ГСЛ 1, 2, 3 категорий."
          href="/services/license-categories"
        />
        <ServiceCard 
          icon={<ShieldCheck />} 
          title="Промбезопасность" 
          desc="Аттестация персонала и техническое обслуживание."
          href="/services/safety-training"
        />
      </section>

    </div>
  );
}

// Вспомогательный компонент для шагов
function StepItem({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-100">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

// Вспомогательный компонент для карточек услуг
function ServiceCard({ icon, title, desc, href }: { icon: any, title: string, desc: string, href: string }) {
  return (
    <Link href={href} className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-50 transition-all">
      <div className="text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-6">{desc}</p>
      <div className="flex items-center text-blue-600 font-bold text-sm gap-2">
        Перейти <ArrowRight size={16} />
      </div>
    </Link>
  );
}