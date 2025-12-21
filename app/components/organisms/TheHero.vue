<template>
  <div class="hero-container">
    <div class="hero-content-wrapper">
      <div class="image-wrapper">
        <img src="../../assets/images/hero-bg.png" alt="Sephora Kampanya" class="hero-image" />
      </div>

      <div class="info-card">
        <h2 class="card-title">Sevdiklerine Güzel Bir Hediye Ver</h2>
        <div class="card-offer">
          Parfümlerde <span class="bold">%25 İNDİRİM!</span>
        </div>
        
        <NuxtLink to="/category/yeni-yil" class="action-btn">
          KEŞFET
        </NuxtLink>

        <p class="legal-text">
          *12 - 31 Aralık tarihleri arasında 1000TL ve üzeri alışverişlerde geçerlidir. 
          Chanel, Dior, Hermes, Gucci seyahat boy parfümler ile Atelier Rebul...
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.hero-container {
  width: 100%;
  font-family: 'Inter', sans-serif;
  background-color: white;
  display: flex;
  justify-content: center;
  padding: 0 30px 30px 30px; 
}

.hero-content-wrapper { position: relative; width: 100%; max-width: 1400px; }
.image-wrapper { width: 100%; height: auto; }

.hero-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: 8px; 
  min-height: 450px; 
}

.info-card {
  position: absolute;
  top: 50%;
  right: 62px; 
  transform: translateY(-50%); 
  background-color: white;
  padding:15px;
  width: 480px; 
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  text-align: left;
  z-index: 10;
}

.card-title { font-size: 26px; font-weight: 750; color: #000; margin-bottom: 12px; line-height: 1.0; }
.card-offer { font-size: 18px; font-weight: 400; color: #000; margin-bottom: 25px; }
.bold { font-weight: 800; }

/* GÜNCELLENEN BUTON STİLİ (Link uyumlu) */
.action-btn {
  width: 90%;
  padding: 14px 0;
  background-color: white;
  border: 2px solid #000; 
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 1px;
  letter-spacing: 0px;
  color: #000; /* Link olduğu için renk zorunlu */
  
  /* Link'e özgü eklenenler: */
  display: block; /* Kutu gibi davranması için */
  text-align: center; /* Yazıyı ortalamak için */
  text-decoration: none; /* Alt çizgiyi kaldırmak için */
}

.action-btn:hover { background-color: #000; color: white; }

.legal-text { font-size: 11px; color: #777; line-height: 1.4; margin-top: 15px; }

@media (max-width: 900px) {
  .hero-container { padding: 0; }
  .hero-image { border-radius: 0; min-height: 300px; }
  .info-card {
    position: static; 
    width: 100%;
    transform: none;
    border-radius: 0;
    box-shadow: none;
    padding: 30px 20px;
    text-align: center;
    border-bottom: 1px solid #eee;
  }
  /* Mobilde butonu ortalamak için */
  .action-btn { margin: 0 auto; }
}
</style>