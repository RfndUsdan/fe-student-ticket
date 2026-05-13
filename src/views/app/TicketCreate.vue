<script setup>
import { onMounted, ref } from 'vue';
import { useTicketStore } from '@/stores/ticket';
import { storeToRefs } from 'pinia';
import feather from 'feather-icons'
import { useRouter } from 'vue-router';

const router = useRouter()
const ticketStore = useTicketStore()
const { success, error, loading } = storeToRefs(ticketStore)
const { createTicket } = ticketStore

const form = ref({
    title: '',
    description: '',
    priority: '',
    image: null 
})

const imagePreview = ref(null)

const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        form.value.image = file
        imagePreview.value = URL.createObjectURL(file)
    } else {
        form.value.image = null
        imagePreview.value = null
    }
}

const handleSubmit = async () => {
    const formData = new FormData()
    
    formData.append('title', form.value.title)
    formData.append('description', form.value.description)
    formData.append('priority', form.value.priority)
    
    if (form.value.image) {
        formData.append('image', form.value.image)
        console.log("File gambar yang akan dikirim:", form.value.image)
    }

    await createTicket(formData)
    
    // Opsional: Redirect ke dashboard jika berhasil
    // if (!error.value) {
    //    router.push({ name: 'app.dashboard' })
    // }
}

onMounted(async () => {
    feather.replace()
})
</script>

<template>
    <div class="mb-6">
        <RouterLink :to="{ name: 'app.dashboard' }"
            class="inline-flex items-center text-sm text-gray-600 hover:text-gray-800">
            <i data-feather="arrow-left" class="w-4 h-4 mr-2"></i>
            Kembali ke Daftar Tiket
        </RouterLink>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
        <div class="p-6 border-b border-gray-100">
            <h1 class="text-2xl font-bold text-gray-800">Buat Tiket Baru</h1>
            <p class="text-sm text-gray-500 mt-1">Isi form di bawah ini untuk membuat tiket baru</p>
        </div>
        
        <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
            <div>
                <label for="title" class="block text-sm font-medium text-gray-700 mb-2">Judul Tiket</label>
                <input type="text" id="title" v-model="form.title" placeholder="Contoh: E-Learning Error"
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <div v-if="error?.title" class="flex items-center mt-2">
                    <p class="text-xs text-red-500">{{ error.title[0] }}</p>
                </div>
            </div>

            <div>
                <label for="description" class="block text-sm font-medium text-gray-700 mb-2">Deskripsi Masalah</label>
                <textarea id="description" v-model="form.description" rows="6"
                    placeholder="Jelaskan masalah Anda secara detail. Sertakan informasi seperti:&#10;- Kapan masalah mulai terjadi&#10;- Apa yang sudah Anda coba&#10;- Dampak masalah terhadap perkuliahan"
                    class="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"></textarea>
                <div v-if="error?.description" class="flex items-center mt-2">
                    <p class="text-xs text-red-500">{{ error.description[0] }}</p>
                </div>
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Prioritas</label>
                <div class="grid grid-cols-3 gap-4">
                    <label class="relative flex cursor-pointer rounded-lg border"
                        :class="[form.priority === 'low' ? 'border-green-200 bg-green-50' : 'border-gray-200']">
                        <input type="radio" v-model="form.priority" value="low" class="sr-only">
                        <div class="flex w-full items-center justify-between p-4">
                            <div class="flex items-center">
                                <div class="text-sm">
                                    <p class="font-medium text-gray-900">Rendah</p>
                                    <p class="text-gray-500">Tidak mendesak</p>
                                </div>
                            </div>
                            <div class="shrink-0 text-green-600" v-show="form.priority === 'low'">
                                <i data-feather="check-circle" class="w-6 h-6"></i>
                            </div>
                        </div>
                    </label>
                    <label class="relative flex cursor-pointer rounded-lg border"
                        :class="[form.priority === 'medium' ? 'border-yellow-200 bg-yellow-50' : 'border-gray-200']">
                        <input type="radio" v-model="form.priority" value="medium" class="sr-only">
                        <div class="flex w-full items-center justify-between p-4">
                            <div class="flex items-center">
                                <div class="text-sm">
                                    <p class="font-medium text-gray-900">Sedang</p>
                                    <p class="text-gray-500">Normal</p>
                                </div>
                            </div>
                            <div class="shrink-0 text-yellow-600" v-show="form.priority === 'medium'">
                                <i data-feather="check-circle" class="w-6 h-6"></i>
                            </div>
                        </div>
                    </label>
                    <label class="relative flex cursor-pointer rounded-lg border"
                        :class="[form.priority === 'high' ? 'border-red-200 bg-red-50' : 'border-gray-200']">
                        <input type="radio" v-model="form.priority" value="high" class="sr-only">
                        <div class="flex w-full items-center justify-between p-4">
                            <div class="flex items-center">
                                <div class="text-sm">
                                    <p class="font-medium text-gray-900">Tinggi</p>
                                    <p class="text-gray-500">Mendesak</p>
                                </div>
                            </div>
                            <div class="shrink-0 text-red-600" v-show="form.priority === 'high'">
                                <i data-feather="check-circle" class="w-6 h-6"></i>
                            </div>
                        </div>
                    </label>
                </div>
                <div v-if="error?.priority" class="flex items-center mt-2">
                    <p class="text-xs text-red-500">{{ error.priority[0] }}</p>
                </div>
            </div>

            <div>
                <label for="image" class="block text-sm font-medium text-gray-700 mb-2">Lampiran Gambar (Opsional)</label>
                <input type="file" id="image" @change="handleImageUpload" accept="image/jpeg, image/png, image/jpg"
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                <p class="text-xs text-gray-500 mt-1">Format: JPG, JPEG, PNG. Maksimal: 10MB</p>
                
                <div v-if="error?.image" class="flex items-center mt-2">
                    <p class="text-xs text-red-500">{{ error.image[0] }}</p>
                </div>

                <div v-if="imagePreview" class="mt-4">
                    <p class="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                    <img :src="imagePreview" alt="Preview" class="w-48 h-48 object-cover rounded-lg border border-gray-200 shadow-sm">
                </div>
            </div>

            <div class="flex justify-end space-x-4 pt-4">
                <RouterLink :to="{ name: 'app.dashboard' }"
                    class="px-6 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                    Batal
                </RouterLink>
                <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="loading">
                    <i data-feather="send" class="w-4 h-4 inline-block mr-2"></i>
                    {{ loading ? 'Mengirim...' : 'Kirim Tiket' }}
                </button>
            </div>
        </form>
    </div>
</template>