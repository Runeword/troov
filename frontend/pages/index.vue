<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center">
    <div class="max-w-md w-full text-center space-y-8">
      <h1 class="text-4xl font-bold text-gray-900">
        Welcome to Troov
      </h1>
      <p class="text-xl text-gray-600">
        Please login or register to continue
      </p>
      <div class="space-x-4">
        <NuxtLink
          to="/login"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Login
        </NuxtLink>
        <NuxtLink
          to="/register"
          class="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Register
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter()

onMounted(() => {
  if (process.client) {
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/objects')
    }
  }
})
</script>
