<script setup>
import { onMounted, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import feather from 'feather-icons';

const route = useRoute();

// Render ulang ikon saat pengguna berpindah halaman
watch(() => route.path, () => {
    nextTick(() => {
        feather.replace();
    });
});

watch(route, () => {
    nextTick(() => {
        feather.replace();
    });
});

onMounted(() => {
    nextTick(() => {
        feather.replace();
    });
});
</script>

<template>
    <div class="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div class="flex justify-around items-center h-16 px-2">
            
            <RouterLink :to="{ name: 'app.dashboard' }" 
                class="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-blue-600 transition-colors"
                exact-active-class="!text-blue-600">
                <i data-feather="home" class="w-6 h-6 mb-1"></i>
                <span class="text-[10px] font-medium">Beranda</span>
            </RouterLink>

            <RouterLink :to="{ name: 'app.ticket.create' }" 
                class="relative flex flex-col items-center justify-center w-full h-full group">
                <div class="absolute -top-6 bg-blue-600 text-white p-3 rounded-full shadow-lg group-hover:bg-blue-700 transition-all transform group-hover:scale-105"
                    :class="{ 'ring-4 ring-blue-100 bg-blue-700': route.name === 'app.ticket.create' }">
                    <i data-feather="plus" class="w-6 h-6"></i>
                </div>
                <span class="text-[10px] font-medium mt-7 text-gray-400" 
                    :class="{ '!text-blue-600': route.name === 'app.ticket.create' }">
                    Buat Tiket
                </span>
            </RouterLink>

            <RouterLink :to="{ name: 'app.profile' }" 
                class="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-blue-600 transition-colors"
                exact-active-class="!text-blue-600">
                <i data-feather="user" class="w-6 h-6 mb-1"></i>
                <span class="text-[10px] font-medium">Profil</span>
            </RouterLink>

        </div>
    </div>
</template>