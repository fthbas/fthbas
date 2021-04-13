export default {
  header: 'Formlar',
  totalViews: 'Toplam Görüntülenme',
  totalEntries: 'Toplam Cevap',
  conversionRate: 'Dönüşüm Oranı',
  uniqueContacts: 'Benzersiz Kişiler',
  found: '{count} Form bulundu',
  dailyEntryCountChart: 'Günlük Kayıtlar',
  monthlyEntryCountChart: 'Aylık Kayıtlar',
  monthlyAvgRatingChart: 'Aylık Puanlama Skoru',
  miniCharts: 'Genel',
  entriesFound: '{count} Form cevabı bulundu',
  copyClipboard: 'Form Linkini Panoya Kopyala',
  entryCount: 'Kayıt Sayısı',
  viewCount: 'Görüntülenme Sayısı',
  formInsights: 'Form İstatistikleri',
  formCompletedBy: '<b>{first_name} {last_name},</b> <b>{form}</b> formunu yaklaşık <b>{human},</b> <b>{date}</b> tarihinde saat <b>{time}</b>\'da doldurdu.',
  formCompletedByContact: 'Kişi <b>{form}</b> formunu yaklaşık <b>{human},</b> <b>{date}</b> tarihinde saat <b>{time}</b>\'da doldurdu.',
  form: 'Form',
  forms: 'Formlar',
  formEntries: 'Form Cevapları',
  question: 'Soru',
  isQuestionRequired: 'Bu zorunlu bir alandır!',
  addNewOption: 'Yeni seçenek ekle',
  typeYourOption: 'Seçeneği belirle',
  atLeast2Options: 'Bu soru en az iki seçeneğe sahip olmalıdır.',
  questionDisplayRules: 'Soru Gösterme Kuralları',
  emailNotificationEnable: 'Kişi form doldurduğunda kişiye bir eposta bildirimi gönder.',
  smsNotificationEnable: 'Kişi form doldurduğunda kişiye bir SMS bildirimi gönder.',
  tabs: {
    general: 'GENEL',
    questions: 'SORULAR'
  },
  rules: {
    browser: {
      name: 'Tarayıcı',
      desc: 'Ziyaretçinin tarayıcısına göre.'
    },
    os: {
      name: 'İşletim Sistemi',
      desc: 'Ziyaretçinin işletim sistemine göre'
    },
    platform: {
      name: 'Platform',
      desc: 'Ziyaretçinin kullandığı cihaz platformuna göre'
    },
    referrer: {
      name: 'Yönlendirme',
      desc: 'Ziyaretçiyi sayfaya yönlendiren yere göre'
    },
    identity: {
      name: 'Tag Etkinliği Kimlik Bilgisi',
      desc: 'Tag etkinliği olarak kimlik gönderildiğinde verilen bilgilere göre'
    },
    queryString: {
      name: 'URL Parametreleri',
      desc: 'URL de bulunan parametlere göre'
    },
    campaign: {
      name: 'Kampanya',
      desc: 'Kampanya detaylarına göre'
    }
  },
  formDetails: 'Form Detayları',
  validation: {
    wouldYouLikeToDelete: 'Bu formu silmek istediğinize emin misiniz?',
    confirm: 'Onayla',
    cancel: 'VAZGEÇ',
    delete: 'SİL',
    questions: {
      wouldYouLikeToDelete: 'Bu soruyu silmek istediğinize emin misiniz?',
      confirm: 'Onayla',
      cancel: 'VAZGEÇ',
      delete: 'SİL'
    }
  },
  questionTypes: {
    string: 'Metin',
    selectbox: 'Açılır Menü',
    checkbox: 'Çoklu Seçim',
    radio: 'Çoktan Seçmeli',
    rating: 'Puanlama',
    first_name: 'İsim',
    last_name: 'Soyisim',
    gender: 'Cinsiyet',
    email: 'E-Posta',
    phone: 'Telefon'
  },
  sampleQuestions: {
    string: 'Sitemizde yaşadığınız deneyimi anlatır mısınız?',
    selectbox: 'Hangisi size daha uygun?',
    checkbox: 'En sevdiğiniz spor nedir?',
    radio: 'Bugün mutlu musunuz?',
    rating: 'Sitemizde yaşadığınız deneyimi puanlar mısınız?',
    first_name: 'İsminiz nedir?',
    last_name: 'Soyisminiz nedir?',
    email: 'E-Posta adresiniz nedir?',
    phone: 'Telefon numaranız nedir?',
    gender: 'Cinsiyetiniz nedir?'
  },
  sampleOptions: {
    selectbox: [
      {
        name: 'Alışveriş yapmayı severim.'
      },
      {
        name: 'Spor yapmayı severim.'
      },
      {
        name: 'Müzik dinlemeyi severim.'
      }
    ],
    checkbox: [
      {
        name: 'Futbol'
      },
      {
        name: 'Basketbol'
      },
      {
        name: 'Yüzme'
      }
    ],
    radio: [
      {
        name: 'Evet'
      },
      {
        name: 'Hayır'
      },
      {
        name: 'Bilmiyorum'
      }
    ]
  }
}
