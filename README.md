
# Proje Dokümantasyonu

Bu dokümantasyon, Next.js kullanılarak oluşturulmuş ve NextAuth.js ile kullanıcı kimlik doğrulaması sağlayan bir web uygulamasının genel yapısını, amacını ve kullanılan yöntemleri açıklar. Bu proje, GitHub ve Google OAuth sağlayıcılarını ve e-posta/şifre kombinasyonunu kullanarak kullanıcı kimlik doğrulaması yapmayı amaçlamaktadır. Ayrıca MongoDB kullanılarak kullanıcı verileri depolanmaktadır.

## Projenin Amacı
Bu projenin amacı, modern web teknolojileri kullanarak güvenli ve ölçeklenebilir bir kullanıcı kimlik doğrulama sistemi oluşturmaktır. Projede, kullanıcıların GitHub veya Google hesapları ile giriş yapabilmelerinin yanı sıra, geleneksel e-posta ve şifre kombinasyonu ile de giriş yapabilmeleri sağlanmaktadır.

## Kullanılan Teknolojiler ve Araçlar

- **Next.js**: React tabanlı bir framework olup, sunucu tarafı render (SSR) ve statik site üretimi (SSG) özellikleri sağlar.
- **NextAuth.js**: Çeşitli kimlik doğrulama sağlayıcılarını destekleyen bir kimlik doğrulama kütüphanesidir.
- **MongoDB**: NoSQL veritabanı, kullanıcı verilerini saklamak için kullanılır.
- **Mongoose**: MongoDB ile çalışmak için kullanılan bir ODM (Object Data Modeling) kütüphanesidir.
- **Bcrypt**: Kullanıcı şifrelerini güvenli bir şekilde şifrelemek için kullanılır.

## Proje Yapısı

- **`app/`**: Ana uygulama dizini.
  - **`(models)/User.js`**: Kullanıcı şemasını tanımlar ve MongoDB ile etkileşime geçer.
  - **`api/auth/[...nextauth]/options.js`**: NextAuth.js kimlik doğrulama yapılandırmasını içerir.
  - **`api/Users/route.js`**: Kullanıcı oluşturma ve doğrulama işlemleri için API route'u.
  - **`UserForm.jsx`**: Kullanıcı kayıt formunu içeren bileşen.
  - **`middleware.js`**: Kullanıcı rolleri ve erişim kontrolü için middleware.
- **`lib/`**: Yardımcı kütüphaneleri içerir.
  - **`mongoose.js`**: MongoDB bağlantısını yönetir.
- **`.env.local`**: Çevre değişkenlerini içerir.
- **`package.json`**: Proje bağımlılıklarını ve komutlarını tanımlar.
- **`next.config.js`**: Next.js konfigürasyon dosyası.

## Kimlik Doğrulama Sağlayıcıları

1. **GitHub Provider**:
   - Kullanıcıların GitHub hesapları ile giriş yapmasını sağlar.
   - Giriş yapan kullanıcıların GitHub profil bilgilerini alır ve kullanıcı rolünü belirler.

2. **Google Provider**:
   - Kullanıcıların Google hesapları ile giriş yapmasını sağlar.
   - Giriş yapan kullanıcıların Google profil bilgilerini alır ve kullanıcı rolünü belirler.

3. **Credentials Provider**:
   - Kullanıcıların e-posta ve şifre kombinasyonu ile giriş yapmasını sağlar.
   - Şifreler bcrypt ile şifrelenir ve doğrulanır.

## Veritabanı Yönetimi

- **Mongoose**:
  - MongoDB veritabanı ile etkileşime geçmek için kullanılır.
  - Kullanıcı şeması `User.js` dosyasında tanımlanmıştır.
  - `mongoose.js` dosyası, MongoDB bağlantısını yönetir ve yeniden kullanılabilir bir bağlantı sağlar.

## Kullanıcı Rolleri ve Middleware

Bu projede, kullanıcılara roller atanmıştır ve bu roller, belirli sayfalara erişimlerini kontrol etmek için kullanılır. Rol tabanlı erişim kontrolü, Next.js middleware kullanılarak sağlanmıştır.

### Middleware

**`app/middleware.js`**:
```javascript
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/admin")) {
        if (!token || token.role !== "admin") {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"]
};
```

### Açıklamalar

- **`middleware.js`** dosyası, belirli URL desenlerine (örneğin `/admin`) erişim taleplerini yakalar.
- Kullanıcı JSON Web Token'ı (JWT) `getToken` fonksiyonu kullanılarak elde edilir.
- Erişim talebi yapılan sayfanın yoluna (`pathname`) göre, kullanıcının rolü kontrol edilir.
- Eğer kullanıcı yetkili değilse, `/unauthorized` sayfasına yönlendirilir.

### Önemli Fonksiyonlar ve Metotlar

- **Şifreleme ve Doğrulama**:
  - Bcrypt kullanılarak kullanıcı şifreleri güvenli bir şekilde şifrelenir (`bcrypt.hash`).
  - Giriş sırasında şifre doğrulaması yapılır (`bcrypt.compare`).

- **NextAuth.js Callbacks**:
  - **`jwt` Callback**: Kullanıcı verilerini JSON Web Token'a (JWT) ekler.
  - **`session` Callback**: Oturum bilgilerini özelleştirir ve kullanıcı rolünü ekler.

## Başlangıç

1. **Depoyu Klonlayın ve Paketleri Yükleyin**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   npm install
   ```

2. **Çevre Değişkenlerini Ayarlayın**:
   `.env.local` dosyasını oluşturun ve gerekli API anahtarlarını ve MongoDB URI'sini ekleyin.

3. **Uygulamayı Başlatın**:
   ```bash
   npm run dev
   ```

Tarayıcıda `http://localhost:3000` adresine gidin ve kullanıcı kaydı ve kimlik doğrulama işlemlerini test edin.

## Sonuç

Bu proje, modern web teknolojilerini kullanarak güvenli ve esnek bir kimlik doğrulama sistemi oluşturmayı amaçlamaktadır. Next.js ve NextAuth.js kullanılarak, hem sosyal medya hesapları ile hem de geleneksel e-posta ve şifre kombinasyonu ile giriş yapılabilir. MongoDB ve Mongoose kullanılarak veritabanı yönetimi sağlanmaktadır. Kullanıcılara roller atanmış ve belirli sayfalara erişimlerini kontrol etmek için middleware kullanılmıştır. Bu dokümantasyon, projenin genel yapısını, amacını ve kullanılan yöntemleri özetlemektedir.
