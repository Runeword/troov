<template>
  <ObjectForm
    title="Edit Object"
    submit-label="Update Object"
    :initial-data="{ name, description }"
    @submit="handleSubmit"
  />
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const name = ref('')
const description = ref('')

const fetchObject = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    const response = await fetch(`http://localhost:3001/api/objects/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.ok) {
      const object = await response.json()
      name.value = object.name
      description.value = object.description
    } else {
      throw new Error('Failed to fetch object')
    }
  } catch (error) {
    console.error('Error fetching object:', error)
    alert('Error fetching object')
    router.push('/objects')
  }
}

const handleSubmit = async (formData) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3001/api/objects/${route.params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      router.push('/objects')
    } else {
      throw new Error('Failed to update object')
    }
  } catch (error) {
    console.error('Error updating object:', error)
    alert('Error updating object')
  }
}

onMounted(() => {
  fetchObject()
})
</script>
