<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import feather from 'feather-icons';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

// Ambil state loading dari store
const { loading } = storeToRefs(userStore);

// Ambil ID dari URL (/admin/users/:id)
const userId = route.params.id;

// State untuk menyimpan data form
const form = ref({
    name: '',
    email: '',
    nim: '',
    role: '',
    password: '',
    avatar: null
});

// State untuk menampilkan avatar lama
const currentAvatar = ref('');

// Ambil data user saat komponen dimuat
onMounted(async () => {
    try {
        const userData = await userStore.fetchUser(userId);
        if (userData) {
            form.value.name = userData.name;
            form.value.email = userData.email;
            form.value.nim = userData.nim;
            form.value.role = userData.role;
            currentAvatar.value = userData.avatar;
        }
    } catch (error) {
        alert('Gagal mengambil data user.');
        router.push({ name: 'admin.users' });
    }

    nextTick(() => {
        feather.replace();
    });
});

// Handler saat file dipilih
const handleFileUpload = (event) => {
    form.value.avatar = event.target.files[0];
};

// Handler saat form disubmit
const handleSubmit = async () => {
    // Gunakan FormData karena kita mungkin mengirim file gambar
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('name', form.value.name);
    formData.append('email', form.value.email);
    formData.append('nim', form.value.nim);
    formData.append('role', form.value.role);

    if (form.value.password) {
        formData.append('password', form.value.password);
    }

    if (form.value.avatar) {
        formData.append('avatar', form.value.avatar);
    }

    try {
        await userStore.updateUser(userId, formData);
        alert('Data user berhasil diperbarui!');
        router.push({ name: 'admin.users' });
    } catch (error) {
        console.error("Gagal mengupdate user", error);
        alert('Gagal memperbarui data. Cek kembali form Anda.');
    }
};
</script>

<template>
    <div class="p-6">
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold text-gray-800">Edit User</h1>
            <button @click="router.push({ name: 'admin.users' })"
                class="flex items-center text-sm text-gray-500 hover:text-gray-700">
                <i data-feather="arrow-left" class="w-4 h-4 mr-1"></i>
                Kembali
            </button>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <form @submit.prevent="handleSubmit" class="p-6">
                
                <div class="mb-6 flex items-center gap-4">
                    <img :src="currentAvatar ? currentAvatar : `https://ui-avatars.com/api/?name=${form.name || 'User'}&background=0D8ABC&color=fff`" 
                         alt="Avatar" 
                         class="w-16 h-16 rounded-full object-cover border border-gray-200 shadow-sm">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Ganti Avatar</label>
                        <input type="file" @change="handleFileUpload" accept="image/jpeg,image/png,image/jpg" 
                               class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                        <p class="text-xs text-gray-400 mt-1">Kosongkan jika tidak ingin mengubah avatar. (Maks: 2MB)</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                        <input type="text" v-model="form.name" required
                            class="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input type="email" v-model="form.email" required
                            class="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">NIM / NIK</label>
                        <input type="text" v-model="form.nim" required
                            class="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Role Akses</label>
                        <select v-model="form.role" required
                            class="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Password Baru</label>
                        <input type="password" v-model="form.password" placeholder="••••••••"
                            class="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                        <p class="text-xs text-gray-500 mt-1">Isi hanya jika ingin mengganti password. Minimal 8 karakter.</p>
                    </div>
                </div>

                <div class="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-6">
                    <button type="button" @click="router.push({ name: 'admin.users' })"
                        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Batal
                    </button>
                    <button type="submit" :disabled="loading"
                        class="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                        <i v-if="loading" data-feather="loader" class="w-4 h-4 mr-2 animate-spin"></i>
                        {{ loading ? 'Menyimpan...' : 'Simpan Perubahan' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>