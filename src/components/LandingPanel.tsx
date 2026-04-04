const features = [
  {
    icon: "⚡",
    title: "Anında Yanıt",
    description: "Ortalama 1-2 saniye içinde cevap. Müşterileriniz beklemez.",
  },
  {
    icon: "📦",
    title: "Sipariş & Kargo Takibi",
    description: "Kargo durumu ve teslimat bilgilerini anlık sorgulayın.",
  },
  {
    icon: "🔄",
    title: "İade & Değişim",
    description: "Sorunsuz iade süreçleri, tek tıkla başlatın.",
  },
  {
    icon: "🎯",
    title: "Akıllı Yönlendirme",
    description: "Çözülemeyen soruları doğru temsilciye iletir.",
  },
];

const stats = [
  { value: "50K+", label: "Mutlu Müşteri" },
  { value: "%98", label: "Memnuniyet" },
  { value: "7/24", label: "Kesintisiz Destek" },
];

const trustBadges = ["MNG Kargo Entegrasyonu", "SSL Güvenli", "KVKK Uyumlu"];

export default function LandingPanel() {
  return (
    <div className="flex flex-col h-full px-10 py-10 bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-700 text-white overflow-y-auto">
      {/* Brand */}
      <div className="flex-shrink-0">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-lg">
            🛍️
          </div>
          <span className="font-bold text-xl tracking-tight">ShopBot</span>
        </div>
        <p className="text-violet-300 text-xs font-medium pl-0.5">Müşteri Destek Platformu</p>
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col justify-center py-8">
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 w-fit mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-violet-100">Canlı Demo — Şimdi Deneyin</span>
        </div>

        <h1 className="text-3xl xl:text-4xl font-bold leading-snug mb-4">
          Müşteri Hizmetleri
          <br />
          <span className="text-violet-200">Yapay Zeka ile</span>
          <br />
          Yeniden Tanımlandı
        </h1>

        <p className="text-violet-100 text-sm leading-relaxed mb-8 max-w-sm">
          Akıllı chatbot teknolojimizle müşterilerinize 7 gün 24 saat anında destek sunun.
          Ekibinizin iş yükünü %80 azaltırken müşteri memnuniyetini artırın.
        </p>

        {/* Features */}
        <div className="space-y-3">
          {features.map((f) => (
            <div key={f.title} className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0 text-base">
                {f.icon}
              </div>
              <div>
                <p className="font-semibold text-sm leading-tight">{f.title}</p>
                <p className="text-violet-200 text-xs leading-relaxed mt-0.5">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="flex-shrink-0 space-y-4">
        <div className="grid grid-cols-3 gap-3 py-5 border-t border-white/20">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold leading-tight">{s.value}</p>
              <p className="text-violet-300 text-[11px] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-2">
          {trustBadges.map((badge) => (
            <span
              key={badge}
              className="text-[11px] font-medium text-violet-200 bg-white/10 px-2.5 py-1 rounded-full"
            >
              ✓ {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
