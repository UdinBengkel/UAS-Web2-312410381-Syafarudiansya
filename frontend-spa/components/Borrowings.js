const Borrowings = {
  template: `
    <div class="p-8 max-w-5xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-indigo-700">📋 Peminjaman</h2>
        <button @click="openModal()" class="bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-800">+ Tambah</button>
      </div>

      <div class="bg-white rounded shadow overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-indigo-700 text-white">
            <tr>
              <th class="px-4 py-3 text-left">No</th>
              <th class="px-4 py-3 text-left">Anggota</th>
              <th class="px-4 py-3 text-left">Buku</th>
              <th class="px-4 py-3 text-left">Tgl Pinjam</th>
              <th class="px-4 py-3 text-left">Tgl Kembali</th>
              <th class="px-4 py-3 text-center">Status</th>
              <th class="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(b, i) in borrowings" :key="b.id" class="border-t hover:bg-gray-50">
              <td class="px-4 py-3">{{ i + 1 }}</td>
              <td class="px-4 py-3 font-medium">{{ b.member_name }}</td>
              <td class="px-4 py-3">{{ b.book_title }}</td>
              <td class="px-4 py-3">{{ b.borrow_date }}</td>
              <td class="px-4 py-3">{{ b.return_date || '-' }}</td>
              <td class="px-4 py-3 text-center">
                <span :class="b.status === 'dipinjam'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-green-100 text-green-700'"
                  class="px-2 py-1 rounded-full text-xs font-semibold">
                  {{ b.status }}
                </span>
              </td>
              <td class="px-4 py-3 text-center">
                <div class="flex gap-2 justify-center">
                  <button @click="openModal(b)" class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs">Edit</button>
                  <button @click="hapus(b.id)"  class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">Hapus</button>
                </div>
              </td>
            </tr>
            <tr v-if="borrowings.length === 0">
              <td colspan="7" class="text-center py-6 text-gray-400">Belum ada data</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal -->
      <div v-if="modal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div class="bg-white rounded shadow p-6 w-full max-w-md">
          <h3 class="text-lg font-bold mb-4">{{ form.id ? 'Edit' : 'Tambah' }} Peminjaman</h3>
          <div class="flex flex-col gap-3 mb-4">
            <div>
              <label class="text-sm font-medium">Anggota</label>
              <select v-model="form.member_id"
                class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                <option value="">-- Pilih Anggota --</option>
                <option v-for="m in members" :key="m.id" :value="m.id">{{ m.name }}</option>
              </select>
            </div>
            <div>
              <label class="text-sm font-medium">Buku</label>
              <select v-model="form.book_id"
                class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                <option value="">-- Pilih Buku --</option>
                <option v-for="b in books" :key="b.id" :value="b.id">{{ b.title }}</option>
              </select>
            </div>
            <div>
              <label class="text-sm font-medium">Tanggal Pinjam</label>
              <input v-model="form.borrow_date" type="date"
                class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
            </div>
            <div>
              <label class="text-sm font-medium">Tanggal Kembali</label>
              <input v-model="form.return_date" type="date"
                class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
            </div>
            <div>
              <label class="text-sm font-medium">Status</label>
              <select v-model="form.status"
                class="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                <option value="dipinjam">Dipinjam</option>
                <option value="dikembalikan">Dikembalikan</option>
              </select>
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
    const borrowings = ref([]);
    const members = ref([]);
    const books = ref([]);
    const modal = ref(false);
    const form = ref({
      id: null,
      member_id: "",
      book_id: "",
      borrow_date: "",
      return_date: "",
      status: "dipinjam",
    });

    const load = async () => {
      const [br, m, b] = await Promise.all([
        axios.get("/borrowings"),
        axios.get("/members"),
        axios.get("/books"),
      ]);
      borrowings.value = br.data;
      members.value = m.data;
      books.value = b.data;
    };

    const openModal = (b = null) => {
      form.value = b
        ? {
            id: b.id,
            member_id: b.member_id,
            book_id: b.book_id,
            borrow_date: b.borrow_date,
            return_date: b.return_date || "",
            status: b.status,
          }
        : {
            id: null,
            member_id: "",
            book_id: "",
            borrow_date: "",
            return_date: "",
            status: "dipinjam",
          };
      modal.value = true;
    };

    const simpan = async () => {
      const payload = {
        member_id: form.value.member_id,
        book_id: form.value.book_id,
        borrow_date: form.value.borrow_date,
        return_date: form.value.return_date,
        status: form.value.status,
      };
      if (form.value.id) {
        await axios.put(`/borrowings/${form.value.id}`, payload);
      } else {
        await axios.post("/borrowings", payload);
      }
      modal.value = false;
      load();
    };

    const hapus = async (id) => {
      if (confirm("Yakin hapus data peminjaman ini?")) {
        await axios.delete(`/borrowings/${id}`);
        load();
      }
    };

    onMounted(load);
    return {
      borrowings,
      members,
      books,
      modal,
      form,
      openModal,
      simpan,
      hapus,
    };
  },
};
