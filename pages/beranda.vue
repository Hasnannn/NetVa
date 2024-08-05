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
                        <WhChart />
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-4">
                <div class="card h-100" style="min-height: 300px;">
                    <div class="card-header">
                        <h5 class="m-0">24 Hours</h5>
                    </div>
                    <div class="card-body">
                        <H24Chart />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BarChart from '@/components/h24Chart.vue'

const schools = ['Default', 'Telkom A', 'Telkom B', 'Telkom C'];
const selectedSchool = ref(schools[0]);

export default {
    name: 'App',
    components: { BarChart },
    data() {
        return {
            schools: ['Default', 'Telkom A', 'Telkom B', 'Telkom C', 'Telkom D', 'Telkom E'],
            selectedSchool: 'Default'
        }
    }
}
definePageMeta({
    layout: 'home'
});
</script>

<style lang="scss" scoped>
.card {
    border: 1px solid #dee2e6;
}

.card-header {
    background-color: #f8f9fa;
}
</style>
