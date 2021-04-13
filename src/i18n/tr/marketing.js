export default {
  header: 'Pazarlama',
  headerDesc: 'Pazarlama kanalları yönetimi',
  activeMarketing: 'Aktif Pazarlama',
  enableForms: 'Form Göstermeyi Aktifleştir',
  enableFormsDesc: 'Aktif olduğu zaman sitenizin sağ alt köşesinde bir form kutusu açılır.',
  enableActiveBox: 'Aktif Pazarlama Kutusunu Aktifleştir',
  enableActiveBoxDesc: 'Aktif olduğu zaman belirlediğiniz kurallara göre ekranda belirlediğiniz içerik ortaya çıkar.',
  contentType: 'İçerik Türü',
  contentTypeDesc: 'Kutuda gösterilecek içeriğin türünü belirleyin.',
  content: 'İçerik',
  activeBoxDisplaySettings: 'Aktif Pazarlama Kutusu Gösterim Kuralları',
  activeBoxDisplaySettingsDesc: 'Kutunun hangi şartlarda gösterileceğini belirleyin.',
  questionDisplaySettings: 'Formdaki Soruların Gösterim Kuralları',
  questionDisplaySettingsDesc: 'Formdaki soruların hangi şartlarda gösterileceğini belirleyin.',
  weekDays: 'Haftanın Günleri',
  hoursOfDays: 'Günlerin Saat Aralıkları',
  openFormWidgetOnInit: 'Formu sayfa yüklendiğinde otomatik olarak aç',
  openFormWidgetOnInitDesc: 'Etkinleştirilirse sayfa yüklendiğinde form kutusu otomatik açılır. Aksi takdirde ziyaretçinin açma butonuna tıklaması gerekir.',
  found: '{count} gönderi bulundu',
  cantDelete: 'Bu gönderi tamamlanmış olduğu için düzenlenemez veya silinemez.',
  types: {
    active: { name: 'Aktif Pazarlama', desc: 'Ziyaretçilerinizle gerçek zamanlı etkileşime geçin' },
    journey: { name: 'Kişi Yolculuğu', desc: 'Kişilerinizi pazarlama yolculuğuna çıkarın' },
    email: { name: 'E-Posta Pazarlama', desc: 'Kişilerinize e-posta gönderin' },
    sms: { name: 'SMS Pazarlama', desc: 'Kişilerinize SMS gönderin' }
  },
  sms: {
    waiting: {
      header: 'Gönderilmeyi Bekleyen SMS Gönderileri',
      headerDesc: 'Bu gönderiler gönderilmeyi beklemektedir'
    },
    sent: {
      header: 'Gönderilmiş SMS Gönderiler',
      headerDesc: 'Bu gönderiler gönderildi.'
    },
    create: {
      header: 'SMS Pazarlama',
      headerDesc: 'SMS Pazarlama gönderisi oluşturun',
      schedulePost: 'Gönderinizi zamanlamak ister misiniz?'
    }
  },
  email: {
    waiting: {
      header: 'Gönderilmeyi Bekleyen E-Posta Gönderileri',
      headerDesc: 'Bu gönderiler gönderilmeyi beklemektedir'
    },
    sent: {
      header: 'Gönderilmiş E-Posta Gönderiler',
      headerDesc: 'Bu gönderiler gönderildi.'
    },
    create: {
      header: 'E-Posta Pazarlama',
      headerDesc: 'E-Posta Pazarlama gönderisi oluşturun',
      schedulePost: 'Gönderinizi zamanlamak ister misiniz?'
    }
  }
}
