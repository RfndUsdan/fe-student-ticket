<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useTicketStore } from '@/stores/ticket';
import feather from 'feather-icons';

const router = useRouter();
const ticketStore = useTicketStore();

const form = ref({
    title: '',
    priority: 'normal',
    description: '',
    image: null
});

const imagePreview = ref(null);

const handleImageCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
        form.value.image = file;
        imagePreview.value = URL.createObjectURL(file);
    }
};

const removeImage = () => {
    form.value.image = null;
    imagePreview.value = null;
    nextTick(() => feather.replace());
};

const handleSubmit = async () => {
    const formData = new FormData();
    
    formData.append('title', form.value.title);
    formData.append('priority', form.value.priority);
    formData.append('description', form.value.description);
    
    if (form.value.image) {
        formData.append('image', form.value.image);
    }

    await ticketStore.createTicket(formData);
    
    if (ticketStore.error) {
        alert(`Gagal membuat tiket: ${ticketStore.error}`);
    } else {
        alert('Tiket berhasil dibuat!');
    }
};

onMounted(() => {
    nextTick(() => feather.replace());
});
</script>

<template>
    <div class="max-w-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8 pb-24">
        
        <div class="flex items-center mb-6">
            <button @click="router.back()" class="mr-4 text-gray-400 hover:text-gray-600 focus:outline-none">
                <i data-feather="arrow-left" class="w-6 h-6"></i>
            </button>
            <h1 class="text-2xl font-bold text-gray-900">Buat Tiket Baru</h1>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <form @submit.prevent="handleSubmit" class="p-6">
                
                <div class="mb-5">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Judul Keluhan / Masalah</label>
                    <input type="text" v-model="form.title" required placeholder="Contoh: AC Kelas Rusak"
                        class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors">
                </div>

                <div class="mb-5">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tingkat Prioritas</label>
                    <div class="relative">
                        <select v-model="form.priority" required
                            class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50 focus:bg-white appearance-none transition-colors">
                            <option value="low">Rendah</option>
                            <option value="normal">Normal</option>
                            <option value="high">Tinggi</option>
                        </select>
                        <i data-feather="chevron-down" class="absolute right-4 top-3.5 w-4 h-4 text-gray-400 pointer-events-none"></i>
                    </div>
                </div>

                <div class="mb-5">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Deskripsi Detail</label>
                    <textarea v-model="form.description" required rows="4" placeholder="Jelaskan masalah secara detail..."
                        class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50 focus:bg-white transition-colors resize-none"></textarea>
                </div>

                <div class="mb-8">
                    <label class="block text-sm font-medium text-gray-700 mb-3">Lampirkan Foto (Opsional)</label>
                    
                    <div v-if="imagePreview" class="w-full">
                        <div class="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 mb-3">
                            <img :src="imagePreview" alt="Preview" class="w-full h-48 object-cover">
                        </div>
                        <div class="flex justify-end">
                            <button type="button" @click="removeImage" 
                                class="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
                                <i data-feather="trash-2" class="w-4 h-4 mr-1.5"></i>
                                Hapus Foto
                            </button>
                        </div>
                    </div>

                    <div v-else class="grid grid-cols-2 gap-4">
                        
                        <label for="camera-upload" 
                            class="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-blue-50 hover:border-blue-300 transition-colors">
                            <i data-feather="camera" class="w-7 h-7 mb-2 text-blue-500"></i>
                            <span class="text-xs font-semibold text-gray-600">Buka Kamera</span>
                            <input id="camera-upload" type="file" class="hidden" accept="image/*" capture="environment" @change="handleImageCapture" />
                        </label>

                        <label for="gallery-upload" 
                            class="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-blue-50 hover:border-blue-300 transition-colors">
                            <i data-feather="image" class="w-7 h-7 mb-2 text-green-500"></i>
                            <span class="text-xs font-semibold text-gray-600">Pilih Galeri</span>
                            <input id="gallery-upload" type="file" class="hidden" accept="image/*" @change="handleImageCapture" />
                        </label>

                    </div>
                </div>

                <div class="pt-2 border-t border-gray-100">
                    <button type="submit" :disabled="ticketStore.loading"
                        class="w-full flex items-center justify-center px-6 py-3.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all">
                        <i v-if="ticketStore.loading" data-feather="loader" class="w-5 h-5 mr-2 animate-spin"></i>
                        <i v-else data-feather="send" class="w-5 h-5 mr-2"></i>
                        {{ ticketStore.loading ? 'Mengirim...' : 'Kirim Tiket' }}
                    </button>
                </div>

            </form>
        </div>
    </div>
</template>