const Members = {
  template: `
    <div class="p-8 max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-indigo-700">👤 Anggota</h2>
        <button @click="openModal()" class="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-800">+ Tambah</button>
      </div>

      <div class="bg-white rounded shadow overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-indigo-700 text-white">
            <tr>
              <th class="px-4 py-3 text-left">No</th>
              <th class="px-4 py-3 text-left">Nama</th>
              <th class="px-4 py-3 text-left">Email</th>
              <th class="px-4 py-3 text-left">No. HP</th>
              <th class="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(m, i) in members" :key="m.id" class="border-t hover:bg-gray-50">
              <td class="px-4 py-3">{{ i + 1 }}</td>
              <td class="px-4 py-3 font-medium">{{ m.name }}</td>
              <td class="px-4 py-3">{{ m.email }}</td>
              <td class="px-4 py-3">{{ m.phone || '-' }}</td>
              <td class="px-4 py-3 text-center">
                <div class="flex gap-2 justify-center">
                  <button @click="openModal(m)" class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs">Edit</button>
                  <button @click="hapus(m.id)"  class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">Hapus</button>
                </div>
              </td>
            </tr>
            <tr v-if="members.length === 0">
              <td colspan="5" class="text-center py-6 text-gray-400">Belum ada data</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal -->
      <div v-if="modal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div class="bg-white rounded shadow p-6 w-full max-w-sm">
          <h3 class="text-lg font-bold mb-4">{{ form.id ? 'Edit' : 'Tambah' }} Anggota</h3>
          <div class="flex flex-col gap-3 mb-4">
            <div>
              <label class="text-sm font-medium">Nama</label>
              <input v-model="form.name" type="text" placeholder="Nama lengkap"
                class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
            </div>
            <div>
              <label class="text-sm font-medium">Email</label>
              <input v-model="form.email" type="email" placeholder="email@contoh.com"
                class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
            </div>
            <div>
              <label class="text-sm font-medium">No. HP</label>
              <input v-model="form.phone" type="text" placeholder="08xxxxxxxxxx"
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
    const members = ref([]);
    const modal = ref(false);
    const form = ref({ id: null, name: "", email: "", phone: "" });

    const load = async () => {
      const res = await axios.get("/members");
      members.value = res.data;
    };

    const openModal = (m = null) => {
      form.value = m
        ? { id: m.id, name: m.name, email: m.email, phone: m.phone }
        : { id: null, name: "", email: "", phone: "" };
      modal.value = true;
    };

    const simpan = async () => {
      if (form.value.id) {
        await axios.put(`/members/${form.value.id}`, form.value);
      } else {
        await axios.post("/members", form.value);
      }
      modal.value = false;
      load();
    };

    const hapus = async (id) => {
      if (confirm("Yakin hapus anggota ini?")) {
        await axios.delete(`/members/${id}`);
        load();
      }
    };

    onMounted(load);
    return { members, modal, form, openModal, simpan, hapus };
  },
};
