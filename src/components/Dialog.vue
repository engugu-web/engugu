<template>
  <dialog
    ref="dialog"
    class="contact-dialog"
    aria-labelledby="contact-dialog-title"
    @cancel.prevent="emit('close')"
    @click="closeOnBackdrop"
  >
    <button
      class="dialog-close"
      type="button"
      aria-label="Close contact dialog"
      @click="emit('close')"
    >
      ×
    </button>
    <h2 id="contact-dialog-title">Let's talk!</h2>
    <p>Explore collaboration opportunities with Orange Global Media.</p>
    <a href="mailto:fanta@orangeglobalmedia.agency"
      >fanta@orangeglobalmedia.agency</a
    >
    <button class="copy-email" type="button" @click="copyEmail">
      {{ copied ? "Copied!" : "Copy email" }}
    </button>
    <p v-if="copyError" class="copy-error" role="status">{{ copyError }}</p>
  </dialog>
</template>
<script setup>
import { ref, watchEffect, watch } from "vue";
const props = defineProps({ dialogVisible: Boolean });
const emit = defineEmits(["close"]);
const dialog = ref(null);
const copied = ref(false);
const copyError = ref("");

watchEffect(
  () => {
    if (!dialog.value) return;
    if (props.dialogVisible && !dialog.value.open) dialog.value.showModal();
    else if (!props.dialogVisible && dialog.value.open) dialog.value.close();
  },
  { flush: "post" },
);

watch(
  () => props.dialogVisible,
  () => {
    copied.value = false;
    copyError.value = "";
  },
);

function closeOnBackdrop(event) {
  if (event.target !== dialog.value) return;
  const rect = dialog.value.getBoundingClientRect();
  if (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  )
    emit("close");
}
async function copyEmail() {
  try {
    await navigator.clipboard.writeText("fanta@orangeglobalmedia.agency");
    copied.value = true;
    copyError.value = "";
  } catch {
    copyError.value = "Please select and copy the email address.";
  }
}
</script>
<style scoped>
.contact-dialog {
  position: fixed;
  width: min(560px, calc(100% - 32px));
  max-height: calc(100% - 32px);
  overflow: auto;
  margin: auto;
  padding: 36px;
  border: 0;
  border-radius: 16px;
  color: #151515;
  background: white;
  text-align: left;
  box-shadow: 0 20px 80px #0003;
}
.contact-dialog::backdrop {
  background: #0008;
}
.contact-dialog h2 {
  font-size: 28px;
  font-weight: 700;
  padding-right: 32px;
}
.contact-dialog p {
  line-height: 1.7;
  margin: 16px 0 24px;
  font-size: 16px;
}
.contact-dialog a {
  display: block;
  color: #d9441c;
  overflow-wrap: anywhere;
}
.dialog-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 36px;
  height: 36px;
  border: 0;
  background: transparent;
  color: #555;
  font-size: 28px;
  line-height: 1;
}
.copy-email {
  margin-top: 24px;
  border: 0;
  border-radius: 24px;
  padding: 12px 24px;
  background: #f1542d;
  color: white;
}
.contact-dialog .copy-error {
  color: #b63718;
  margin-bottom: 0;
  font-size: 14px;
}
@media (max-width: 500px) {
  .contact-dialog {
    padding: 28px 24px;
  }
}
</style>
