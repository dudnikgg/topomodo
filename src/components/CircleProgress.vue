<script lang="ts" setup>
import { onMounted, ref, withDefaults, computed, onBeforeUpdate } from "vue";
interface Settings {
  diameter?: number;
  strokeWidth?: number;
  strokeColor?: string;
  strokeActiveColor?: string;
  animationDuration?: number;
  gap?: number; // gap between segments
  segments?: number; // number of segments
  step?: number; // miliseconds
  completedSteps?: number;
}

const settings = withDefaults(defineProps<Settings>(), {
  diameter: 400,
  strokeWidth: 5,
  strokeColor: "#9ca3c9",
  strokeActiveColor: "#ff4a44",
  animationDuration: 1000,
  gap: 10,
  segments: 0,
  step: 1000,
  completedSteps: 0,
})

const canvasElem = ref<HTMLCanvasElement>();
let ctx: CanvasRenderingContext2D | null;

// TODO: should be in a timer component
// const int = setInterval(() => {
//   test.value = test.value + 1/60
//   console.log(test.value);
// }, 1000)

// Settings
const gap = computed(() => settings.gap + settings.strokeWidth);
const radius = computed(() => settings.diameter / 2);
const circumference = computed(() => 2 * Math.PI * radius.value);
const segmentLength = computed(() => {
  if (settings.segments <= 1) return 0;
  return circumference.value / settings.segments - gap.value
});
const t = computed(() => ((Math.PI / 180) * -90) / settings.segments); // TODO: ??? -> change name : it is probably a 'step' check ipadnotes

const drawInitCircle = (ctx: CanvasRenderingContext2D, tick: number = 0) => {
  ctx.clearRect(0, 0, settings.diameter + gap.value, settings.diameter + gap.value); // clear previous drawn content
  ctx.setTransform(1, 0, 0, 1, radius.value + gap.value / 2, radius.value + gap.value / 2); // translate to center
  ctx.rotate(-90 * (Math.PI / 180)); // rotate -90deg

  ctx.beginPath();
  ctx.arc(0, 0, radius.value, 0, Math.PI * 2);
  if (segmentLength.value > 0) {
    ctx.setLineDash([segmentLength.value, gap.value]);
  }
  ctx.lineDashOffset = -gap * 0.5;
  ctx.lineWidth = settings.strokeWidth;
  ctx.lineCap = "butt";
  ctx.strokeStyle = settings.strokeColor;
  ctx.stroke();

  ctx.beginPath();
  // TODO: add step and stepSize support
  ctx.arc(0, 0, radius.value, 0, Math.PI * 2 * tick);
  ctx.strokeStyle = settings.strokeActiveColor;
  ctx.stroke();

  ctx.setLineDash([]);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

onMounted(() => {
  ctx = canvasElem.value!.getContext("2d"); // ! - is a non-null assertion operator (typescript)
  if (ctx) {
    drawInitCircle(ctx);
  }
})

onBeforeUpdate(() => {
  if (ctx) {
    drawInitCircle(ctx, t.value);
  }
})

</script>
<template>
  <div class="circle-progress">
    <canvas ref="canvasElem" :width="settings.diameter + gap" :height="settings.diameter + gap"></canvas>
    <slot></slot>
  </div>
</template>
<style scoped>
.circle-progress {
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle-progress,
canvas {
  position: relative;
}
</style>