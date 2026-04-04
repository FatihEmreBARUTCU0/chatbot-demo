# AI Chatbot Demo - Müşteri Hizmetleri Botu

## Ürün
Bir e-ticaret firması için müşteri hizmetleri chatbot demo sayfası.
Ziyaretçiler chatbot ile konuşabilir, bot hazır cevaplar verir.
Gerçek AI yok, mock responses kullanılıyor.

## Teknoloji
- Next.js 16 (App Router)
- Tailwind CSS v4
- TypeScript
- shadcn/ui (Mira preset)
- Vercel (deploy)

## Sayfa Yapısı
Tek sayfa — ikiye bölünmüş:
- Sol: Landing/tanıtım bölümü
- Sağ: Canlı chatbot arayüzü

## Chatbot Özellikleri
- Kullanıcı mesaj yazıp gönderebilir
- Bot 1-2 sn gecikmeyle cevap verir (setTimeout ile)
- Typing indicator (... animasyonu) gösterilir
- Scroll otomatik en alta gider
- Enter ile mesaj gönderme

## Mock Cevaplar (keyword bazlı)
- "merhaba/selam" → Hoş geldiniz mesajı
- "sipariş/kargo" → Kargo takip bilgisi
- "iade/değişim" → İade politikası
- "fiyat/ücret" → Fiyat bilgisi
- "iletişim/telefon" → İletişim bilgileri
- Diğer → Genel yardım mesajı

## Tasarım
- İki kolonlu layout (split screen)
- Sol taraf: gradient arka plan, özellikler listesi
- Sağ taraf: beyaz chat arayüzü, mesaj balonları
- Kullanıcı mesajı: sağda mor/mavi
- Bot mesajı: solda gri
- Typing indicator animasyonu

## Güvenlik
- API key yok
- Console.log olmasın
- Kullanılmayan import olmasın

## Hedef
AI chatbot entegrasyonu yapabildiğini gösteren,
görsel olarak etkileyici bir demo.
Upwork'te "AI Chatbot Development" kategorisi için portföy.