import { defineStore } from 'pinia'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as any,
    loading: false,
    error: null as string | null
  }),

  actions: {
    // KULLANICI KAYDI VE 'USERS' KOLEKSİYONUNA YAZMA
    async registerUser(userData: any) {
      this.loading = true
      this.error = null
      const auth = getAuth()
      const db = getFirestore()

      try {
        // 1. Auth servisinde kullanıcı oluştur
        const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
        
        // 2. Profil ismini güncelle
        if (userCredential.user) {
          await updateProfile(userCredential.user, {
            displayName: `${userData.name} ${userData.surname}`
          })

          // 3. Firestore 'users' koleksiyonuna detayları yaz
          await setDoc(doc(db, "users", userCredential.user.uid), {
            uid: userCredential.user.uid,
            name: userData.name,
            surname: userData.surname,
            email: userData.email,
            phone: userData.phone,
            birthDate: userData.birthDate,
            gender: userData.gender,
            isLoyaltyMember: false,
            createdAt: new Date()
          })
          
          this.user = userCredential.user
        }
        return true // Başarılı
      } catch (err: any) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // GİRİŞ YAPMA
    async loginUser(email: string, pass: string) {
      this.loading = true
      this.error = null
      const auth = getAuth()
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, pass)
        this.user = userCredential.user
        return true
      } catch (err: any) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // ÇIKIŞ YAPMA
    async logoutUser() {
        const auth = getAuth()
        await signOut(auth)
        this.user = null
        // Sayfayı yenile veya yönlendir
        window.location.href = '/'
    }
  }
})