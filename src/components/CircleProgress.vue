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
  stepValue?: number; // seconds per step
  value?: number; // initial value
  complededValue?: number; // completed value
}

const settings = withDefaults(defineProps<Settings>(), {
  diameter: 400,
  strokeWidth: 5,
  strokeColor: "#9ca3c9",
  strokeActiveColor: "#ff4a44",
  animationDuration: 1000,
  gap: 10,
  segments: 1,
  stepValue: 0,
  value: 0,
  complededValue: 0,
})

const canvasElem = ref<HTMLCanvasElement>();
let ctx: CanvasRenderingContext2D | null;

const roundedPI: number = Number(Math.PI.toFixed(3)) // 3.142 to be more precise
// need to draw the circle in the middle of the canvas
const gap = computed(() => settings.gap + settings.strokeWidth);
const radius = computed(() => settings.diameter / 2);
const circumference = computed(() => roundedPI * settings.diameter);
const segmentLength = computed(() => {
  if (settings.segments > 1) {
    return (circumference.value - gap.value * settings.segments) / settings.segments
  }
});

// need to count completed steps
const completedValueAsPercentDegrees = computed(() => {
  return (360 / settings.value) * settings.complededValue;
});

const drawTimer = (ctx: CanvasRenderingContext2D) => {

  ctx.clearRect(0, 0, settings.diameter + gap.value, settings.diameter + gap.value); // clear previous drawn content

  // translates are for the circle to be in the middle of the canvas, on init and after rotation
  const posXandY = (settings.diameter + gap.value) / 2;
  ctx.translate(posXandY, posXandY);
  ctx.rotate(-90 * (roundedPI / 180)); // rotate 90deg so we start drawind form the top (0deg)
  ctx.translate(-posXandY, -posXandY);

  ctx.beginPath();
  ctx.arc(posXandY, posXandY, radius.value, 0, roundedPI * 2);
  if (segmentLength.value) {
    ctx.setLineDash([segmentLength.value, gap.value]);
  }
  ctx.lineDashOffset = -gap.value * 0.5;
  ctx.lineWidth = settings.strokeWidth;
  ctx.lineCap = "butt";
  ctx.strokeStyle = settings.strokeColor;
  ctx.stroke();

  ctx.beginPath();
  // TODO: add step and stepSize support
  ctx.arc(posXandY, posXandY, radius.value, 0, (roundedPI / 180) * completedValueAsPercentDegrees.value);
  ctx.strokeStyle = settings.strokeActiveColor;
  ctx.stroke();

  ctx.setLineDash([]);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

onMounted(() => {
  ctx = canvasElem.value!.getContext("2d"); // ! - is a non-null assertion operator (typescript)
  if (ctx) {
    drawTimer(ctx);
  }
})

onBeforeUpdate(() => {
  if (ctx) {
    drawTimer(ctx);
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