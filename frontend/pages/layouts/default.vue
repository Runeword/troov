<template>
  <div class="min-h-screen bg-gray-50">
    <nav v-if="isAuthenticated" class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <NuxtLink to="/objects" class="text-white font-bold text-xl">
            Troov
          </NuxtLink>
          <button
            class="px-4 py-2 text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            @click="logout"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAuthenticated = ref(false)

const checkAuth = () => {
  if (process.client) {
    isAuthenticated.value = !!localStorage.getItem('token')
  }
}

const logout = () => {
  localStorage.removeItem('token')
  isAuthenticated.value = false
  router.push('/login')
}

onMounted(() => {
  checkAuth()
})

// Watch for route changes to update authentication status
watch(() => router.currentRoute.value.path, () => {
  checkAuth()
})
</script>

<style>
.navbar {
  margin-bottom: 2rem;
}
</style>
