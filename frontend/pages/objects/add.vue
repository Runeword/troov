<template>
  <div class="max-w-2xl mx-auto">
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-2xl font-bold text-gray-900 text-center mb-6">
        Add New Object
      </h2>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            v-model="description"
            rows="3"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div class="flex justify-between">
          <NuxtLink 
            to="/objects" 
            class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </NuxtLink>
          <button 
            type="submit" 
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Object
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const name = ref('')
const description = ref('')
const router = useRouter()

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    const response = await fetch('http://localhost:3001/api/objects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name.value,
        description: description.value,
      }),
    })

    if (response.ok) {
      router.push('/objects')
    } else {
      throw new Error('Failed to create object')
    }
  } catch (error) {
    console.error('Error creating object:', error)
    alert('Error creating object')
  }
}
</script>
