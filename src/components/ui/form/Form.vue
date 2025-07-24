<script setup lang="ts">
import { provide } from 'vue'
import { useId } from 'reka-ui'

const props = defineProps<{
  name?: string
}>()

const name = props.name || useId()
provide('FormName', name)
</script>

<template>
  <form :name="name">
    <slot />
  </form>
</template>