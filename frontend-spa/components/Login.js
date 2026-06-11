const Login = {
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white rounded shadow p-8 w-full max-w-sm">
        <h2 class="text-2xl font-bold text-center text-indigo-700 mb-6">🔐 Login Admin</h2>
        <div v-if="error" class="bg-red-100 text-red-600 text-sm px-4 py-2 rounded mb-4">{{ error }}</div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Username</label>
          <input v-model="form.username" type="text" placeholder="admin"
            class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium mb-1">Password</label>
          <input v-model="form.password" type="password" placeholder="••••••••"
            class="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
        </div>
        <button @click="login" :disabled="loading"
          class="w-full bg-indigo-700 text-white py-2 rounded hover:bg-indigo-800 font-semibold">
          {{ loading ? 'Loading...' : 'Login' }}
        </button>
      </div>
    </div>
  `,
  setup() {
    const { ref } = Vue;
    const router = VueRouter.useRouter();
    const form = ref({ username: "", password: "" });
    const error = ref("");
    const loading = ref(false);

    const login = async () => {
      error.value = "";
      loading.value = true;
      try {
        const res = await axios.post("/auth/login", form.value);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isLoggedIn", "true");
        router.push("/dashboard");
      } catch (e) {
        error.value = "Username atau password salah.";
      } finally {
        loading.value = false;
      }
    };

    return { form, error, loading, login };
  },
};
