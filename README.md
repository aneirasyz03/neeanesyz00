# neeanesyz — Optimized Version

Portfolio Aneira Syiami Zulfa yang sudah dioptimasi untuk PageSpeed Insights.

## Perubahan utama (Performance & Accessibility)

### Performance
- Gambar lokal dikonversi ke **WebP** + dikompres:
  - `aneira-photo.jpg` (195 KB) → `aneira-photo.webp` (56 KB)
  - `dream-university.png` (1.8 MB) → `dream-university.webp` (45 KB)
- Tambah `width`, `height`, `loading="lazy"`, `decoding="async"` pada gambar
- Hero image pakai `fetchpriority="high"`
- Font Google sudah pakai `display=swap`

### Accessibility & Code Quality
- Perbaiki class name yang invalid (`#EFA7B5-phrase` → `pink-phrase`)
- Perbaiki selector CSS yang rusak
- Alt text diperjelas
- `theme-color` ditambahkan

## Cara pakai
1. Upload semua file ini ke GitHub Pages (replace file lama)
2. Atau extract zip lalu deploy ulang

## Catatan
- Folder `assets/music/` masih perlu diisi file mp3 jika mau music player jalan
- Unsplash images tetap external (sudah dioptimasi oleh Unsplash)

Skor yang diharapkan: Performance 90+ (Desktop), Accessibility 95+
