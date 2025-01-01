<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Objects</h1>
      <NuxtLink
        to="/objects/add"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Add New Object
      </NuxtLink>
    </div>

    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul v-if="objects.length" class="divide-y divide-gray-200">
        <li v-for="object in objects" :key="object._id" class="px-6 py-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">{{ object.name }}</h3>
              <p class="mt-1 text-sm text-gray-500">{{ object.description }}</p>
            </div>
            <div class="flex space-x-3">
              <button
                class="text-indigo-600 hover:text-indigo-900"
                @click="editObject(object._id)"
              >
                Edit
              </button>
              <button
                class="text-red-600 hover:text-red-900"
                @click="deleteObject(object._id)"
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="px-6 py-12 text-center">
        <p class="text-gray-500">No objects found. Add your first object!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const objects = ref([])

onMounted(async () => {
  await fetchObjects()
})

async function fetchObjects() {
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/login')
    return
  }

  try {
    const response = await fetch('http://localhost:3001/api/objects', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.ok) {
      objects.value = await response.json()
    } else {
      throw new Error('Failed to fetch objects')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

async function deleteObject(id) {
  if (!confirm('Are you sure you want to delete this object?')) return

  const token = localStorage.getItem('token')
  try {
    const response = await fetch(`http://localhost:3001/api/objects/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.ok) {
      await fetchObjects()
    } else {
      throw new Error('Failed to delete object')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

function editObject(id) {
  router.push(`/objects/${id}/edit`)
}
</script>
