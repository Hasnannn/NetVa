<template>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'WorkHours',
    components: { Bar },
    data() {
        return {
            chartData: {
                labels: ['Telkom A', 'Telkom B', 'Telkom C', 'Telkom D', 'Telkom E'],
                datasets: [{
                    label: '24 Hours',// Tambahkan label untuk dataset
                    data: [80, 90, 70, 85, 95],
                    backgroundColor: ['#EEEDEB', '#E6B9A6', '#939185', '#2F3645', '#EEEDEB'], // Ganti dengan warna yang diinginkan
                    // borderColor: ['#EEEDEB', '#E6B9A6', '#939185', '#2F3645', '#EEEDEB'], // Ganti dengan warna yang diinginkan
                    borderWidth: 1
                }]
            },
            // chartOptions: {
            //     responsive: true,
            //     plugins: {
            //         legend: {
            //             display: true,
            //             position: 'top'
            //         },
            //         tooltip: {
            //             enabled: true
            //         }
            //     }
            // }
        }
    }
}
</script>
