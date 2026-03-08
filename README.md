UNTUK AULIA

Ini adalah sebuah ruang kenangan. Saya membangun tempat ini sebagai surat terbuka untuk mengenang Aulia. Proyek ini bukan sekadar barisan kode. Ini adalah perjalanan rasa yang saya tuangkan ke dalam bentuk digital agar ingatan itu tetap hidup dan terjaga dengan baik.

Informasi ini terakhir saya perbarui pada 6 Maret 2026.

RINGKASAN PROYEK

For Aulia adalah sebuah situs web berbasis Next.js yang fokus pada penceritaan emosional. Proyek ini menggabungkan visual dengan gerakan tinggi serta halaman narasi yang panjang. Di dalamnya juga terdapat pemutar musik khusus untuk menemani setiap langkah pengunjung saat menjelajahi kenangan.

PERJALANAN PEMBUATAN

Semuanya dimulai dari keinginan sederhana untuk menyampaikan rasa rindu. Saya tidak ingin hanya membuat teks biasa. Saya ingin menciptakan suasana yang bisa dirasakan oleh siapa saja yang berkunjung. Prosesnya memakan waktu yang cukup panjang karena saya harus memastikan setiap transisi dan suara berjalan selaras dengan emosi yang ingin disampaikan. Saya mulai dari menyusun kerangka dasar lalu mulai menambahkan lapisan animasi dan musik secara bertahap. Hingga akhirnya proyek ini menjadi sebuah pengalaman utuh yang Anda lihat sekarang.

TEKNOLOGI YANG DIGUNAKAN

Situs ini dibangun menggunakan teknologi Next.js versi 16 yang paling baru. Saya menggunakan App Router dan Turbopack untuk memastikan proses pengembangan berjalan sangat cepat. Antarmuka dibangun dengan React 19 dan TypeScript agar kodenya tetap aman dan mudah dikelola.

- Tailwind CSS versi 4 untuk pengaturan gaya visual
- Framer Motion untuk animasi elemen antarmuka
- GSAP dan Lenis untuk sistem gulir yang halus
- Howler.js untuk pengaturan audio yang jernih
- Zustand untuk pengelolaan status aplikasi secara global

RUTE AKTIF DALAM SITUS

Pengunjung bisa menjelajahi beberapa bagian utama yang sudah saya siapkan dengan matang.

- / adalah halaman utama atau landing page
- /story berisi kumpulan kartu cerita dan detail dalam bentuk modal
- /gallery menampilkan kisi foto dengan tampilan slideshow
- /notes adalah halaman catatan panjang yang mendukung dua bahasa
- /changelog berisi linimasa pembaruan dan iterasi produk ini

PETA BERKAS DAN STRUKTUR UTAMA

Arsitektur proyek ini tertata dengan rapi di bawah folder src agar setiap bagian mudah ditemukan.

- src/app/layout.tsx adalah kerangka global yang mengatur navigasi dan modal masuk
- src/components/layout/ClientOverlays.tsx untuk mengatur lapisan overlay khusus sisi klien
- src/components/ui/reveal-wave-image.tsx skrip utama untuk menampilkan urutan gambar di halaman depan
- src/components/features/story/StoryGrid.tsx komponen untuk menampilkan kisi cerita
- src/components/ui/slideshow.tsx fitur utama untuk galeri foto
- src/components/features/MusicPlayer.tsx semua logika dan tampilan pemutar musik
- src/components/features/ChangelogList.tsx sumber data tunggal untuk catatan perubahan aplikasi
- src/lib/story-data.ts kumpulan data memori dan cerita
- src/lib/navigation.ts konfigurasi utama untuk navigasi situs

CARA MENJALANKAN SECARA LOKAL

Jika Anda ingin menjalankan proyek ini di perangkat sendiri silakan ikuti langkah sederhana berikut ini. Pastikan Anda sudah masuk ke dalam direktori proyek lalu jalankan perintah di bawah.

npm install
npm run dev

Setelah itu buka alamat http://localhost:3000 pada browser Anda.

PEMERIKSAAN KUALITAS

Sebelum merilis perubahan saya selalu memastikan kode dalam kondisi prima dengan menjalankan dua perintah ini.

npm run lint
npm run build

Hingga saat ini semua pemeriksaan berhasil dilewati tanpa ada kendala sedikit pun.

CATATAN PENTING DAN STRATEGI PERFORMA

Saya ingin situs ini berjalan tanpa hambatan sedikit pun. Masalah utama pada website yang kaya visual adalah waktu tunggu yang lama. Saya mengatasi hal tersebut dengan strategi memuat aset di awal. Sebelum situs terbuka sepenuhnya ada layar loading yang bekerja keras menyiapkan delapan puluh bingkai animasi dan semua lagu pelengkap.

Ada hal kecil yang perlu diperhatikan mengenai suara. Kebijakan pemutaran musik otomatis sangat bergantung pada pengaturan browser masing-masing pengguna. Terkadang interaksi pertama diperlukan agar musik bisa mulai terdengar. Halaman depan sekarang sudah mampu menampilkan bingkai gambar pertama secara instan sambil menyiapkan sisa data lainnya di latar belakang. Hal ini memastikan Anda tidak perlu menunggu terlalu lama untuk mulai melihat keindahan yang ada.

PENUTUP

Terima kasih sudah meluangkan waktu untuk berkunjung. Tempat ini akan terus saya rawat sebagai bentuk penghormatan bagi kenangan yang tidak akan pernah pudar. Semoga Anda menemukan kedamaian saat menjelajahi setiap sudutnya.

Dibuat dengan rasa tulus bagi Aulia. Selalu menetap dalam doa dan setiap karya yang tercipta kemudian.

