const Books = {
  template: `
    <div class="p-8 max-w-5xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-indigo-700">📖 Buku</h2>
        <button @click="openModal()" class="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-800">+ Tambah</button>
      </div>

      <div class="bg-white rounded shadow overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-indigo-700 text-white">
            <tr>
              <th class="px-4 py-3 text-left">No</th>
              <th class="px-4 py-3 text-left">Judul</th>
              <th class="px-4 py-3 text-left">Penulis</th>
              <th class="px-4 py-3 text-left">Penerbit</th>
              <th class="px-4 py-3 text-left">Genre</th>
              <th class="px-4 py-3 text-center">Stok</th>
              <th class="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(b, i) in books" :key="b.id" class="border-t hover:bg-gray-50">
              <td class="px-4 py-3">{{ i + 1 }}</td>
              <td class="px-4 py-3 font-medium">{{ b.title }}</td>
              <td class="px-4 py-3">{{ b.author }}</td>
              <td class="px-4 py-3">{{ b.publisher }}</td>
              <td class="px-4 py-3">{{ b.genre_name || '-' }}</td>
              <td class="px-4 py-3 text-center">{{ b.stock }}</td>
              <td class="px-4 py-3 text-center">
                <div class="flex gap-2 justify-center">
                  <button @click="openModal(b)" class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs">Edit</button>
                  <button @click="hapus(b.id)"  class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">Hapus</button>
                </div>
              </td>
            </tr>
            <tr v-if="books.length === 0">
              <td colspan="7" class="text-center py-6 text-gray-400">Belum ada data</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal -->
      <div v-if="modal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div class="bg-white rounded shadow p-6 w-full max-w-md">
          <h3 class="text-lg font-bold mb-4">{{ form.id ? 'Edit' : 'Tambah' }} Buku</h3>
          <div class="grid grid-cols-2 gap-3 mb-4">
            <div class="col-span-2">
              <label class="text-sm font-medium">Judul</label>
              <input v-model="form.title" type="text" placeholder="Judul buku"
                class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
            </div>
            <div>
              <label class="text-sm font-medium">Penulis</label>
              <input v-model="form.author" type="text" placeholder="Nama penulis"
                class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
            </div>
            <div>
              <label class="text-sm font-medium">Penerbit</label>
              <input v-model="form.publisher" type="text" placeholder="Nama penerbit"
                class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
            </div>
            <div>
              <label class="text-sm font-medium">Genre</label>
              <select v-model="form.genre_id"
                class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                <option value="">-- Pilih Genre --</option>
                <option v-for="g in genres" :key="g.id" :value="g.id">{{ g.name }}</option>
              </select>
            </div>
            <div>
              <label class="text-sm font-medium">Stok</label>
              <input v-model="form.stock" type="number" min="0" placeholder="0"
                class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <button @click="modal=false" class="px-4 py-2 rounded border hover:bg-gray-100">Batal</button>
            <button @click="simpan" class="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-800">Simpan</button>
          </div>
        </div>
      </div>
    </div>
  `,
  setup() {
    const { ref, onMounted } = Vue;
    const books = ref([]);
    const genres = ref([]);
    const modal = ref(false);
    const form = ref({
      id: null,
      title: "",
      author: "",
      publisher: "",
      genre_id: "",
      stock: 0,
    });

    const load = async () => {
      const [b, g] = await Promise.all([
        axios.get("/books"),
        axios.get("/genres"),
      ]);
      books.value = b.data;
      genres.value = g.data;
    };

    const openModal = (b = null) => {
      form.value = b
        ? {
            id: b.id,
            title: b.title,
            author: b.author,
            publisher: b.publisher,
            genre_id: b.genre_id,
            stock: b.stock,
          }
        : {
            id: null,
            title: "",
            author: "",
            publisher: "",
            genre_id: "",
            stock: 0,
          };
      modal.value = true;
    };

    const simpan = async () => {
      const payload = {
        title: form.value.title,
        author: form.value.author,
        publisher: form.value.publisher,
        genre_id: form.value.genre_id,
        stock: form.value.stock,
      };
      if (form.value.id) {
        await axios.put(`/books/${form.value.id}`, payload);
      } else {
        await axios.post("/books", payload);
      }
      modal.value = false;
      load();
    };

    const hapus = async (id) => {
      if (confirm("Yakin hapus buku ini?")) {
        await axios.delete(`/books/${id}`);
        load();
      }
    };

    onMounted(load);
    return { books, genres, modal, form, openModal, simpan, hapus };
  },
};
