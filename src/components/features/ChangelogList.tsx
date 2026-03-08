// Halaman ini awalnya digunakan sebagai file data statis. Kita modifikasi sedikit agar data export tersedia.
// Karena terlalu panjang, kita cukup extract variabelnya.

export const changelogData = [
  {
    id: "v1.0.0",
    version: "v1.0.0",
    date: "March 1, 2026",
    title: "Initial Launch",
    changes: ["First narrative site deployed.", "Added Music Player.", "Lenis scroll setup."],
  }
];

// Nanti UI ini akan diganti total untuk baca dari DB
export function ChangelogList() {
    return <div>This will be replaced by dynamic DB fetch</div>;
}
