<template>
    <div>
        <h3 class="fw-bold">Selamat Datang, Aulia Arief</h3>
        <h6>Data Internet Sekolah yang Sudah Terdaftar =></h6>
        <div class="card my-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h3 class="m-0 fw-bold">Daftar Internet Sekolah</h3>
                <div class="d-flex align-item-center">
                    <input type="text" class="form-control me-2" placeholder="Search" v-model="searchQuery" style="width: 200px;"/>
                    <button class="btn btn-success text-white" @click="showModal = true"
                        style="width: 130px;"><font-awesome-icon :icon="['fas', 'plus']" />Tambah
                    </button>
                </div>
            </div>
            <div class="card-body p-3 mb-5">
                <div class="d-flex mb-3">
                    <select class="form-select me-2" v-model="selectedYear">
                        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                    </select>
                    <select class="form-select" v-model="selectedMonth">
                        <option v-for="month in months" :key="month.value" :value="month.value">{{ month.text }}
                        </option>
                    </select>
                </div>
                <div class="table-responsive">
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
                                    <button class="btn btn-warning btn-sm me-2" @click="editSchool(school.id)">
                                        <font-awesome-icon :icon="['fas', 'pen']" />
                                    </button>
                                    <button class="btn btn-danger btn-sm" @click="deleteSchool(school.id)">
                                        <font-awesome-icon :icon="['fas', 'trash']" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <Modalfix :isVisible="showModal" title="Tambah Internet Sekolah" @close="showModal = false"
            @save="saveSchool">
            <form @submit.prevent="saveSchool" ref="schoolForm">
                <div class="mb-4">
                    <label for="bulan" class="form-label">
                        Bulan Berjalan <span class="text-danger">*</span>
                    </label>
                    <select id="bulan" v-model="selectedMonth" class="form-select" required>
                        <option disabled value="">Pilih Bulan</option>
                        <option v-for="month in months" :key="month.id" :value="month.id">
                            {{ month.text }}
                        </option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="schoolName" class="form-label">
                        Nama Sekolah <span class="text-danger">*</span>
                    </label>
                    <select id="schoolName" v-model="selectedSchool" class="form-select" required>
                        <option disabled value="">Pilih Sekolah</option>
                        <option v-for="school in schoolsList" :key="school.id" :value="school.name">{{ school.name }}
                        </option>
                    </select>
                </div>
                <div class="mb-4">
                    <label for="internetNumber" class="form-label">
                        Nomor Internet Aktif <span class="text-danger">*</span>
                    </label>
                    <input type="text" id="internetNumber" v-model="internetNumber" class="form-control" required />
                </div>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="workHours" class="form-label">
                            Work Hours (Tanpa %) <span class="text-danger">*</span>
                        </label>
                        <input type="text" id="workHours" v-model="workHours" class="form-control" required />
                        <button type="button" class="btn btn-primary mt-4 w-100">
                            <font-awesome-icon :icon="['fas', 'cloud-arrow-up']" /> Import Dari Excel
                        </button>
                    </div>
                    <div class="col-md-6">
                        <label for="hours24" class="form-label">
                            24 Hours (tanpa %) <span class="text-danger">*</span>
                        </label>
                        <input type="text" id="hours24" v-model="hours24" class="form-control" required />
                        <button type="button" class="btn btn-primary mt-4 w-100">
                            <font-awesome-icon :icon="['fas', 'circle-down']" /> Unduh Format Excel
                        </button>
                    </div>
                </div>

                <div v-for="(internet, index) in internetList" :key="index" class="row mb-3">
                    <div class="col-md-6">
                        <label class="form-label">
                            Nomor Internet <span class="text-danger">*</span>
                        </label>
                        <input type="text" v-model="internet.number" placeholder="Nomor Internet"
                            class="form-control mb-2" required />
                    </div>
                </div>
            </form>
        </Modalfix>
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
    { id: 1, text: 'Januari' },
    { id: 2, text: 'Februari' },
    { id: 3, text: 'Maret' },
    { id: 4, text: 'April' },
    { id: 5, text: 'Mei' },
    { id: 6, text: 'Juni' },
    { id: 7, text: 'Juli' },
    { id: 8, text: 'Agustus' },
    { id: 9, text: 'September' },
    { id: 10, text: 'Oktober' },
    { id: 11, text: 'November' },
    { id: 12, text: 'Desember' },
]);

const schools = ref([
    { id: 1, name: 'Telkom A', internetNumber: '123456789', workHours: 80, totalHours: 75 },
    { id: 2, name: 'Telkom B', internetNumber: '123456789', workHours: 90, totalHours: 80 },
]);

const filteredSchools = computed(() => {
    return schools.value.filter(school =>
        school.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const showModal = ref(false);
const schoolsList = ref([
    { id: 1, name: 'Telkom A' },
    { id: 2, name: 'Telkom B' },
    { id: 3, name: 'Telkom C' },
]);

const selectedSchool = ref('');
const internetNumber = ref('');
const workHours = ref('');
const hours24 = ref('');
const internetList = ref([]);

const saveSchool = () => {
    const form = document.querySelector('form');
    if (form.checkValidity()) {
        const newSchool = {
            id: schools.value.length + 1,
            name: selectedSchool.value,
            internetNumber: internetNumber.value,
            workHours: workHours.value,
            totalHours: hours24.value
        };


        schools.value.push(newSchool);

        selectedSchool.value = '';
        internetNumber.value = '';
        workHours.value = '';
        hours24.value = '';


        console.log('School data saved:', newSchool);
        showModal.value = false;
    } else {
        form.reportValidity();
    }
};


const editSchool = (id) => {
    const schoolToEdit = schools.value.find(school => school.id === id);
    if (schoolToEdit) {
        selectedSchool.value = schoolToEdit.name;
        internetNumber.value = schoolToEdit.internetNumber;
        workHours.value = schoolToEdit.workHours;
        hours24.value = schoolToEdit.totalHours;
        showModal.value = true; // Tampilkan modal
        isEdit.value = true; // Tandai sebagai mode edit
        currentSchool.value = schoolToEdit; // Simpan referensi ke sekolah yang sedang diedit
    }
};

const deleteSchool = (id) => {
    schools.value = schools.value.filter(school => school.id !== id);
};
</script>

<style scoped>
.card-header {
    background-color: white;
    border-radius: 10px;
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

.table-responsive {
    max-height: 300px;
    /* Ganti sesuai kebutuhan */
    overflow-y: auto;
    /* Scroll vertikal */
}
</style>
