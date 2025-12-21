<template>
  <div class="campaigns-wrapper">
    <div class="campaigns-container">
      
      <div class="campaign-card">
        <div class="card-image-side">
          <img src="../../assets/images/campaign-left.png" alt="Longest Night" />
        </div>
        
        <div class="card-content-side">
          <h3 class="title">LONGEST NIGHT</h3>
          <p class="desc">
            Sephora Collection Alışverişlerinde<br>
            "NIGHT" Kodu ile <span class="bold">%30 İNDİRİM!</span>
          </p>
          <button class="action-btn">KEŞFET</button>
          <p class="legal">*20 - 21 Aralık 2025 tarihleri arasında geçerlidir.</p>
        </div>
      </div>

      <div class="campaign-card">
        <div class="card-image-side">
          <img src="../../assets/images/campaign-right.png" alt="Hediye Kampanyası" />
        </div>

        <div class="card-content-side">
          <h3 class="title">Sevdiklerine Güzel Bir Hediye Ver</h3>
          <p class="desc">
            2 Ürün ve Üzeri Makyaj, Cilt ve Saç<br>
            Bakım Alışverişlerinde İndirim!
          </p>
          <button class="action-btn">KEŞFET</button>
          <p class="legal">*12 - 31 Aralık tarihleri arasında geçerlidir.</p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.campaigns-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0 40px 0;
}

.campaigns-container {
  width: 100%;
  max-width: 1400px;
  padding: 0 30px;
  display: flex;
  gap: 10px; 
}

/* KART GENEL YAPISI */
.campaign-card {
  flex: 1;
  display: flex;
  flex-direction: row;
  height: 230px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

/* SOL TARAFI: GÖRSEL (%55) */
.card-image-side {
  flex: 1.35;
  height: 100%;
  /* Arka plan rengi veya ortalama komutları kaldırıldı */
  overflow: hidden;
}

.card-image-side img {
  /* DÜZELTİLDİ: Görsel kutuya tam oturtuldu */
  width: 100%;
  height: 100%;
  /* object-fit KALDIRILDI. Artık görsel kutunun boyutuna göre tam esneyecek. */
  display: block;
}

/* SAĞ TARAFI: İÇERİK (%45) */
.card-content-side {
  flex: 1;
  padding: 15px 20px 15px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: white;
}

/* --- YAZILAR --- */

.title {
  font-family: 'Inter', sans-serif;
  font-size: 16px; 
  font-weight: 700; 
  color: #000;
  margin: 0 0 8px 0;
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: -0.2px;
}

.desc {
  font-family: 'Inter', sans-serif;
  font-size: 14px; 
  font-weight: 500; 
  color: #000;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.bold {
  font-weight: 800;
}

/* BUTON */
.action-btn {
  background-color: white;
  color: black;
  border: 2px solid black;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 900;
  padding: 10px 0;
  width: 100%;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 10px;
}

.action-btn:hover {
  background-color: black;
  color: white;
}

.legal {
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  color: #666;
  line-height: 1.2;
}

/* MOBİL */
@media (max-width: 900px) {
  .campaigns-container { flex-direction: column; gap: 20px; }
  .campaign-card { height: auto; flex-direction: column; }
  .card-image-side { width: 100%; height: 200px; } 
  .card-content-side { width: 100%; padding: 20px; }
}
</style>