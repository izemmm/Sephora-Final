<template>
  <footer class="site-footer">
    
    <div class="services-wrapper">
      <div class="services-bar">
        <div class="service-item">
          <div class="icon-box">
            <img src="~/assets/images/icon-store.png" alt="Mağaza İkonu" />
          </div>
          <div class="text-box">
            <h4>Tıkla, Mağazadan Al</h4>
            <p>Online siparişini seçili mağazalardan 2 saat içerisinde...</p>
            <a href="#">Keşfet</a>
          </div>
        </div>

        <div class="service-item">
          <div class="icon-box">
            <img src="~/assets/images/icon-delivery.png" alt="Teslimat İkonu" />
          </div>
          <div class="text-box">
            <h4>Ücretsiz Teslimat</h4>
            <p>Toplam 2000TL veya Sephora Collection 1000TL üzeri...</p>
            <a href="#">Keşfet</a>
          </div>
        </div>

        <div class="service-item">
          <div class="icon-box">
            <img src="~/assets/images/icon-payment.png" alt="Ödeme İkonu" />
          </div>
          <div class="text-box">
            <h4>Güvenli Ödeme</h4>
            <p>Güvenli ödeme araçları ile alışveriş</p>
            <a href="#">Keşfet</a>
          </div>
        </div>

        <div class="service-item">
          <div class="icon-box">
            <img src="~/assets/images/icon-return.png" alt="İade İkonu" />
          </div>
          <div class="text-box">
            <h4>İade</h4>
            <p>14 gün içinde iade</p>
            <a href="#">Keşfet</a>
          </div>
        </div>
      </div>
    </div>

    <div class="main-footer">
      
      <div class="footer-container">
        
        <div class="footer-col left-col">
          <h3>Hakkımızda</h3>
          <ul>
            <li><a href="#">Mağazalar</a></li>
            <li><a href="#">Profil Bilgilerim</a></li>
            <li><a href="#">Siparişlerim</a></li>
            <li><a href="#">Sephora Kart</a></li>
            <li><a href="#">Kampanyalar</a></li>
            <li><a href="#">Sephora Blog</a></li>
            <li><a href="#">Sıkça Sorulan Sorular</a></li>
            <li><a href="#">Sitemap</a></li>
            <li><a href="#">Bize Ulaşın</a></li>
          </ul>
        </div>

        <div class="footer-col center-col">
          <h3>Üyelik Sözleşmesi</h3>
          <ul>
            <li><a href="#">Genel Şartlar ve Koşullar</a></li>
            <li><a href="#">Çerez Aydınlatma Metni</a></li>
            <li><a href="#">Müşteri Aydınlatma Metni</a></li>
            <li><a href="#">Mesafeli Satış Sözleşmesi</a></li>
            <li><a href="#">İade Prosedürü</a></li>
            <li><a href="#">Gizlilik ve Güvenlik</a></li>
            <li><a href="#">KVK Politikası</a></li>
            <li><a href="#">Çerez Ayarları</a></li>
            <li><a href="#">İletişim</a></li>
            <li><a href="#">Yorumların yayınlanma koşulları</a></li>
          </ul>
        </div>

        <div class="footer-col right-col">
          <div class="combined-section">
             <img src="~/assets/images/footer-social-apps.png" alt="Bizi Takip Et ve Sephora App'i İndir" />
          </div>
        </div>

      </div>

      <div class="footer-legal">
        <p>Promosyon koşullarını kampanyalar sayfasında bulabilirsin.</p>
        <p>Parfüm kategorisine özel teklif*</p>
      </div>

      <div class="footer-bottom">
        <div class="bottom-content">
           <div class="country-selector">
            <img src="~/assets/images/flag-turkey.png" alt="Türkiye Bayrağı" class="flag-img" />
            <span class="country-name">Türkiye</span>
          </div>
        </div>
      </div>

    </div>

  </footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.site-footer { width: 100%; font-family: 'Inter', sans-serif; }

/* --- 1. ÜST BANT --- */
.services-wrapper {
  background-color: white;
  border-bottom: 1px solid #eee;
  width: 100%;
}
.services-bar {
  max-width: 1700px;
  width: 95%;
  margin: 0 auto;
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; 
  gap: 20px;
}
.service-item { display: flex; gap: 15px; flex: 1; min-width: 250px; }
.icon-box img { width: auto; height: 36px; display: block; }
.text-box h4 { font-size: 20px; font-weight: 800; margin: 0 0 5px 0; color: #000; }
.text-box p { font-size: 18px; color: #000; margin: 0 0 4px 0; line-height: 1.3; }
.text-box a { font-size: 14px; color: #000; font-weight: 700; text-decoration: underline; }

/* --- 2. ALT ALAN --- */
.main-footer { 
  background-color: #000; 
  color: #fff; 
  padding: 29px 0 0 0; 
}

.footer-container { 
  display: flex; 
  justify-content: space-between; 
  align-items: flex-start;
  max-width: 1400px; 
  width: 95%; 
  margin: 0 auto; 
}

.footer-col { flex: 1; min-width: 250px; }
.center-col { padding-left: 100px; }
.right-col { display: flex; flex-direction: column; align-items: flex-end; }
.combined-section img { width: 100%; max-width: 300px; height: auto; display: block; }

.footer-col h3 { font-size: 18px; font-weight: 700; margin-bottom: 15px; color: #fff; }
.footer-col ul { list-style: none; padding: 0; margin: 0; }
.footer-col ul li { margin-bottom: 16px; }
.footer-col ul li a { color: #ccc; text-decoration: none; font-size: 15px; transition: color 0.2s; }
.footer-col ul li a:hover { color: #fff; text-decoration: underline; }

.footer-legal {
  max-width: 1700px;
  width: 95%;
  margin: 30px auto 15px auto; 
}
.footer-legal p { font-size: 12px; color: #fcfafa; margin: 7px 0; }

/* ALT ÇİZGİ VE BAYRAK */
.footer-bottom {
  /* DÜZELTME: Çizgi rengi #333'ten #666'ya çekilerek daha belirgin yapıldı */
  border-top: 1px solid #ffffff; 
  margin-top: 5px;
  padding: 13px 0 20px 0; 
  background-color: #000;
}

.bottom-content {
  max-width: 1700px;
  width: 90%;
  margin: 0 auto; 
  display: flex; 
  justify-content: flex-end; 
  padding-right: 150px; 
}

.country-selector {
  display: flex;
  align-items: center; 
  gap: 12px;
  cursor: pointer;
}

.flag-img { height: 32px; width: auto; }
.country-name { color: #fff; font-size: 14px; font-weight: 500; text-decoration: underline; }

@media (max-width: 1024px) {
  .footer-container { flex-direction: column; gap: 40px; }
  .center-col { padding-left: 0; }
  .right-col { align-items: flex-start; } 
  .services-bar { flex-direction: column; }
  .bottom-content { justify-content: center; padding-right: 0; }
}
</style>