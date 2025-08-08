<!-- src/frontend/App.vue -->
<template>
  <div class="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold">Federal Ministries</h1>
        <p class="text-gray-500 text-sm">Number of datasets published by each ministry and its subordinates</p>
      </div>
    </div>

    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <input v-model="search" type="text" placeholder="Search ministry..."
             class="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
      <button @click="exportCSV" class="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold">
        Export CSV
      </button>
    </div>

    <div class="overflow-x-auto mb-10">
      <table class="w-full table-auto border-collapse">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="px-4 py-3 text-left font-semibold">Ministry</th>
            <th class="px-4 py-3 text-left font-semibold"># of Datasets</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(d, idx) in filtered" :key="d.departmentName"
              :class="(idx % 2 === 0 ? 'bg-white' : 'bg-gray-50') + ' hover:bg-gray-100'">
            <td class="px-4 py-3 border-t font-medium text-gray-900">{{ d.departmentName }}</td>
            <td class="px-4 py-3 border-t text-gray-700">{{ d.numberOfDatasets }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <BarChart :chartData="filtered" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BarChart from './components/BarChart.vue'

type Row = { departmentName: string; numberOfDatasets: number }

// Pull SSR data injected by EJS
const departmentsData: Row[] = JSON.parse(
  document.getElementById('departments-data')?.textContent || '[]'
)

const search = ref('')
const filtered = computed(() =>
  !search.value
    ? departmentsData
    : departmentsData.filter(d =>
        d.departmentName.toLowerCase().includes(search.value.toLowerCase())
      )
)

function exportCSV() {
  let csv = 'Ministry,# of Datasets\n'
  filtered.value.forEach(d => {
    csv += `"${d.departmentName.replace(/"/g, '""')}",${d.numberOfDatasets}\n`
  })
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'ministries_datasets.csv'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>
