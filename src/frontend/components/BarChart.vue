<!-- src/frontend/components/BarChart.vue -->
<template>
  <div class="bg-gray-50 rounded-xl p-6 shadow-inner">
    <h2 class="text-lg font-semibold mb-4">Datasets by Ministry (Bar Chart)</h2>
    <canvas ref="canvasRef" height="120"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Chart from 'chart.js/auto'

interface ChartRow {
  departmentName: string
  numberOfDatasets: number
}

const props = defineProps<{
  chartData: ChartRow[]
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

function renderChart() {
  const el = canvasRef.value
  if (!el) return

  if (chartInstance) chartInstance.destroy()
  const ctx = el.getContext('2d')
  if (!ctx) return

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: props.chartData.map(d => d.departmentName),
      datasets: [
        {
          label: '# of Datasets',
          data: props.chartData.map(d => d.numberOfDatasets),
          backgroundColor: 'rgba(99, 102, 241, 0.7)',
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true }
      }
    }
  })
}

onMounted(renderChart)
watch(() => props.chartData, renderChart, { deep: true })
</script>
