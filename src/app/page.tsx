import { 
  ShieldCheck, HardHat, Calculator, 
  Briefcase, Scale, FileBadge, ArrowRight, 
  Settings2, Users2, BarChart3, CloudLightning 
} from "lucide-react";
import Link from "next/link";
// 1. Добавляем импорт Image
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto space-y-20 pb-24 p-4">
      
      {/* 1. HERO SECTION С ВАШИМ ФОТО */}
      <section className="relative overflow-hidden bg-slate-900 rounded-[3rem] text-white shadow-2xl">
        {/* Фоновое свечение (опционально для красоты) */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/20 blur-[120px] -z-0" />
        
        <div className="relative z-10 grid md:grid-cols-2 gap-0 items-stretch">
          <div className="p-12 space-y-8 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium backdrop-blur-md border border-white/10 w-fit">
              <CloudLightning size={16} className="text-blue-400" />
              <span>Цифровое сопровождение стройки</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Ваш проект под защитой экспертов
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Комплексный инструмент для строительного бизнеса: от расчетов фин. устойчивости до получения актов ввода в эксплуатацию.
            </p>
            <div className="flex gap-4">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-bold transition-all transform hover:scale-105">
                Попробовать бесплатно
              </button>
            </div>
          </div>

          {/* ВСТАВЛЯЕМ ВАШЕ ФОТО ТУТ */}
          <div className="relative hidden md:block min-h-[500px]">
            <Image 
              src="/images/hero-construction.jpg" // Укажи свое название файла
              alt="Строительная экспертиза"
              fill
              className="object-cover"
              priority
            />
            {/* Градиентный переход от фото к тексту */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* 2. БЛОК ИНФОГРАФИКИ (Оставляем без изменений) */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">Ваш надежный помощник</h2>
          <p className="text-slate-500 mt-4">Мы объединили IT-технологии и реальный опыт инженеров</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
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

      {/* 3. СЕТКА УСЛУГ С ФОТОГРАФИЯМИ */}
      {/* 3. СЕТКА УСЛУГ С ФОТОГРАФИЯМИ */}
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* 1. Бухгалтерия */}
      <ServiceCard 
        icon={<Calculator />} 
        title="Бухгалтерия и ПФУ" 
        desc="Расчет показателей финансовой устойчивости для тендеров."
        href="/services/pfu-calc"
        imgSrc="/images/accounting-bg.jpg" 
      />

      {/* 2. Закупки — заменим на ваше фото с контрактом */}
      <ServiceCard 
        icon={<Briefcase />} 
        title="Закупки" 
        desc="Сопровождение на Goszakup, Самрук-Казына и Mitwork."
        href="/services/goszakup"
        imgSrc="/images/closeup-hands-passing-contract-unrecognizable-businessman.jpg" 
      />

      {/* 3. Инженер ПТО */}
      <ServiceCard 
        icon={<HardHat />} 
        title="Инженер ПТО" 
        desc="Формы 2, 3, исполнительная документация и обучение."
        href="/services/smetchik-course"
        imgSrc="/images/engineer-bg.jpg" 
      />

      {/* 4. Юридический отдел — ваше фото с весами */}
      <ServiceCard 
        icon={<Scale />} 
        title="Юридический отдел" 
        desc="Претензии, иски и сопровождение договоров."
        href="/services/legal-claims"
        imgSrc="/images/scales-justice-workplace.jpg" 
      />

      {/* 5. Лицензирование — ваше фото проекта дома */}
      <ServiceCard 
        icon={<FileBadge />} 
        title="Лицензирование" 
        desc="Помощь в получении лицензий ГСЛ 1, 2, 3 категорий."
        href="/services/license-categories"
        imgSrc="/images/working-housing-project.jpg" 
      />

      {/* 6. Промбезопасность — фото со стройкой (hero) */}
      <ServiceCard 
        icon={<ShieldCheck />} 
        title="Промбезопасность" 
        desc="Аттестация персонала и техническое обслуживание."
        href="/services/safety-training"
        imgSrc="/images/hero-construction.jpg" 
      />
    </section>
    
    </div>
  );
}

// Вспомогательные компоненты (остаются такими же)
function StepItem({ icon, title, desc }: any) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 text-center space-y-4 shadow-sm">
      <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-100">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function ServiceCard({ icon, title, desc, href, imgSrc }: any) {
  return (
    <Link 
      href={href} 
      className="group relative min-h-[320px] flex flex-col justify-end overflow-hidden rounded-[2.5rem] border border-slate-100 shadow-md transition-all hover:shadow-2xl bg-white"
    >
      {/* Добавляем само изображение на задний план */}
      {imgSrc && (
        <>
          <Image 
            src={imgSrc} 
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Затемнение, чтобы белый текст читался на фоне фото */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10" />
        </>
      )}

      {/* Контент карточки */}
      <div className="relative z-20 p-8 space-y-3">
        {/* Иконка: синяя на белом фоне или белая на фото */}
        <div className={`${imgSrc ? 'text-white' : 'text-blue-600'} mb-2`}>
          {icon}
        </div>
        
        <h3 className={`text-xl font-bold ${imgSrc ? 'text-white' : 'text-slate-900'}`}>
          {title}
        </h3>
        
        <p className={`text-sm leading-relaxed ${imgSrc ? 'text-slate-200' : 'text-slate-500'}`}>
          {desc}
        </p>
        
        <div className={`flex items-center font-bold text-sm gap-2 pt-2 ${imgSrc ? 'text-blue-300' : 'text-blue-600'}`}>
          Перейти <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}