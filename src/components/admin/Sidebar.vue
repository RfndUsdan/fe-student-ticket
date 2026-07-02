<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()
const { logout } = authStore

const handleLogout = async () => {
    await logout()
}
</script>

<template>
    <aside class="w-64 bg-gray-50 min-h-screen shadow-xl">
        <div class="p-6 border-b border-gray-800">
            <h1 class="text-2xl font-bold text-blue-500 flex items-center">
                Student-Ticket
            </h1>
        </div>
        
        <nav class="mt-6">
            <RouterLink :to="{ name: 'admin.dashboard' }"
                class="flex items-center px-6 py-3 text-gray-400 transition-colors duration-200 hover:bg-white-800 hover:text-gray-800 hover:border-l-4 hover:border-blue-500"
                :class="{ 'text-gray-800 border-l-4 border-blue-500': $route.name === 'admin.dashboard' }">
                <i data-feather="home" class="w-5 h-5 mr-3"></i>
                Dashboard
            </RouterLink>

            <RouterLink :to="{ name: 'admin.ticket' }"
                class="flex items-center px-6 py-3 text-gray-400 transition-colors duration-200 hover:bg-white-800 hover:text-gray-800 hover:border-l-4 hover:border-blue-500"
                :class="{ 'text-gray-800 border-l-4 border-blue-500': $route.name === 'admin.ticket' }">
                <i data-feather="tag" class="w-5 h-5 mr-3"></i>
                Tiket
            </RouterLink>

            <RouterLink :to="{ name: 'admin.users' }"
                class="flex items-center px-6 py-3 text-gray-400 transition-colors duration-200 hover:bg-white-800 hover:text-gray-800 hover:border-l-4 hover:border-blue-500"
                :class="{ 'text-gray-800 border-l-4 border-blue-500': $route.name === 'admin.users' || $route.name === 'admin.users.detail' }">
                <i data-feather="users" class="w-5 h-5 mr-3"></i>
                Pengguna
            </RouterLink>

            <a @click="handleLogout"
                class="flex items-center px-6 py-3 text-gray-400 cursor-pointer transition-colors duration-200 hover:bg-red-900/20 hover:text-red-400 hover:border-l-4 hover:border-red-500 mt-6">
                <i data-feather="log-out" class="w-5 h-5 mr-3"></i>
                Logout
            </a>
        </nav>
    </aside>
</template>