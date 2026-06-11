const Genres = {
  template: `
    <div class="p-8 max-w-3xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-indigo-700">🏷️ Genre</h2>
        <button @click="openModal()" class="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-800">+ Tambah</button>
      </div>

      <div class="bg-white rounded shadow overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-indigo-700 text-white">
            <tr>
              <th class="px-4 py-3 text-left">No</th>
              <th class="px-4 py-3 text-left">Nama Genre</th>
              <th class="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(g, i) in genres" :key="g.id" class="border-t hover:bg-gray-50">
              <td class="px-4 py-3">{{ i + 1 }}</td>
              <td class="px-4 py-3">{{ g.name }}</td>
              <td class="px-4 py-3 text-center flex gap-2 justify-center">
                <button @click="openModal(g)" class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs">Edit</button>
                <button @click="hapus(g.id)"  class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">Hapus</button>
              </td>
            </tr>
            <tr v-if="genres.length === 0">
              <td colspan="3" class="text-center py-6 text-gray-400">Belum ada data</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal -->
      <div v-if="modal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div class="bg-white rounded shadow p-6 w-full max-w-sm">
          <h3 class="text-lg font-bold mb-4">{{ form.id ? 'Edit' : 'Tambah' }} Genre</h3>
          <input v-model="form.name" type="text" placeholder="Nama genre"
            class="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
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
    const genres = ref([]);
    const modal = ref(false);
    const form = ref({ id: null, name: "" });

    const load = async () => {
      const res = await axios.get("/genres");
      genres.value = res.data;
    };

    const openModal = (g = null) => {
      form.value = g ? { id: g.id, name: g.name } : { id: null, name: "" };
      modal.value = true;
    };

    const simpan = async () => {
      if (form.value.id) {
        await axios.put(`/genres/${form.value.id}`, { name: form.value.name });
      } else {
        await axios.post("/genres", { name: form.value.name });
      }
      modal.value = false;
      load();
    };

    const hapus = async (id) => {
      if (confirm("Yakin hapus genre ini?")) {
        await axios.delete(`/genres/${id}`);
        load();
      }
    };

    onMounted(load);
    return { genres, modal, form, openModal, simpan, hapus };
  },
};
