<template>
  <!-- Hapus dark:bg-gray-800 dan dark:border-gray-700 dari baris di bawah -->
  <footer class="bg-white rounded-lg shadow border border-gray-200 m-4">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <router-link to="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src="/logo.png" class="h-8 md:h-9 w-auto object-contain" alt="Logo Sistem Tiket" />          <!-- Hapus dark:text-white -->
          <span class="text-2xl font-semibold whitespace-nowrap text-gray-800">Apa Kabar</span>
        </router-link>
        <!-- Hapus dark:text-gray-400 -->
        <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
          <li><a href="#" class="hover:underline me-4 md:me-6">Tentang</a></li>
          <li><a href="#" class="hover:underline me-4 md:me-6">Kebijakan Privasi</a></li>
          <li><a href="#" class="hover:underline me-4 md:me-6">Bantuan</a></li>
          <li><a href="#" class="hover:underline">Kontak</a></li>
        </ul>
      </div>
      <!-- Hapus dark:border-gray-700 -->
      <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
      <!-- Hapus dark:text-gray-400 -->
      <span class="block text-sm text-gray-500 sm:text-center">
        © {{ currentYear }} <router-link to="/" class="hover:underline">Apa Kabar™</router-link>. All Rights Reserved.
      </span>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
const currentYear = ref(new Date().getFullYear());
</script>