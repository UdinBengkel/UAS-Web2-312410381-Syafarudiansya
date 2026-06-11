const Dashboard = {
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <h2 class="text-2xl font-bold text-indigo-700 mb-6">📊 Dashboard</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white rounded shadow p-5 text-center">
          <p class="text-3xl font-bold text-indigo-600">{{ stats.books }}</p>
          <p class="text-gray-500 mt-1">Total Buku</p>
        </div>
        <div class="bg-white rounded shadow p-5 text-center">
          <p class="text-3xl font-bold text-green-600">{{ stats.genres }}</p>
          <p class="text-gray-500 mt-1">Genre</p>
        </div>
        <div class="bg-white rounded shadow p-5 text-center">
          <p class="text-3xl font-bold text-yellow-600">{{ stats.members }}</p>
          <p class="text-gray-500 mt-1">Anggota</p>
        </div>
        <div class="bg-white rounded shadow p-5 text-center">
          <p class="text-3xl font-bold text-red-600">{{ stats.borrowings }}</p>
          <p class="text-gray-500 mt-1">Peminjaman</p>
        </div>
      </div>
    </div>
  `,
  setup() {
    const { ref, onMounted } = Vue;
    const stats = ref({ books: 0, genres: 0, members: 0, borrowings: 0 });

    onMounted(async () => {
      try {
        const [b, g, m, br] = await Promise.all([
          axios.get("/books"),
          axios.get("/genres"),
          axios.get("/members"),
          axios.get("/borrowings"),
        ]);
        stats.value = {
          books: b.data.length,
          genres: g.data.length,
          members: m.data.length,
          borrowings: br.data.length,
        };
      } catch (e) {}
    });

    return { stats };
  },
};
