<template>
    <div>
        <h3 class="fw-bold">Selamat Datang, Aulia Arief</h3><div></div>
        <p>Data Sekolah yang Sudah Terdaftar =></p>
        <div class="card my-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h3 class="m-0 fw-bold">Daftar Sekolah</h3>
                <div class="d-flex">
                    <input type="text" class="form-control me-2" placeholder="Search" v-model="searchQuery" />
                    <button class="btn btn-success text-white" @click="addSchool">Tambah</button>
                </div>
            </div>
            <div class="card-body p-3 mb-5">
                <table class="table table-bordered m-0 text-center table-white">
                    <thead>
                        <tr style="size: 16px;">
                            <th>Nama Sekolah</th>
                            <th>Nomor Internet</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="school in filteredSchools" :key="school.id">
                            <td>{{ school.name }}</td>
                            <td>{{ school.internetNumber }}</td>
                            <td>{{ school.status }}</td>
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
const schools = ref([
    { id: 1, name: 'Telkom A', internetNumber: '123456789', status: 'Aktif' },
    { id: 2, name: 'Telkom B', internetNumber: '123456789', status: 'Aktif' },
    { id: 3, name: 'Telkom C', internetNumber: '123456789', status: 'Aktif' },
    { id: 4, name: 'Telkom D', internetNumber: '123456789', status: 'Aktif' },
    { id: 5, name: 'Telkom E', internetNumber: '123456789', status: 'Aktif' },
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
    padding: 2rem;
}

.card {
    margin-bottom: 2rem;
    border-radius: 10px;
}
</style>
