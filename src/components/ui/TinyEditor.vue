<template>
  <editor :api-key="API_KEY" v-model="content" :init="editorConfig" />
</template>

<script setup>
import { ref, computed, onMounted, defineProps, defineExpose } from "vue";
import Editor from "@tinymce/tinymce-vue";

const API_KEY = import.meta.env.VITE_TINY_API_KEY;

// Props
const props = defineProps({
  initialValue: String,
  value: String,
  onEditorChange: Function,
});

// Reactive state for content
const content = ref(props.value || "");

// Dark mode settings
const darkModeSettings = {
  skin: "oxide-dark",
  content_css: "dark",
  content_style: `
    body {
      background-color: #141b1e;
      color: #ffffff;
    }
    .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
      color: #666;
    }
  `,
};

// Computed property for editor config
const editorConfig = computed(() => ({
  ...(document.body.classList.contains("dark") ? darkModeSettings : {}), // Example dark mode detection
  height: 350,
  menubar: true,
  plugins: [
    "advlist",
    "autolink",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "code",
    "fullscreen",
    "insertdatetime",
    "media",
    "table",
    "code",
    "help",
    "wordcount",
  ],
  toolbar:
    "undo redo | blocks | link image " +
    "bold italic forecolor | alignleft aligncenter " +
    "alignright alignjustify | bullist numlist outdent indent | " +
    "removeformat | help | code",
}));

// Watch for changes
onMounted(() => {
  if (props.value) {
    content.value = props.value;
  }
});

// Expose editor instance
defineExpose({ content });
</script>
