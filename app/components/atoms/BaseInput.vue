<script setup lang="ts">
interface Props {
  modelValue: string
  label?: string
  type?: string
  placeholder?: string
  errorMessage?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  modelValue: ''
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="input-wrapper">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input 
      :type="type" 
      :value="modelValue"
      :placeholder="placeholder"
      class="base-input"
      :class="{ 'has-error': errorMessage }"
      @input="updateValue"
    />
    <span v-if="errorMessage" class="error-text">{{ errorMessage }}</span>
  </div>
</template>

<style scoped>
.input-wrapper { display: flex; flex-direction: column; gap: 6px; width: 100%; margin-bottom: 15px; }
.input-label { font-size: 13px; font-weight: 600; color: #333; }
.base-input { padding: 12px 16px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; outline: none; transition: all 0.2s; font-family: inherit; }
.base-input:focus { border-color: black; }
.base-input.has-error { border-color: #dc3545; }
.error-text { font-size: 12px; color: #dc3545; font-weight: 500; }
</style>