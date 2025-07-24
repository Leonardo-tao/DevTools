<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import { cn } from '@/lib/utils'

interface Props extends PrimitiveProps {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'p',
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn('text-[0.8rem] font-medium text-destructive', props.class)"
  >
    <slot />
  </Primitive>
</template>