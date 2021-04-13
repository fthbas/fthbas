<template>
  <div>
    <div class="q-px-md" style="margin-bottom: 50px;">
      <div class="row q-px-md" >
        <q-page-sticky expand position="top" class="q-px-md" style="z-index: 1999;">
          <q-toolbar class="col-12 bg-grey-2" style="height: 50px; min-height: 50px; padding-left: 0;" >
            <q-btn align="around" @click="$router.go(-1)" class="btn-fixed-width" color="grey-8" flat icon="la la-arrow-left" >
              <q-tooltip anchor="top middle" transition-show="flip-right" transition-hide="flip-left" self="center middle">
                {{ $t('common.back') }}
              </q-tooltip>
            </q-btn>
            <q-separator vertical ></q-separator>
            <div class="q-px-xs ">
              <q-btn
                unelevated
                text-color="red-8"
                icon="la la-trash"
                @click="deleteProject"
              >
                <q-tooltip anchor="top middle" transition-show="flip-right" transition-hide="flip-left" self="center middle">
                  Sil
                </q-tooltip>
              </q-btn>
            </div>
            <q-space />
          </q-toolbar>
        </q-page-sticky>
      </div>
    </div>
    <div class="q-px-md" v-if="project && selectedLanguage">
      <div>
        <div class="col-12">
          <div class="row">
            <div class="col-12">
              <q-card>
                <q-card-section>
                  <div class="row">
                    <div class="col-md-6 col-sm-12 col-xs-12">
                      <q-item>
                        <q-item-section>
                          <q-item-label>{{ project.name[selectedLanguage.value] }} </q-item-label>
                          <span v-if="(fetching || saving)" class="text-grey-8"><q-icon color="red-8" size="sm" name="las la-spinner la-spin"></q-icon> {{ $t('common.pleaseWait') }}</span>
                          <span v-else class="text-grey-8"><q-icon size="sm" color="green-8" name="las la-check"></q-icon></span>
                        </q-item-section>
                      </q-item>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
          <div class="row q-pt-sm" v-if="project">
            <div class="col-12">
              <q-card class="q-pa-md">
                <q-card-section v-if="selectedLanguage">
                  <q-btn-group>
                    <q-btn v-for="(language, languageKey) in project.languages" :key="languageKey" @click="selectedLanguage = language" :color="selectedLanguage.label === language.label ? 'primary' : 'orange'" text-color="white" :label="language.label" v-model="selectedLanguage"/>
                    <q-btn color="orange" @click="addLang = !addLang" text-color="white" icon="las la-plus" />
                    <q-dialog v-model="addLang" persistent>
                      <q-card style="min-width: 350px">
                        <q-card-section>
                          <q-input dense v-model="addLangInputs.label" label="Dil adı. Örn: Türkçe" autofocus/>
                        </q-card-section>
                        <q-card-section class="q-pt-none">
                          <q-input dense v-model="addLangInputs.value" label="URL deki kısa yol. Örn: tr"/>
                        </q-card-section>

                        <q-card-actions align="right" class="text-primary">
                          <q-btn flat label="Vazgeç" v-close-popup />
                          <q-btn flat label="Ekle" @click="() => { project.languages.push({ label: addLangInputs.label, value: addLangInputs.value, deletable: true, icon: null }); addLang = !addLang }" />
                        </q-card-actions>
                      </q-card>
                    </q-dialog>
                  </q-btn-group>
                </q-card-section>
                <q-separator></q-separator>
                <q-splitter
                  v-model="splitterModel"
                >
                  <template v-slot:before>
                    <q-tabs
                      v-model="tab"
                      vertical
                      active-bg-color="grey-4"
                      active-color="primary"
                      class="text-grey-9"
                    >
                      <q-tab no-caps name="common" label="Genel" />
                      <q-tab no-caps name="login" label="Giriş Sayfası Ayarları" />
                      <q-tab no-caps name="register" label="Kayıt Sayfası Ayarları" />
                      <q-tab no-caps name="embed" label="Embed" />
                      <q-tab no-caps name="theme" label="Tema Ayarları" />
                      <q-tab no-caps name="gdpr" label="KVKK & GDPR" />
                      <q-tab no-caps name="ask" label="Soru Sor Modülü" />
                      <q-tab no-caps name="qa" v-if="!selectedLanguage.deletable" label="Test Modülü" />
                      <q-tab no-caps name="sms" v-if="!selectedLanguage.deletable"  label="Toplu SMS" />
                      <q-separator spaced=""></q-separator>
                      <p style="text-decoration: none; text-align:center; ">
                        <a style="text-decoration: none; text-align:center; " class="q-mx-sm text-black" :href="$router.resolve({name:'projects.stats', params: { domain: project.domain, pass: project.stats_password } }).href" target="_blank">İstatistikler</a>
                      </p>
                      <p style="text-decoration: none; text-align:center; ">
                        <a style="text-decoration: none;" class="q-mx-sm text-black" :href="'https://'+project.domain + '/#/stats/u/p/t'" target="_blank">Müşteri Paneli</a>
                      </p>
                      <p style="text-decoration: none; text-align:center; ">
                        <a style="text-decoration: none;" class="q-mx-sm text-black"  :href="'https://'+project.domain + '/#/stats/s/q/s/'+project.stats_password" target="_blank">Soru Paneli</a>
                      </p>
                    </q-tabs>
                  </template>

                  <template v-slot:after>
                    <q-card-section v-if="tab === 'common'">

                      <div :class="{'row':true, 'q-col-gutter-md': true, 'hidden' :selectedLanguage.value !== language.value }" v-for="(language, languageKey) in project.languages" :key="languageKey">
                        <div  class="col-md-4 col-sm-12 col-xs-12" v-if="selectedLanguage.value === language.value">
                          <q-input class="q-pb-md" clearable outlined @change="saveProject" v-model="language.value" label="Dil Kısa İsmi"></q-input>
                        </div>
                        <div  class="col-md-4 col-sm-12 col-xs-12" v-if="selectedLanguage.value === language.value">
                          <q-input class="q-pb-md" clearable outlined  @change="saveProject" v-model="language.label" label="Dil İsmi"></q-input>
                        </div>
                        <div class="col-md-4 col-sm-12 col-xs-12" v-if="selectedLanguage.value === language.value && project.languages.length > 1">
                          <q-btn color="red-9" label="Bu Dili Sil" @click="() => { const key = project.languages.indexOf(language); project.languages.splice(key, 1); saveProject(); $forceUpdate() }" push></q-btn>
                        </div>
                      </div>
                      <q-separator spaced=""></q-separator>
                      <div class="row q-col-gutter-md">
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-input class="q-pb-md" clearable outlined @change="saveProject" v-model="project.name[selectedLanguage.value]" label="İsim"></q-input>
                          <q-input type="textarea" class="q-pb-md" clearable outlined @change="saveProject" v-model="project.description[selectedLanguage.value]" label="Açıklama"></q-input>
                          <q-select v-if="!selectedLanguage.deletable" class="q-pb-md"  @input="saveProject" label="Tema Seçimi" outlined v-model="project.register_form.login_register_theme" map-options :options="themeOptions"></q-select>
                          <q-select v-if="!selectedLanguage.deletable" class="q-pb-md"  @input="saveProject" label="Yayın Ekranı Seçimi" outlined v-model="project.stream_settings.layout" map-options :options="streamLayoutOptions"></q-select>
                          <q-toggle v-if="!selectedLanguage.deletable" @input="saveProject" class="text-grey-9 q-ml-lg" v-model="project.live_support_enabled" label="Canlı Destek (Revechat) Aktif mi?"  :true-value="true" :false-value="false" />
                          <q-toggle v-if="!selectedLanguage.deletable" @input="saveProject" class="text-grey-9 q-ml-lg" v-model="project.show_forget_password_at_login" label="Giriş ekranlarında şifremi unuttum linki görüntülensin mi?"  :true-value="true" :false-value="false" />
                          <q-toggle v-if="!selectedLanguage.deletable" @input="saveProject" class="text-grey-9 q-ml-lg" v-model="project.show_login_link_at_register" label="Kayıt ekranlarında giriş yap linki görüntülensin mi?"  :true-value="true" :false-value="false" />
                          <q-toggle v-if="!selectedLanguage.deletable" @input="saveProject" class="text-grey-9 q-ml-lg" v-model="project.show_register_link_at_login" label="Giriş ekranlarında kayıt ol linki görüntülensin mi?"  :true-value="true" :false-value="false" />
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-select v-if="!selectedLanguage.deletable" class="q-pb-md"  @input="saveProject" label="Katılım Tipi" outlined v-model="project.login_type" map-options :options="loginOptions"></q-select>
                          <q-input v-if="!selectedLanguage.deletable" class="q-pb-md" clearable outlined @change="saveProject" v-model="project.default_language" label="Varsayılan Dil"></q-input>
                          <q-input v-if="!selectedLanguage.deletable" class="q-pb-md" clearable outlined @change="saveProject" v-model="project.domain" label="Alan Adı"></q-input>
                          <q-input v-if="!selectedLanguage.deletable" class="q-pb-md" clearable outlined @change="saveProject" v-model="project.password" label="Genel Giriş Şifresi"></q-input>
                          <q-input v-if="!selectedLanguage.deletable" class="q-pb-md" clearable outlined @change="saveProject" v-model="project.stats_password" label="İstatistik Ekranı Şifresi"></q-input>
                        </div>
                        <div v-if="!selectedLanguage.deletable" class="col-md-6 col-sm-12 col-xs-12">
                          <p class="">Başlangıç Tarihi</p>
                          <div class="q-gutter-md row items-start">
                            <q-date @input="saveProject" v-model="project.start_date" mask="YYYY-MM-DD HH:mm" />
                            <q-time @input="saveProject" v-model="project.start_date" mask="YYYY-MM-DD HH:mm" />
                          </div>
                        </div>
                        <div v-if="!selectedLanguage.deletable" class="col-md-6 col-sm-12 col-xs-12">
                          <p class="">Bitiş Tarihi</p>
                          <div class="q-gutter-md row items-start">
                            <q-date @input="saveProject" v-model="project.end_date" mask="YYYY-MM-DD HH:mm" />
                            <q-time @input="saveProject" v-model="project.end_date" mask="YYYY-MM-DD HH:mm" />
                          </div>
                        </div>
                      </div>
                    </q-card-section>
                    <q-card-section v-if="tab === 'sms' && !selectedLanguage.deletable">
                      <div class="row q-pa-md">
                        <q-input type="textarea" class="full-width" clearable outlined v-model="sms_text" label="SMS Metni"></q-input>
                      </div>
                      <div class="row q-pa-md">
                        <q-btn color="green-8" @click="sendSMS" label="Tüm Kayıtlı Ziyaretçilere Gönder"></q-btn>
                      </div>
                    </q-card-section>
                    <q-card-section v-if="tab === 'gdpr'">
                      <div class="row q-col-gutter-md">
                        <div class="col-12">
                          <q-item-label  class="q-pb-md text-grey-8">PDF Yükle</q-item-label>
                          <q-uploader
                            :factory="uploadPDF"
                            label="PDF Yükleyin. Dosya adresi altta belirecektir."
                            auto-upload
                            no-thumbnails
                            flat
                            bordered
                            class="full-width q-mb-md"
                            max-files="1"
                            multiple
                            accept="*/*"
                          />
                        </div>
                        <div class="col-12">
                          <p><q-icon name="las la-copy" size="md"  @click="()=>{copyToClipboard(
                              pdfLink
                              ); $q.notify({
                              message: 'Link kopyalandı',
                              color: 'green-8',
                              position: 'top'
                            })}"></q-icon>{{pdfLink}}</p>
                        </div>
                        <div class="col-12">
                          <q-toggle @input="saveProject" class="text-grey-9 q-ml-lg" v-model="project.gdpr_disabled[selectedLanguage.value]" label="Bu dil için KVKK & GDPR'ı gizle."  :true-value="true" :false-value="false" />
                        </div>
                        <div class="col-12">
                          <q-input clearable outlined @change="saveProject" v-model="project.gdpr_title[selectedLanguage.value]" label="KVKK & GDPR buton yazısı"></q-input>
                        </div>
                        <div class="col-12">
                          <q-input type="textarea" clearable outlined @change="saveProject" v-model="project.gdpr_text[selectedLanguage.value]" label="IFrame ise buraya yapıştır."></q-input>
                        </div>
                        <div class="col-12">
                          <q-editor @focusout="saveProject" v-model="project.gdpr_text[selectedLanguage.value]" min-height="10rem" />
                        </div>
                      </div>
                    </q-card-section>
                    <q-card-section v-if="tab === 'qa' && !selectedLanguage.deletable">
                      <q-toggle @input="saveProject" class="text-grey-9 q-ml-lg" v-model="project.qa_enabled" label="Test Modülü Aktif Mi?"  :true-value="true" :false-value="false" />
                    </q-card-section>
                    <q-card-section v-if="tab === 'ask'">

                      <div class="row  q-col-gutter-md">
                        <div class="col-12">
                          <q-input clearable outlined @change="saveProject" v-model="project.ask_questions[selectedLanguage.value]" label="Soru Sor Butonu Metni"></q-input>
                        </div>
                      </div>
                      <div v-if="!selectedLanguage.deletable" class="row  q-col-gutter-md">
                        <q-toggle @input="saveProject" class="text-grey-9 q-ml-lg" v-model="project.ask_questions.enabled" label="Soru Sorma Modülü Aktif Mi?"  :true-value="true" :false-value="false" />
                      </div>
                      <div v-if="!selectedLanguage.deletable" class="row  q-col-gutter-md">
                        <q-toggle @input="saveProject" class="text-grey-9 q-ml-lg" v-model="project.ask_questions.moderated" label="Sorular Moderasyonlu mu?"  :true-value="true" :false-value="false" />
                      </div>
                      <div v-if="!selectedLanguage.deletable" class="row  q-col-gutter-md">
                        <q-toggle @input="saveProject" class="text-grey-9 q-ml-lg" v-model="project.ask_questions.show_on_visitor_screen" label="Sorular Yayın Ekranında Görüntülensin mi?"  :true-value="true" :false-value="false" />
                      </div>
                      <div  class="row q-px-xl  q-col-gutter-md" v-if="project.ask_questions.enabled && !selectedLanguage.deletable">
                        <div class="q-gutter-sm">
                          <q-radio @input="saveProject" v-model="project.ask_questions.question_placement" val="button" label="Buton İle Aç" />
                          <q-radio @input="saveProject" v-model="project.ask_questions.question_placement" val="module" label="Modül Olarak Göster" />
                        </div>
                      </div>
                    </q-card-section>
                    <q-card-section v-if="tab === 'login'">
                      <div class="row q-col-gutter-md">
                        <q-item class="col-12 no-margin">
                          <h5 class="text-h5 no-margin">Çeviriler</h5>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Giriş Yap" hint="Giriş Sayfası üstünde bulunan başlık" v-model="project.login_settings.translate.loginTitle[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Giriş Yap" hint="Giriş yap butonu" v-model="project.login_settings.translate.login[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Lütfen Bekleyin" hint="Beklerken butonda görünen metin." v-model="project.login_settings.translate.pleaseWait[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Kod Gönder" hint="Sms ile kod gönderileceği zaman görünür." v-model="project.login_settings.translate.sendCode[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Hesabınız yok mu? Kayıt olun." hint="Kayıda yönlendirme linki." v-model="project.login_settings.translate.registerNow[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Şifrenizi mi unuttunuz?" hint="Şifre hatırlatma linki." v-model="project.login_settings.translate.forgotPassword[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Şifrenizi girin" hint="Şifre inputu." v-model="project.login_settings.translate.enterPassword[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Eposta adresinizi girin" hint="Eposta inputu." v-model="project.login_settings.translate.enterEmail[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Hatalı Şifre" hint="Hata mesajı." v-model="project.login_settings.translate.invalidPassword[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Hatalı Telefon" hint="Hata mesajı." v-model="project.login_settings.translate.invalidPhone[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Hatalı SMS Kodu" hint="Hata mesajı." v-model="project.login_settings.translate.invalidCode[selectedLanguage.value]"></q-input>
                        </q-item>
                      </div>
                    </q-card-section>
                    <q-card-section v-if="tab === 'register'" class="q-mb-md">
                      <div v-if="!selectedLanguage.deletable" class="row q-col-gutter-md">
                        <q-toggle @input="saveProject" class="text-grey-9 q-ml-lg" v-model="project.disable_create" label="Sadece excel listesi ile yüklenenler kayıt olabilsin"  :true-value="true" :false-value="false" />
                      </div>
                      <q-separator v-if="!selectedLanguage.deletable"></q-separator>
                      <div v-if="!selectedLanguage.deletable" class="row q-col-gutter-md">
                        <q-toggle @input="saveProject" class="text-grey-9 q-ml-lg" v-model="project.send_sms_after_registration" label="Kayıttan sonra doğrulama sms'i gönder"  :true-value="true" :false-value="false" />
                      </div>
                      <q-separator v-if="!selectedLanguage.deletable"></q-separator>
                      <div v-if="!selectedLanguage.deletable" class="row q-col-gutter-md">
                        <q-toggle @input="saveProject" class="text-grey-9 q-ml-lg" v-model="project.register_form.show_login_link_at_success" label="Kayıttan sonra açılan takvimde giriş linkini göster."  :true-value="true" :false-value="false" />
                      </div>
                      <q-separator v-if="!selectedLanguage.deletable"></q-separator>
                      <div v-if="!selectedLanguage.deletable" class="row q-col-gutter-md">
                        <q-toggle @input="saveProject" class="text-grey-9 q-ml-lg" v-model="project.register_form.use_own_password" label="Kullanıcılar kendi belirledikleri şifre ile giriş yapsınlar. (Sorulara şifre alanı eklenmelidir.)"  :true-value="true" :false-value="false" />
                      </div>
                      <q-separator v-if="!selectedLanguage.deletable"></q-separator>
                      <div v-if="!selectedLanguage.deletable" class="row q-col-gutter-md">
                        <q-toggle @input="saveProject" class="text-grey-9 q-ml-lg" v-model="project.register_form.use_common_password" label="Kullanıcılar eposta adresi ve genel yayın şifresi ile giriş yapsınlar."  :true-value="true" :false-value="false" />
                      </div>
                      <div v-if="!selectedLanguage.deletable" class="row q-col-gutter-md">
                        <q-select v-if="!selectedLanguage.deletable" class="q-pb-md col-12 full-width"  @input="saveProject" label="Ana sayfadan yönlendirilecek sayfayı seçin." outlined v-model="project.register_form.default_route" map-options :options="[
                          {
                            label: 'Kayıt Sayfası',
                            value: 'live.register'
                          },
                          {
                            label: 'Giriş Sayfası',
                            value: 'live.login'
                          }
                        ]"></q-select>
                      </div>
                      <q-separator v-if="!selectedLanguage.deletable"></q-separator>
                      <div class="row q-col-gutter-md">
                        <q-toggle @input="saveProject" class="text-grey-9 q-ml-lg" v-model="project.register_form.send_email" label="Kayıttan sonra eposta gönderilsin mi?"  :true-value="true" :false-value="false" />
                      </div>
                      <q-separator v-if="project.register_form.send_email"></q-separator>
                      <div class="row q-col-gutter-md" v-if="project.register_form.send_email">
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-input clearable outlined @change="saveProject" v-model="project.register_form.email_subject[selectedLanguage.value]" label="E-Posta Konusu"></q-input>
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-input clearable outlined @change="saveProject" v-model="project.register_form.email_sender_name[selectedLanguage.value]" label="E-Posta Gönderen İsmi"></q-input>
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-input clearable outlined @change="saveProject" v-model="project.register_form.email_footer_text[selectedLanguage.value]" label="Footer Yazısı"></q-input>
                        </div>
                        <div class="col-md-6 col-sm-12 col-xs-12">
                          <q-input clearable outlined @change="saveProject" v-model="project.register_form.email_string[selectedLanguage.value]" label="E-Posta Ön Özet"></q-input>
                        </div>
                        <div class="col-12">
                          <q-item-label  class="q-pb-md text-grey-8">E-Posta İçeriği </q-item-label>
                          <q-editor @focusout="saveProject"  v-model="project.register_form.email_content[selectedLanguage.value]" min-height="10rem" />
                        </div>
                        <div class="col-3">
                          <q-item-label  class="q-pb-md text-grey-8">E-Posta Logosu <q-btn @click="()=>{ project.register_form.email_logo[selectedLanguage.value] = null; saveProject()}" size="sm" icon="las la-ban" dense color="red-8">Kaldır</q-btn> </q-item-label>
                          <q-uploader
                            :factory="uploadEmailLogo"
                            :label="$t('inputs.selectImage')"
                            auto-upload
                            no-thumbnails
                            flat
                            bordered
                            class="full-width q-mb-md"
                            max-files="1"
                            multiple
                            accept=".jpg, image/*"
                          />
                          <q-img width="100%" :src="project.register_form.email_logo[selectedLanguage.value]"></q-img>
                        </div>
                      </div>
                      <q-separator v-if="!selectedLanguage.deletable"></q-separator>
                    </q-card-section>
                    <q-card-section v-if="tab === 'embed'">
                      <q-input class="q-pb-md" type="textarea" clearable outlined @change="saveProject" v-model="project.embed[selectedLanguage.value]" label="Embed Kodu"></q-input>
                      <div class="row" v-if="project.embed_top && project.embed_top_lang">
                        <div class="col-12">
                          <q-input class="q-pb-md" type="textarea" clearable outlined @change="saveProject" v-model="project.embed_top[selectedLanguage.value]" label="Embed'in Üstüne Gelir. HTML Koyulabilir."></q-input>
                        </div>
                        <div class="col-12">
                          <q-input class="q-pb-md"  clearable outlined @change="saveProject" v-model="project.embed_top_lang[selectedLanguage.value]" label="Embed'in Üstündeki HTML bloğu gideceği dilin kısa ismi."></q-input>
                        </div>
                      </div>
                    </q-card-section>
                    <q-card-section v-if="tab === 'theme'">
                      <div  v-if="!selectedLanguage.deletable" class="row q-mt-md q-mb-md">
                        <q-toggle @input="saveProject" class="text-grey-9 q-ml-lg" v-model="project.header_enabled" label="Sitede Header Bölümü Olsun Mu?"  :true-value="true" :false-value="false" />
                      </div>
                      <div  v-if="!selectedLanguage.deletable" class="row q-mt-md q-mb-md">
                        <q-toggle @input="saveProject" class="text-grey-9 q-ml-lg" v-model="project.login_show_name_title" label="Kayıt ve giriş ekranlarında proje adı ve açıklaması görünsün mü?"  :true-value="true" :false-value="false" />
                      </div>
                      <q-separator  v-if="!selectedLanguage.deletable"></q-separator>
                      <div  v-if="!selectedLanguage.deletable" class="row q-col-gutter-md q-my-md">
                        <div class="col-lg-2 col-md-2 col-sm-3 col-xs-4">
                          <q-item-label  class="q-pb-md text-grey-8">Arka Plan Rengi</q-item-label>
                          <q-color @input="saveProject" format-model="hex" no-footer  style="max-height: 380px; min-width: 100%" v-model="project.bg_color" class="my-picker" />
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-3 col-xs-4">
                          <q-item-label  class="q-pb-md text-grey-8">Yayın Ekranı Buton Renkleri</q-item-label>
                          <q-color @input="saveProject" format-model="hex" no-footer  style="max-height: 380px; min-width: 100%" v-model="project.btn_color" class="my-picker" />
                        </div>
                        <div class="col-lg-2 col-md-2 col-sm-3 col-xs-4">
                          <q-item-label  class="q-pb-md text-grey-8">Yayın Ekranı Buton Büyüklüğü</q-item-label>
                          <div class="q-gutter-sm">
                            <q-input @change="saveProject" v-model.number.trim="project.btn_size" clearable outlined suffix="px" />
                          </div>
                        </div>
                      </div>
                      <q-separator  v-if="!selectedLanguage.deletable"></q-separator>
                      <div class="row q-col-gutter-md q-mt-md">
                        <div class="col-md-4 col-sm-6 col-xs-12">
                          <q-item-label  class="q-pb-md text-grey-8">Arka Plan Resmi <q-btn @click="()=>{ project.bg_image[selectedLanguage.value] = null; saveProject()}" size="sm" icon="las la-ban" dense color="red-8">Kaldır</q-btn> </q-item-label>
                          <q-uploader
                            :factory="uploadFile"
                            :label="$t('inputs.selectImage')"
                            auto-upload
                            no-thumbnails
                            flat
                            bordered
                            class="full-width q-mb-md"
                            max-files="1"
                            multiple
                            accept=".jpg, image/*"
                          />
                          <q-img width="100%" :src="project.bg_image[selectedLanguage.value]"></q-img>
                        </div>
                        <div class="col-md-4 col-sm-6 col-xs-12">
                          <q-item-label  class="q-pb-md text-grey-8">Üst Menü Logo <q-btn @click="()=>{ project.header_logo[selectedLanguage.value] = null; saveProject()}" size="sm" icon="las la-ban" dense color="red-8">Kaldır</q-btn></q-item-label>
                          <q-uploader
                            :factory="uploadFileLogo"
                            :label="$t('inputs.selectImage')"
                            auto-upload
                            no-thumbnails
                            flat
                            bordered
                            class="full-width q-mb-md"
                            max-files="1"
                            multiple
                            accept=".jpg, image/*"
                          />
                          <q-img width="100%" :src="project.header_logo[selectedLanguage.value]"></q-img>
                        </div>
                        <div class="col-md-4 col-sm-6 col-xs-12">
                          <q-item-label  class="q-pb-md text-grey-8">Favicon<q-btn @click="()=>{ project.favicon[selectedLanguage.value] = null; saveProject()}" size="sm" icon="las la-ban" dense color="red-8">Kaldır</q-btn></q-item-label>
                          <q-uploader
                            :factory="uploadFileFavicon"
                            :label="$t('inputs.selectImage')"
                            auto-upload
                            no-thumbnails
                            flat
                            bordered
                            class="full-width q-mb-md"
                            max-files="1"
                            multiple
                            accept=".jpg, image/*"
                          />
                          <q-img width="100%" :src="project.favicon[selectedLanguage.value]"></q-img>
                        </div>
                        <div class="col-md-4 col-sm-6 col-xs-12">
                          <q-item-label  class="q-pb-md text-grey-8">Giriş ve Kayıt Ekranı Görseli  <q-btn @click="()=>{ project.login_image[selectedLanguage.value] = null; saveProject()}" size="sm" icon="las la-ban" dense color="red-8">Kaldır</q-btn></q-item-label>
                          <q-uploader
                            :factory="uploadLogin"
                            :label="$t('inputs.selectImage')"
                            auto-upload
                            no-thumbnails
                            flat
                            bordered
                            class="full-width q-mb-md"
                            max-files="1"
                            multiple
                            accept="image/*"
                          />
                          <q-img height="100px" width="300px"  :src="project.login_image[selectedLanguage.value]"></q-img>
                        </div>
                        <div class="col-md-4 col-sm-6 col-xs-12">
                          <q-item-label  class="q-pb-md text-grey-8">Giriş ve Kayıt Ekranı Responsive Tema Küçük Görseli  <q-btn @click="()=>{ project.login_image_small[selectedLanguage.value] = null; saveProject()}" size="sm" icon="las la-ban" dense color="red-8">Kaldır</q-btn></q-item-label>
                          <q-uploader
                            :factory="uploadLoginSmall"
                            :label="$t('inputs.selectImage')"
                            auto-upload
                            no-thumbnails
                            flat
                            bordered
                            class="full-width q-mb-md"
                            max-files="1"
                            multiple
                            accept="image/*"
                          />
                          <q-img height="100px" width="300px"  :src="project.login_image_small[selectedLanguage.value]"></q-img>
                        </div>
                      </div>
                    </q-card-section>
                    <div class="q-pa-md" v-if="tab === 'register'">
                      <div class="row q-mb-xl" v-if="project">
                        <div class="col-12">
                          <q-btn align="around" class="btn-fixed-width" push color="green-8" label=" Yeni Seçenek Ekle" icon="las la-plus" >
                            <q-tooltip anchor="top middle" transition-show="flip-right" transition-hide="flip-left" self="center middle">
                              Yeni Seçenek Ekle
                            </q-tooltip>
                            <q-menu>
                              <div  :key="'key_' + key" v-for="(questionType, key) in questionTypes" >
                                <div class="row">
                                  <q-btn class="full-width q-btn--no-uppercase" unelevated align="left" size="md" :text-color="questionType.color" @click="addQuestionToRegisterForm(questionType.name)" :icon="questionType.icon" :label="questionType.label"></q-btn>
                                </div>
                                <q-separator v-if="questionType.seperator"></q-separator>
                              </div>
                            </q-menu>
                          </q-btn>
                        </div>
                        <draggable @change="saveProject" class="full-width" handle=".handle" v-model="project.register_form.questions">
                          <transition-group>
                            <div class="col-md-12 col-sm-12 col-xs-12 q-pt-md" v-for="(question, key) in project.register_form.questions" :key="'key_' + key" >
                              <q-card>
                                <q-list>
                                  <q-expansion-item switch-toggle-side class="text-grey-8" icon="explore" group="questions">
                                    <q-separator />
                                    <template v-slot:header>
                                      <q-item-section avatar class="handle" style="cursor: grab;" v-if="$q.screen.gt.xs">
                                        <q-avatar icon="la la-arrows-alt-v" style="min-width: 25px; padding-right:0;" />
                                      </q-item-section>
                                      <q-item-section class="handle" style="cursor: grab;">
                                  <span style="font-size: 16px;">
                                    <span v-if="question.meta && question.meta.contact_field" style="margin-bottom: 3px;" class="q-pr-xs text-blue-grey text-bold" >
                                     {{ question.meta.contact_field_sn }}
                                      <q-tooltip anchor="top left" self="center left" transition-show="flip-right" transition-hide="flip-left">
                                        {{ question.meta.contact_field.toUpperCase() }}
                                      </q-tooltip>
                                    </span>
                                    <q-icon v-else style="margin-bottom: 4px; font-size: 22px;" :color="questionTypes.find(x=>x.name === question.type).color" :class="['q-pr-xs', questionTypes.find(x=>x.name === question.type).icon]" >
                                      <q-tooltip anchor="top left" self="center left" transition-show="flip-right" transition-hide="flip-left">
                                        {{ question.type.toUpperCase() }}
                                      </q-tooltip>
                                    </q-icon>
                                  {{question.question[selectedLanguage.value]}}
                                  </span>
                                        <small v-if="question.description">{{question.description}}</small>
                                      </q-item-section>
                                    </template>
                                    <q-card>
                                      <q-card-section>
                                        <div class="row">
                                          <div class="col-md-4 col-sm-12 col-xs-12 q-pa-md">
                                            <q-input clearable outlined @change="saveProject" v-model="project.register_form.questions[key].question[selectedLanguage.value]" :label="$t('inputs.question')"></q-input>
                                            <q-input clearable outlined @change="saveProject" v-if="project.register_form.questions[key].meta && project.register_form.questions[key].meta.contact_field === 'phone'" v-model="project.register_form.questions[key].placeholder[selectedLanguage.value]" :label="'Placeholder'"></q-input>
                                            <q-input clearable outlined @change="saveProject" v-if="project.register_form.questions[key].meta && project.register_form.questions[key].meta.contact_field === 'phone'" v-model="project.register_form.questions[key].mask[selectedLanguage.value]" placeholder="###-#######" :label="'Maske'"></q-input>
                                            <q-input clearable outlined class="q-pt-md" @change="saveProject" v-model="project.register_form.questions[key].description" :label="$t('inputs.questionDesc')" type="textarea"></q-input>
                                            <div v-if="['selectbox', 'checkbox', 'radio'].indexOf(project.register_form.questions[key].type) > -1">
                                              <q-btn label="Yeni Seçenek Ekle" @click="newValueToRegisterOptions(key); $forceUpdate()" color="green-8" unelevated flat icon="la la-plus" />
                                              <q-input v-model="option.name[selectedLanguage.value]" @change="saveProject" outlined clearable :key="option_key" v-for="(option, option_key) in project.register_form.questions[key].options" class="q-py-sm"  :label="$t('forms.typeYourOption')">
                                                <template v-if="!selectedLanguage.deletable" v-slot:after>
                                                  <q-btn @click="removeValueFromRegisterOptions(key, option_key); saveProject(); $forceUpdate()" color="red-8" unelevated flat icon="la la-trash" />
                                                </template>
                                              </q-input>
                                            </div>
                                            <div v-if="project.register_form.questions[key].type === 'gender'">
                                              <q-input v-model="option.name[selectedLanguage.value]" @change="saveProject" outlined clearable :key="option_key" v-for="(option, option_key) in project.register_form.questions[key].options" class="q-py-sm"  :label="$t('forms.typeYourOption')">
                                                <template v-slot:after>
                                                  <q-btn :color="option.value === 'f' ? 'pink-8' : 'blue-8'" unelevated flat :icon="option.value === 'f' ? 'las la-female' : 'las la-male'" >
                                                    <q-tooltip anchor="top left" self="center left" transition-show="flip-right" transition-hide="flip-left">
                                                      {{option.value === 'f' ? $t('common.genders.f') : $t('common.genders.m')}}
                                                    </q-tooltip>
                                                  </q-btn>
                                                </template>
                                              </q-input>
                                            </div>
                                            <div v-if="project.register_form.questions[key].pro && project.register_form.questions[key].pro.type === 'reg_pass'">
                                              <q-input v-model="project.register_form.questions[key].pro.password" @change="saveProject" outlined clearable  class="q-py-sm"  label="Parolayı Belirleyin">
                                              </q-input>
                                            </div>
                                            <q-toggle
                                              :label="$t('forms.isQuestionRequired')"
                                              color="orange-8"
                                              v-model="project.register_form.questions[key].is_required"
                                              :true-value="true"
                                              :false-value="false"
                                              :val="false"
                                              @input="saveProject"
                                            />
                                            <q-separator></q-separator>
                                            <q-toggle
                                              label="Büyük küçük harf duyarlı olsun mu?"
                                              color="orange-8"
                                              v-model="project.register_form.questions[key].is_case_sensitive"
                                              :true-value="true"
                                              :false-value="false"
                                              :val="false"
                                              @input="saveProject"
                                            />
                                            <q-separator></q-separator>
                                            <q-btn
                                              unelevated
                                              :label="$t('buttons.deleteQuestion')"
                                              text-color="red-4"
                                              size="md"
                                              class="q-btn--no-uppercase"
                                              icon="la la-trash"
                                              @click="deleteRegisterQuestion(key)"
                                            />
                                          </div>
                                        </div>
                                      </q-card-section>
                                    </q-card>
                                    <q-separator />
                                  </q-expansion-item>
                                </q-list>
                              </q-card>
                            </div>
                          </transition-group>
                        </draggable>
                      </div>
                      <q-separator spaced></q-separator>
                      <div v-if="!selectedLanguage.deletable" class="row q-col-gutter-md ">
                        <div class="col-md-12 col-sm-12 col-xs-12">
                          <h5 class="text-h5 no-margin">Kişileri Yüklemek İçin Excel Dosyası Yükleyin</h5>
                          <q-uploader
                            :factory="uploadExcel"
                            :label="'Dosya Seçin'"
                            auto-upload
                            no-thumbnails
                            flat
                            bordered
                            class="full-width"
                            max-files="1"
                            multiple
                            accept=".xlsx, .xls, .csv"
                          />
                          <q-input v-if="project.excel" readonly outlined @change="saveProject" v-model="project.excel.file" label="Yüklenen Excel Dosyası (Adresi Kayıt Edin)"></q-input>
                        </div>
                        <div class="col-md-12 col-sm-12 col-xs-12">
                          <download-excel
                            name="Taslak.xls"
                            type="xls"
                            :data="[{'email': 'ornek@mail.com'}]"
                            :fields="excelFields"
                          >
                            <q-btn
                              color="primary"
                              icon-right="archive"
                              label="Örnek Excel Dosyası Şablonu İndir"
                              no-caps
                            />
                          </download-excel>
                        </div>
                      </div>
                      <q-separator spaced></q-separator>
                      <div class="row q-col-gutter-md">
                        <q-item class="col-12 no-margin">
                          <h5 class="text-h5 no-margin">Çeviriler</h5>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Kayıt Ol" hint="Kayıt Sayfası üstünde bulunan başlık" v-model="project.register_settings.translate.registerTitle[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Kayıt Ol" hint="Kayıt ol butonu" v-model="project.register_settings.translate.register[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Tamam" hint="Tamam butonu" v-model="project.register_settings.translate.ok[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Giriş Linkiniz" hint="Modalda çıkan giriş linki yazısı" v-model="project.register_settings.translate.hereYourLink[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Linke Git" hint="Modalda çıkan linke git yazısı" v-model="project.register_settings.translate.goToLink[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Lütfen Bekleyin" hint="Beklerken butonda görünen metin." v-model="project.register_settings.translate.pleaseWait[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Lütfen Seçiniz" hint="Select soru tipi varsayılan seçim." v-model="project.register_settings.translate.pleaseSelect[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Şartları ve koşulları kabul ediyorum." hint="Varsayılan GDPR tik'i yazısı." v-model="project.register_settings.translate.gdprTitle[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Kaydet." hint="Kaydet butonu." v-model="project.register_settings.translate.save[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Hesabınız var mı? Giriş Yapın." hint="Girişe yönlendirme linki." v-model="project.register_settings.translate.loginNow[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label=".. alanı zorunludur." hint="Validasyon hatası." v-model="project.register_settings.translate.isRequired[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label=".. alanı gerçek bir eposta adresi olmalıdır!" hint="Validasyon hatası." v-model="project.register_settings.translate.mustBeEmail[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label=".. alanı 11 haneli olmalıdır!" hint="TC Kimlik Validasyon hatası." v-model="project.register_settings.translate.mustBe11[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Şartları ve koşulları kabul etmelisiniz!" hint="KVKK Validasyon hatası." v-model="project.register_settings.translate.mustAcceptGDPR[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Başarıyla kayıt edildi. Şifrenizle giriş yapın!" hint="Başarılı mesajı.." v-model="project.register_settings.translate.loginWithYourPassword[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Başarıyla kayıt edildi. Bigliler eposta adresinize gönderildi!" hint="Başarılı mesajı.." v-model="project.register_settings.translate.loginSentEmail[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Başarıyla kayıt edildi. Telefon numaranızı kullanarak giriş yapabilirsiniz!" hint="Başarılı mesajı.." v-model="project.register_settings.translate.loginWithYourPhone[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Başarıyla kayıt edildi!" hint="Başarılı mesajı.." v-model="project.register_settings.translate.registerSuccess[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Bu eposta adresi ile zaten kayıt var!" hint="Hata mesajı.." v-model="project.register_settings.translate.alreadyRegistered[selectedLanguage.value]"></q-input>
                        </q-item>
                        <q-item class="col-sm-6 col-xs-12 no-margin">
                          <q-input class="full-width" @change="saveProject" outlined label="Bir hata oluştu!" hint="Hata mesajı.." v-model="project.register_settings.translate.anErrorOccured[selectedLanguage.value]"></q-input>
                        </q-item>
                      </div>
                     </div>
                    <div class="q-pa-md" v-if="tab === 'ask'">
                      <div class="row" v-if="project">
                        <div class="col-12 q-pt-md">
                          <q-btn align="around" class="btn-fixed-width" push color="green-8" :label="$t('forms.question')" icon="las la-plus" >
                            <q-tooltip anchor="top middle" transition-show="flip-right" transition-hide="flip-left" self="center middle">
                              {{ $t('buttons.createNewQuestion') }}
                            </q-tooltip>
                            <q-menu>
                              <div  :key="'key_' + key" v-for="(questionType, key) in simpleQuestionTypes" >
                                <div class="row">
                                  <q-btn class="full-width q-pa-xs q-btn--no-uppercase" unelevated align="left" size="md" :text-color="questionType.color" @click="addQuestionToAskForm(questionType.name)" :icon="questionType.icon" :label="questionType.label"></q-btn>
                                </div>
                                <q-separator v-if="questionType.seperator"></q-separator>
                              </div>
                            </q-menu>
                          </q-btn>
                        </div>
                        <draggable @change="saveProject" class="full-width" handle=".handle" v-model="project.ask_questions.questions">
                          <transition-group>
                            <div class="col-md-12 col-sm-12 col-xs-12 q-pt-md" v-for="(question, key) in project.ask_questions.questions" :key="'key_' + key" >
                              <q-card>
                                <q-list>
                                  <q-expansion-item switch-toggle-side class="text-grey-8" icon="explore" group="questions">
                                    <q-separator />
                                    <template v-slot:header>
                                      <q-item-section avatar class="handle" style="cursor: grab;" v-if="$q.screen.gt.xs">
                                        <q-avatar icon="la la-arrows-alt-v" style="min-width: 25px; padding-right:0;" />
                                      </q-item-section>
                                      <q-item-section class="handle" style="cursor: grab;">
                                  <span style="font-size: 16px;">
                                    <span v-if="question.meta && question.meta.contact_field" style="margin-bottom: 3px;" class="q-pr-xs text-blue-grey text-bold" >
                                     {{ question.meta.contact_field_sn }}
                                      <q-tooltip anchor="top left" self="center left" transition-show="flip-right" transition-hide="flip-left">
                                        {{ question.meta.contact_field.toUpperCase() }}
                                      </q-tooltip>
                                    </span>
                                    <q-icon v-else style="margin-bottom: 4px; font-size: 22px;" :color="questionTypes.find(x=>x.name === question.type).color" :class="['q-pr-xs', questionTypes.find(x=>x.name === question.type).icon]" >
                                      <q-tooltip anchor="top left" self="center left" transition-show="flip-right" transition-hide="flip-left">
                                        {{ question.type.toUpperCase() }}
                                      </q-tooltip>
                                    </q-icon>
                                  {{question.question[selectedLanguage.value]}}
                                  </span>
                                        <small v-if="question.description">{{question.description}}</small>
                                      </q-item-section>
                                    </template>
                                    <q-card>
                                      <q-card-section>
                                        <div class="row">
                                          <div class="col-md-4 col-sm-12 col-xs-12 q-pa-md">
                                            <q-input clearable outlined @change="saveProject" v-model="project.ask_questions.questions[key].question[selectedLanguage.value]" :label="$t('inputs.question')"></q-input>
                                            <q-input clearable outlined class="q-pt-md" @change="saveProject" v-model="project.ask_questions.questions[key].description" :label="$t('inputs.questionDesc')" type="textarea"></q-input>
                                            <q-separator></q-separator>
                                            <q-btn
                                              unelevated
                                              :label="$t('buttons.deleteQuestion')"
                                              text-color="red-4"
                                              size="md"
                                              class="q-btn--no-uppercase"
                                              icon="la la-trash"
                                              @click="deleteAskQuestion(key)"
                                            />
                                          </div>
                                        </div>
                                      </q-card-section>
                                    </q-card>
                                    <q-separator />
                                  </q-expansion-item>
                                </q-list>
                              </q-card>
                            </div>
                          </transition-group>
                        </draggable>
                      </div>
                    </div>
                  </template>
                </q-splitter>
              </q-card>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import axios from 'axios'
import draggable from 'vuedraggable'
import { copyToClipboard, exportFile } from 'quasar'

export default {
  name: 'ShowProject',
  meta () {
    return {
      title: this.projectTitle,
      titleTemplate: title => `${title} `
    }
  },
  components: {
    draggable
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('projects/clearProject')
    next()
  },
  data () {
    return {
      addLang: false,
      addLangInputs: {
        label: '',
        value: '',
        deletable: true,
        icon: null
      },
      selectedLanguage: null,
      pdfLink: '',
      sms_text: '',
      splitterModel: 20,
      copyToClipboard,
      exportFile,
      registerOptionLabel: '',
      mes: '',
      moment,
      streamLayoutOptions: [
        {
          label: 'Default',
          value: 1
        },
        {
          label: 'Pro',
          value: 2
        }
      ],
      themeOptions: [
        {
          label: 'Oxy 1',
          value: 1
        }
      ],
      loginOptions: [
        {
          label: 'Herkes Girebilir',
          value: 'all'
        },
        {
          label: 'Genel Yayın Şifresi İle Giriş Yap',
          value: 'password'
        },
        {
          label: 'Kayıt Ol',
          value: 'register_mail'
        },
        {
          label: 'Kayıt Ol ve Ardından Yönlendir',
          value: 'register_enter'
        },
        {
          label: 'Kayıt Ol ve SMS Doğrulaması İle Giriş Yap (Telefon Sorusu Sorulmalıdır)',
          value: 'register_sms'
        }
      ],
      tab: 'common'
    }
  },
  created () {
    if (this.user) {
      this.$store.dispatch('projects/fetchProject', { key: this.$route.params.key }).then(res => {
        this.selectedLanguage = res.languages.find(x => x.deletable === false)
      })
    }
  },
  methods: {
    sendSMS () {
      this.$store.dispatch('projects/sendSMS', { text: this.sms_text, project: this.project.domain }).then(res => {
        this.$q.notify({
          message: 'SMS Başarıyla Gönderildi',
          color: 'green-8',
          position: 'top'
        })
      }).catch(() => {
        this.$q.notify({
          message: 'Bir hata oluştu.',
          color: 'red-8',
          position: 'top'
        })
      })
    },
    newValueToRegisterOptions (questionKey) {
      this.project.register_form.questions[questionKey].options.push({
        name: {
        },
        key: new Date().getTime()
      })
      this.registerOptionLabel = ''
      this.saveProject()
    },
    removeValueFromRegisterOptions (questionKey, optionKey) {
      this.project.register_form.questions[questionKey].options.splice(optionKey, 1)
    },
    deleteRegisterQuestion (key) {
      this.$q.dialog({
        title: this.$t('forms.validation.questions.confirm'),
        message: this.$t('forms.validation.questions.wouldYouLikeToDelete'),
        cancel: {
          label: this.$t('forms.validation.questions.cancel'),
          class: 'q-btn--no-uppercase',
          color: 'grey-2',
          textColor: 'blue'
        },
        ok: {
          label: this.$t('forms.validation.questions.delete'),
          classList: 'q-btn--no-uppercase',
          color: 'grey-2',
          textColor: 'red'
        },
        persistent: true
      }).onOk(() => {
        this.project.register_form.questions.splice(key, 1)
        this.saveProject()
      })
    },
    addQuestionToRegisterForm (type) {
      switch (type) {
        case 'password':
          this.project.register_form.questions.push({
            question: {},
            placeholder: {},
            mask: {},
            key: new Date().getTime(),
            type: 'string',
            meta: {
              contact_field: 'password',
              contact_field_sn: 'PW'
            },
            is_required: false
          })
          break
        case 'first_name':
          this.project.register_form.questions.push({
            question: {},
            placeholder: {},
            mask: {},
            key: new Date().getTime(),
            type: 'string',
            meta: {
              contact_field: 'first_name',
              contact_field_sn: 'FN'
            },
            is_required: false
          })
          break
        case 'last_name':
          this.project.register_form.questions.push({
            question: {},
            placeholder: {},
            mask: {},
            key: new Date().getTime(),
            type: 'string',
            meta: {
              contact_field: 'last_name',
              contact_field_sn: 'LN'
            },
            is_required: false
          })
          break
        case 'email':
          this.project.register_form.questions.push({
            question: {},
            placeholder: {},
            mask: {},
            key: new Date().getTime(),
            type: 'string',
            meta: {
              contact_field: 'email',
              contact_field_sn: 'EM'
            },
            is_required: false
          })
          break
        case 'id_card':
          this.project.register_form.questions.push({
            question: {},
            placeholder: {},
            mask: {},
            key: new Date().getTime(),
            type: 'string',
            meta: {
              contact_field: 'id_card',
              contact_field_sn: 'ID'
            },
            is_required: false
          })
          break
        case 'phone':
          this.project.register_form.questions.push({
            question: {},
            placeholder: {},
            mask: {},
            key: new Date().getTime(),
            type: 'string',
            meta: {
              contact_field: 'phone',
              contact_field_sn: 'PH'
            },
            is_required: false
          })
          break
        case 'gender':
          this.project.register_form.questions.push({
            question: {},
            placeholder: {},
            mask: {},
            key: new Date().getTime(),
            type: 'gender',
            meta: {
              contact_field: 'gender',
              contact_field_sn: 'GE'
            },
            options: [
              {
                name: this.$t('common.genders.f'),
                value: 'f'
              },
              {
                name: this.$t('common.genders.m'),
                value: 'm'
              }
            ],
            is_required: false
          })
          break
        case 'reg_pass':
          this.project.register_form.questions.push({
            question: {},
            placeholder: {},
            mask: {},
            key: new Date().getTime(),
            type: 'string',
            pro: {
              type: 'reg_pass',
              password: ''
            },
            is_required: false
          })
          break
        case 'string':
          this.project.register_form.questions.push({
            question: {},
            placeholder: {},
            mask: {},
            key: new Date().getTime(),
            type: 'string',
            is_required: false
          })
          break
        case 'number':
          this.project.register_form.questions.push({
            question: {},
            placeholder: {},
            mask: {},
            key: new Date().getTime(),
            type: 'number',
            is_required: false
          })
          break
        case 'selectbox':
          this.project.register_form.questions.push({
            question: {},
            placeholder: {},
            mask: {},
            key: new Date().getTime(),
            type: 'selectbox',
            is_required: false,
            options: []
          })
          break
        case 'checkbox':
          this.project.register_form.questions.push({
            question: {},
            placeholder: {},
            mask: {},
            key: new Date().getTime(),
            type: 'checkbox',
            options: [],
            is_required: false
          })
          break
        case 'radio':
          this.project.register_form.questions.push({
            question: {},
            placeholder: {},
            mask: {},
            key: new Date().getTime(),
            type: 'radio',
            options: [],
            is_required: false
          })
          break
        default:
          this.project.register_form.questions.push({
            question: {},
            placeholder: {},
            mask: {},
            key: new Date().getTime(),
            type: 'string',
            is_required: false
          })
          break
      }
      this.saveProject()
    },
    addQuestionToAskForm (type) {
      switch (type) {
        case 'first_name':
          this.project.ask_questions.questions.push({
            question: {},
            key: new Date().getTime(),
            type: 'string',
            meta: {
              contact_field: 'first_name',
              contact_field_sn: 'FN'
            },
            is_required: false
          })
          break
        case 'last_name':
          this.project.ask_questions.questions.push({
            question: {},
            key: new Date().getTime(),
            type: 'string',
            meta: {
              contact_field: 'last_name',
              contact_field_sn: 'LN'
            },
            is_required: false
          })
          break
        case 'email':
          this.project.ask_questions.questions.push({
            question: {},
            key: new Date().getTime(),
            type: 'string',
            meta: {
              contact_field: 'email',
              contact_field_sn: 'EM'
            },
            is_required: false
          })
          break
        case 'phone':
          this.project.ask_questions.questions.push({
            question: {},
            key: new Date().getTime(),
            type: 'string',
            meta: {
              contact_field: 'phone',
              contact_field_sn: 'PH'
            },
            is_required: false
          })
          break
        case 'q':
          this.project.ask_questions.questions.push({
            question: {},
            key: new Date().getTime(),
            type: 'string',
            meta: {
              contact_field: 'q',
              contact_field_sn: 'QU'
            },
            is_required: false
          })
          break
      }
      this.saveProject()
    },
    deleteAskQuestion (key) {
      this.$q.dialog({
        title: this.$t('forms.validation.questions.confirm'),
        message: this.$t('forms.validation.questions.wouldYouLikeToDelete'),
        cancel: {
          label: this.$t('forms.validation.questions.cancel'),
          class: 'q-btn--no-uppercase',
          color: 'grey-2',
          textColor: 'blue'
        },
        ok: {
          label: this.$t('forms.validation.questions.delete'),
          classList: 'q-btn--no-uppercase',
          color: 'grey-2',
          textColor: 'red'
        },
        persistent: true
      }).onOk(() => {
        this.project.ask_questions.questions.splice(key, 1)
        this.saveProject()
      })
    },
    uploadExcel (data) {
      const self = this
      const selectedFile = data[0]
      const reader = new FileReader()
      reader.onload = function (event) {
        const data = event.target.result
        // eslint-disable-next-line
        const workbook = XLSX.read(data, {
          type: 'binary'
        })
        workbook.SheetNames.forEach(function (sheetName) {
          // eslint-disable-next-line
          const XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName])
          // eslint-disable-next-line
          const json_object = JSON.stringify(XL_row_object)
          // eslint-disable-next-line
          const data = JSON.parse(json_object)
          const project = JSON.stringify(self.project)
          const sendProject = JSON.parse(project)
          delete sendProject.gdpr_text
          delete sendProject.gdpr_title
          for (let i = 0; i < data.length; i++) {
            // eslint-disable-next-line no-return-assign
            Object.keys(data[i]).map(k => data[i][k] = typeof data[i][k] === 'string' ? data[i][k].trim() : data[i][k])
            self.$store
              .dispatch('projects/register', { is_from_excel: true, lang: 'tr', project: sendProject, ...data[i] })
          }
        })
      }
      reader.readAsBinaryString(selectedFile)
      if (!self.project.excel) {
        self.project.excel = {}
      }
      const send = new FormData()
      send.append('file', data[0])
      axios.post('https://api.sifirvebir.com/api/seli/upload', send).then(res => {
        self.project.excel.file = 'https://seli-cdn.s3.eu-central-1.amazonaws.com/' + res.data
        self.saveProject()
      })
    },
    uploadFile (data) {
      const self = this
      const send = new FormData()
      send.append('file', data[0])
      axios.post('https://api.sifirvebir.com/api/seli/upload', send).then(res => {
        self.project.bg_image[this.selectedLanguage.value] = 'https://seli-cdn.s3.eu-central-1.amazonaws.com/' + res.data
        self.saveProject()
      })
    },
    uploadPDF (data) {
      this.$q.loading.show()
      const self = this
      const send = new FormData()
      send.append('file', data[0])
      axios.post('https://api.sifirvebir.com/api/seli/upload', send).then(res => {
        self.pdfLink = 'https://seli-cdn.s3.eu-central-1.amazonaws.com/' + res.data
        this.$q.loading.hide()
      })
    },
    uploadFileLogo (data) {
      const self = this
      const send = new FormData()
      send.append('file', data[0])
      axios.post('https://api.sifirvebir.com/api/seli/upload', send).then(res => {
        self.project.header_logo[this.selectedLanguage.value] = 'https://seli-cdn.s3.eu-central-1.amazonaws.com/' + res.data
        self.saveProject()
      })
    },
    uploadFileFavicon (data) {
      const self = this
      const send = new FormData()
      send.append('file', data[0])
      axios.post('https://api.sifirvebir.com/api/seli/upload', send).then(res => {
        self.project.favicon[this.selectedLanguage.value] = 'https://seli-cdn.s3.eu-central-1.amazonaws.com/' + res.data
        self.saveProject()
      })
    },
    uploadEmailLogo (data) {
      const self = this
      const send = new FormData()
      send.append('file', data[0])
      axios.post('https://api.sifirvebir.com/api/seli/upload', send).then(res => {
        self.project.register_form.email_logo[this.selectedLanguage.value] = 'https://seli-cdn.s3.eu-central-1.amazonaws.com/' + res.data
        self.saveProject()
      })
    },
    uploadLogin (data) {
      const self = this
      const send = new FormData()
      send.append('file', data[0])
      axios.post('https://api.sifirvebir.com/api/seli/upload', send).then(res => {
        self.project.login_image[this.selectedLanguage.value] = 'https://seli-cdn.s3.eu-central-1.amazonaws.com/' + res.data
        self.saveProject()
      })
    },
    uploadLoginSmall (data) {
      const self = this
      const send = new FormData()
      send.append('file', data[0])
      axios.post('https://api.sifirvebir.com/api/seli/upload', send).then(res => {
        self.project.login_image_small[this.selectedLanguage.value] = 'https://seli-cdn.s3.eu-central-1.amazonaws.com/' + res.data
        self.saveProject()
      })
    },
    deleteProject () {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Would you like to delete this project?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$store.dispatch('projects/deleteProject', { team_key: this.user.team_key, key: this.$route.params.key })
      })
    },
    saveProject () {
      this.$forceUpdate()
      this.$store.dispatch('projects/saveProject', { key: this.$route.params.key, project: this.project })
    }
  },
  computed: {
    excelFields () {
      const jsonFields = {
      }
      for (let i = 0; i < this.project.register_form.questions.length; i++) {
        if (this.project.register_form.questions[i].meta) {
          jsonFields[this.project.register_form.questions[i].meta.contact_field] = this.project.register_form.questions[i].meta.contact_field
        } else {
          jsonFields[this.project.register_form.questions[i].key] = this.project.register_form.questions[i].key
        }
      }
      return jsonFields
    },
    user () {
      return this.$store.state.users.user
    },
    project () {
      return this.$store.state.projects.project
    },
    saving () {
      return this.$store.state.projects.saving
    },
    fetching () {
      return this.$store.state.projects.fetching
    },
    projectTitle () {
      if (this.project && this.selectedLanguage) {
        return this.project.name[this.selectedLanguage.value]
      }
      return 'Lütfen bekleyin'
    },
    questionTypes () {
      return [
        {
          name: 'string',
          label: this.$t('forms.questionTypes.string'),
          color: 'blue',
          icon: 'la la-font',
          type: 'simple'
        },
        {
          name: 'number',
          label: 'Sayı',
          color: 'pink',
          icon: 'lab la-draft2digital',
          type: 'simple'
        },
        {
          name: 'selectbox',
          label: this.$t('forms.questionTypes.selectbox'),
          color: 'orange',
          icon: 'la la-caret-square-down',
          type: 'simple'
        },
        {
          name: 'checkbox',
          label: this.$t('forms.questionTypes.checkbox'),
          color: 'red',
          icon: 'la la-check-square',
          type: 'simple'
        },
        {
          name: 'radio',
          label: this.$t('forms.questionTypes.radio'),
          color: 'green',
          icon: 'la la-dot-circle',
          type: 'simple',
          seperator: true
        },
        {
          name: 'reg_pass',
          label: 'Kayıt Parolası',
          color: 'blue',
          icon: 'las la-cubes',
          type: 'project',
          seperator: true
        },
        {
          name: 'first_name',
          label: this.$t('forms.questionTypes.first_name'),
          color: 'blue-grey',
          icon: 'la la-user',
          type: 'user'
        },
        {
          name: 'last_name',
          label: this.$t('forms.questionTypes.last_name'),
          color: 'blue-grey',
          icon: 'la la-user',
          type: 'user'
        },
        {
          name: 'gender',
          label: this.$t('forms.questionTypes.gender'),
          color: 'blue-grey',
          icon: 'las la-transgender',
          type: 'user'
        },
        {
          name: 'email',
          label: this.$t('forms.questionTypes.email'),
          color: 'blue-grey',
          icon: 'las la-at',
          type: 'user'
        },
        {
          name: 'phone',
          label: this.$t('forms.questionTypes.phone'),
          color: 'blue-grey',
          icon: 'las la-phone-volume',
          type: 'user'
        },
        {
          name: 'id_card',
          label: 'Kimlik Numarası',
          color: 'blue-grey',
          icon: 'las la-id-card',
          type: 'user'
        },
        {
          name: 'password',
          label: 'Şifre',
          color: 'blue-grey',
          icon: 'la la-key',
          type: 'user'
        }
      ]
    },
    simpleQuestionTypes () {
      return [
        {
          name: 'q',
          label: 'Soru',
          color: 'blue-grey',
          icon: 'las la-question',
          type: 'simple'
        },
        {
          name: 'first_name',
          label: this.$t('forms.questionTypes.first_name'),
          color: 'blue-grey',
          icon: 'la la-user',
          type: 'user'
        },
        {
          name: 'last_name',
          label: this.$t('forms.questionTypes.last_name'),
          color: 'blue-grey',
          icon: 'la la-user',
          type: 'user'
        },
        {
          name: 'email',
          label: this.$t('forms.questionTypes.email'),
          color: 'blue-grey',
          icon: 'las la-at',
          type: 'user'
        },
        {
          name: 'phone',
          label: this.$t('forms.questionTypes.phone'),
          color: 'blue-grey',
          icon: 'las la-phone-volume',
          type: 'user'
        }
      ]
    }
  }
}
</script>
<style lang="css" scoped>
.custom-bg {
  background-position: right top;
  background-size: 50% auto;
  background-repeat: no-repeat;
}
</style>
