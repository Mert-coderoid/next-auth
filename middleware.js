export { default } from "next-auth/middleware";  // default olarak export ediyoruz

export const config = { matcher: ["/CreateUser"] };  // matcher ile CreateUSer sayfasını koruma altına alıyoruz
