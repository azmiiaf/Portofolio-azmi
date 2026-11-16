# showcase FE (Next.js)

    npm install
    npm run dev

1. Isi `.env.local` (API_URL + PATH_LOGIN). Restart `npm run dev` setelah diubah.
2. Semua teks & path gambar ada di `data/content.js`.
3. Taruh gambar di `public/images` (hero.gif, about.png, project-1..5.png, cert-1..5.png).

## Alur login
`/login` -> form -> POST `/api/login` (app/api/login/route.js) -> panggil `API_URL + PATH_LOGIN`
-> kalau sukses, token disimpan di cookie httpOnly -> `middleware.js` ngecek cookie itu.
Belum login = otomatis dilempar ke /login.
