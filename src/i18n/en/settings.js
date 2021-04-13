export default {
  teamSettings: {
    name: 'Takım Ayarları',
    desc: 'Takımınıza yeni isim verin vb..',
    general: 'Genel Ayarlar',
    language: 'Dil Ayarları',
    logo: 'Takım Logosu',
    timezone: 'Zaman Dilimi Ayarları',
    invoice: 'Fatura Adresi'
  },
  notificationSettings: {
    name: 'Bildirim Ayarları',
    desc: 'Alacağınız bildirimleri ayarlayın vb..',
    notificationTypes: {
      bilppNews: 'Bilpp\'ten haberler al',
      formCompleted: 'Kişiler form doldurduğunda bildirim al',
      contactCreated: 'Yeni bir kişi oluştuğunda bildirim al',
      sessionStarted: 'Kişiler yeni bir oturum başlattığında bildirim al',
      emailOpened: 'Kişiler gönderilen bir epostayı açtığında bildirim al',
      dailyReport: 'Günlük rapor al',
      weeklyReport: 'Haftalık rapor al',
      monthlyReport: 'Aylık rapor al',
      tagEventFired: 'Tag etkinliği ateşlendiğinde bildirim al.',
      invoiceTotalOver: 'Faturam şu tutarı geçtiğinde bildirim al: '
    }
  },
  emailSettings: {
    name: 'Eposta Ayarları',
    desc: 'Gönderen epostalar vb..',
    validation: {
      emailOrNameCantBeEmpty: 'Gönderici adı veya eposta boş olamaz!',
      wouldYouLikeToDelete: 'Bu göndericiyi silmek istediğinize emin misiniz?',
      confirm: 'Onayla',
      cancel: 'VAZGEÇ',
      delete: 'SİL'
    }
  },
  smsSettings: {
    name: 'SMS Ayarları',
    desc: 'Gönderen SMS başlıkları vb..',
    validation: {
      titleCantBeEmpty: 'SMS başlığı boş olamaz',
      wouldYouLikeToDelete: 'Bu başlığı silmek istediğinize emin misiniz?',
      confirm: 'Onayla',
      cancel: 'VAZGEÇ',
      delete: 'SİL'
    }
  }
}
