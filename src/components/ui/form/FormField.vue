<script setup lang="ts">
import { computed, provide, inject } from 'vue'
import { useId } from 'reka-ui'

const props = defineProps<{
  name: string
}>()

const formName = inject<string>('FormName')
const id = useId()

const formField = computed(() => ({
  name: props.name,
  id: id,
  formName: formName,
}))

provide('FormField', formField)
</script>

<template>
  <slot v-bind="formField" />
</template>