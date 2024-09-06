<template>
    <div>
        <div class="d-flex justify-content-between align-items-center">
            <h3 class="fw-bold">Selamat Datang, Aulia Arief</h3>
            <div>
                <select id="schoolName" v-model="selectedSchool" class="form-select" required>
                    <option disabled value="">Pilih Sekolah</option>
                    <option v-for="school in schoolsList" :key="school.id" :value="school.nama_sekolah">
                        {{ school.nama_sekolah }}
                    </option>
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
import axios from 'axios';

export default {
    components: { Chart },
    data() {
        return {
            schools: [],
            selectedSchool: null,
            whData: {
                labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
                datasets: [{
                    label: 'Work Hours',
                    data: [],
                    backgroundColor: ['#EEEDEB', '#E6B9A6', '#939185', '#2F3645', '#EEEDEB'],
                    borderWidth: 1
                }]
            },
            h24Data: {
                labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
                datasets: [{
                    label: '24 Hours',
                    data: [],
                    backgroundColor: ['#EEEDEB', '#E6B9A6', '#939185', '#2F3645', '#EEEDEB'],
                    borderWidth: 1
                }]
            }
        };
    },
    mounted() {
        this.fetchSchools();
    },
    methods: {
        async fetchSchools() {
            try {
                const token = localStorage.getItem('Authorization');
                const response = await axios.get('http://127.0.0.1:8000/api/pengukuran-internet?bulan=Juli&tahun=2024', {
                    'headers': {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.data.status === 'success') {
                    this.schools = response.data.data;
                }
            } catch (error) {
                console.error('Error fetching schools:', error);
            }
        },
        async updateGraphData() {
            try {
                if (!this.selectedSchool) return;
                const token = localStorage.getItem('Authorization');
                const response = await axios.get('http://127.0.0.1:8000/api/data-internet', {
                    'headers': {
                        'Authorization': `Bearer ${token}`,
                    },
                    params: {
                        school_id: this.selectedSchool.id,
                    }
                });

                if (response.data.status === 'success') {
                    const data = response.data.data;
                    this.whData.datasets[0].data = data.work_hours;
                    this.h24Data.datasets[0].data = data.hours_24;
                }
            } catch (error) {
                console.error('Error fetching graph data:', error);
            }
        }
    }
};

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
