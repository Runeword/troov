<template>
  <ObjectForm
    title="Add New Object"
    submit-label="Add Object"
    @submit="handleSubmit"
  />
</template>

<script setup>
const router = useRouter()

const handleSubmit = async (formData) => {
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
      body: JSON.stringify(formData),
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
