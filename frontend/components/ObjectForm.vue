<template>
  <div class="max-w-2xl mx-auto">
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-2xl font-bold text-gray-900 text-center mb-6">
        {{ title }}
      </h2>
      <form class="space-y-6" @submit.prevent="onSubmit">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            v-model="formData.description"
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
            {{ submitLabel }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  submitLabel: {
    type: String,
    required: true,
  },
  initialData: {
    type: Object,
    default: () => ({ name: '', description: '' }),
  },
})

const emit = defineEmits(['submit'])

const formData = ref({
  name: props.initialData.name,
  description: props.initialData.description,
})

const onSubmit = () => {
  emit('submit', {
    name: formData.value.name,
    description: formData.value.description,
  })
}

// Watch for changes in initialData
watch(() => props.initialData, (newData) => {
  formData.value = { ...newData }
}, { deep: true })
</script>
