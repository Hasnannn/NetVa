<template>
    <div>
        <div class="d-flex justify-content-between align-items-center">
            <h3 class="fw-bold">Selamat Datang, Aulia Arief</h3>
            <div>
                <select v-model="selectedSchool" class="form-select w-auto">
                    <option v-for="school in schools" :key="school" :value="school">{{ school }}</option>
                </select>
            </div>
        </div>
        <h6>Grafik Bulan Ini =></h6>
        <div class="row">
            <div class="col-md-6 mb-4">
                <div class="card h-100" style="min-height: 300px;">
                    <div class="card-header">
                        <h5 class="m-0">Work Hours</h5>
                    </div>
                    <div class="card-body">
                        <Chart :chartData="whData" />
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-4">
                <div class="card h-100" style="min-height: 300px;">
                    <div class="card-header">
                        <h5 class="m-0">24 Hours</h5>
                    </div>
                    <div class="card-body">
                        <Chart :chartData="h24Data" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from '@/components/chart';

export default {
    components: { Chart },
    data() {
        return {
            schools: ['Default', 'Telkom A', 'Telkom B', 'Telkom C', 'Telkom D', 'Telkom E'],
            selectedSchool: 'Default',
            whData: {
                labels: ['Telkom A', 'Telkom B', 'Telkom C', 'Telkom D', 'Telkom E'],
                datasets: [{
                    label: 'Work Hours',
                    data: [100, 80, 80, 50, 95],
                    backgroundColor: ['#EEEDEB', '#E6B9A6', '#939185', '#2F3645', '#EEEDEB'],
                    borderWidth: 1
                }]
            },
            h24Data: {
                labels: ['Telkom A', 'Telkom B', 'Telkom C', 'Telkom D', 'Telkom E'],
                datasets: [{
                    label: '24 Hours',
                    data: [60, 85, 50, 100, 95],
                    backgroundColor: ['#EEEDEB', '#E6B9A6', '#939185', '#2F3645', '#EEEDEB'],
                    borderWidth: 1
                }]
            }
        }
    }
}
definePageMeta({
    layout: 'home'
});
</script>

<style lang="scss" scoped>
.card {
    border: 10px solid #dee2e6;
}

.card-header {
    background-color: #f8f9fa;
}
</style>
