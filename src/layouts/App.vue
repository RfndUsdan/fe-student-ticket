<script setup>
import Navbar from '@/components/app/Navbar.vue'; // (Sesuaikan path ini seperti yang sudah benar sebelumnya)
import MobileBottomNav from '@/components/app/MobileBottomNav.vue';
</script>

<template>
    <div class="bg-gray-50">
        <Navbar />

        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <router-view></router-view>
        </main>

        <MobileBottomNav />
    </div>
</template>
