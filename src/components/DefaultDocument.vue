<script setup lang="tsx">
import { useBreakpoint } from 'vooks';

const screenSize = useBreakpoint();
const sizeStyles: any = {
  '2xl': {
    padding: '32px 64px 32px 64px'
  },
  'xl': {
    padding: '32px 48px 32px 48px'
  },
  'l': {
    padding: '32px 32px 32px 32px'
  },
  'm': {
    padding: '24px 32px 32px 32px'
  },
  's': {
    padding: '24px 24px 32px 24px'
  },
  'xs': {
    padding: '16px 16px 32px 16px'
  }
};
</script>

<template>
  <main :style="sizeStyles[screenSize]">
    <slot></slot>
  </main>
</template>