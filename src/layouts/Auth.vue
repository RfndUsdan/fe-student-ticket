<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
           <div class="mb-8">
                <div class="flex items-center justify-center gap-4">
                    
                    <div class="flex-shrink-0">
                        <img src="/logo.png" alt="Logo" class="h-12 md:h-14 w-auto" />
                    </div>
                    
                    <div class="text-left">
                        <h2 class="text-2xl md:text-3xl font-bold">
                            <span class="text-[#005AA1]">Apa</span> <span class="text-[#F58323]">Kabar</span>
                        </h2>
                        <h5 class="text-s sm:text-sm md:text-lg font-semibold text-gray-800 mt-1 md:mt-0">
                            Aplikasi Pelaporan Kerusakan Barang
                        </h5>
                        <p class="mt-1 text-[10px] md:text-sm text-gray-600">{{ title }}</p>
                    </div>
                    
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>