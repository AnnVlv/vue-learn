<template>
  <div class="modal" v-if="isVisible" @click="closeModal">
    <div class="modal__content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-modal',
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    isClosable: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    closeModal() {
      if (!this.isClosable) {
        return;
      }
      this.$emit('update:isVisible', false);
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.modal__content {
  background: white;
  border-radius: 5px;
  position: absolute;
  padding: 15px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
