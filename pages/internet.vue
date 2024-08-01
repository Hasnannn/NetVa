<template>
    <div>
        <h3 class="fw-bold">Selamat Datang, Aulia Arief</h3>
        <p>Data Internet Sekolah yang Sudah Terdaftar =></p>
        <div class="card my-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h3 class="m-0 fw-bold">Daftar Sekolah</h3>
                <div class="d-flex">
                    <input type="text" class="form-control me-2" placeholder="Search" v-model="searchQuery" />
                    <button class="btn btn-success text-white" @click="addSchool">Tambah</button>
                </div>
            </div>
            <div class="card-body p-3 mb-5">
                <div class="d-flex mb-3">
                    <select class="form-select me-2" v-model="selectedYear">
                        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                    </select>
                    <select class="form-select" v-model="selectedMonth">
                        <option v-for="month in months" :key="month.value" :value="month.value">{{ month.text }}</option>
                    </select>
                </div>
                <table class="table table-bordered m-0 text-center table-white">
                    <thead>
                        <tr>
                            <th>Nama Sekolah</th>
                            <th>Nomor Internet</th>
                            <th>Work Hours (%)</th>
                            <th>24 Hours</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="school in filteredSchools" :key="school.id">
                            <td>{{ school.name }}</td>
                            <td>{{ school.internetNumber }}</td>
                            <td>{{ school.workHours }}%</td>
                            <td>{{ school.totalHours }}%</td>
                            <td>
                                <button class="btn btn-warning btn-sm me-2" @click="editSchool(school.id)">Edit</button>
                                <button class="btn btn-danger btn-sm" @click="deleteSchool(school.id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'home'
});

import { ref, computed } from 'vue';

const searchQuery = ref('');
const selectedYear = ref(new Date().getFullYear());
const selectedMonth = ref(new Date().getMonth() + 1); 
const years = ref([2024, 2023, 2022, 2021]); 
const months = ref([
    { value: 1, text: 'Januari' },
    { value: 2, text: 'Februari' },
    { value: 3, text: 'Maret' },
    { value: 4, text: 'April' },
    { value: 5, text: 'Mei' },
    { value: 6, text: 'Juni' },
    { value: 7, text: 'Juli' },
    { value: 8, text: 'Agustus' },
    { value: 9, text: 'September' },
    { value: 10, text: 'Oktober' },
    { value: 11, text: 'November' },
    { value: 12, text: 'Desember' },
]);

const schools = ref([
    { id: 1, name: 'Telkom A', internetNumber: '123456789', workHours: 80, totalHours: 75 },
    { id: 2, name: 'Telkom B', internetNumber: '123456789', workHours: 90, totalHours: 80 },
    { id: 3, name: 'Telkom C', internetNumber: '123456789', workHours: 70, totalHours: 65 },
    { id: 4, name: 'Telkom D', internetNumber: '123456789', workHours: 85, totalHours: 70 },
    { id: 5, name: 'Telkom E', internetNumber: '123456789', workHours: 95, totalHours: 90 },
]);

const filteredSchools = computed(() => {
    return schools.value.filter(school =>
        school.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const addSchool = () => {
    console.log('Tambah Sekolah');
};

const editSchool = (id) => {
    console.log('Edit Sekolah', id);
};

const deleteSchool = (id) => {
    console.log('Delete Sekolah', id);
};
</script>

<style scoped>
.card-header {
    background-color: white;
}

.table-white {
    background-color: white;
    border-radius: 10px;
}

.card-body {
    padding: 1rem;
}

.card {
    margin-bottom: 2rem;
    border-radius: 10px;
}
</style>
