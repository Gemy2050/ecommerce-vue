<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";
import { computed } from "vue";
import clsx from "clsx"; // Import clsx for merging classes
import { Loader2 } from "lucide-vue-next";

const buttonStyles = cva(
  "rounded px-4 py-2 font-medium inline-flex justify-center items-center gap-3 transition-all disabled:opacity-60 disabled:cursor-not-allowed duration-300", // Base styles
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white [&:not(:disabled)]:hover:bg-primary-hover",
        secondary:
          "bg-secondary text-white [&:not(:disabled)]:hover:bg-secondary-hover",
        destructive:
          "bg-destructive text-white [&:not(:disabled)]:hover:bg-destructive-hover",
        success:
          "bg-success text-white [&:not(:disabled)]:hover:bg-success-hover",
        accent: "bg-accent text-white [&:not(:disabled)]:hover:bg-accent-hover",
        outline:
          "border border-input bg-background hover:bg-accent [&:not(:disabled)]:hover:text-white",
        link: "text-accent [&:not(:disabled)]:hover:underline",
      },
      size: {
        sm: "text-sm py-1 px-2",
        md: "text-base py-2 px-4",
        lg: "text-lg py-3 px-6",
      },
      fullWidth: {
        true: "w-full",
      },
      rounded: {
        default: "rounded-[10px]",
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonVariants = VariantProps<typeof buttonStyles>;
interface ButtonProps {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  rounded?: ButtonVariants["rounded"];
  fullWidth?: boolean;
  class?: string;
  disabled?: boolean;
  as?: string;
  to?: string;
}

// Use TypeScript with defineProps
const props = defineProps<ButtonProps>();

// Merge computed classes with user-provided class prop
const classes = computed(() => {
  const { variant, size, rounded, fullWidth, class: userClass } = props;

  return clsx(buttonStyles({ variant, size, rounded, fullWidth }), userClass);
});
</script>

<template>
  <component
    :is="as === 'link' ? 'RouterLink' : 'button'"
    :to="as === 'link' ? to : undefined"
    :class="classes"
    v-bind="$attrs"
    :disabled="disabled"
  >
    <Loader2 v-if="disabled" class="w-5 h-5 animate-spin" />
    <slot />
  </component>
</template>
