<template>
    <div>
        <h3 class="fw-bold">Selamat Datang, Aulia Arief</h3>
        <h6>Data Internet Sekolah yang Sudah Terdaftar =></h6>
        <div class="card my-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h3 class="m-0 fw-bold">Pengukuran Internet Sekolah</h3>
                <div class="d-flex align-items-center">
                    <input type="text" class="form-control me-2" placeholder="Search" v-model="searchQuery"
                        style="width: 200px;" />
                    <button class="btn btn-success text-white" @click="openModalForAdd" style="width: 130px;">
                        <font-awesome-icon :icon="['fas', 'plus']" />Tambah
                    </button>
                </div>
            </div>
            <div class="card-body p-3 mb-5">
                <div class="d-flex mb-3">
                    <select class="form-select me-2" v-model="selectedYear" @change="fetchData">
                        <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                    </select>
                    <select class="form-select" v-model="selectedMonth" @change="fetchData">
                        <option v-for="month in months" :key="month.id" :value="month.id">{{ month.text }}</option>
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
                                <td>{{ school.internet_sekolah.sekolah.nama_sekolah }}</td>
                                <td>{{ school.internet_sekolah.nomor_internet_sekolah }}</td>
                                <td>{{ parseInt(school.data_jam_kerja) }}%</td>
                                <td>{{ parseInt(school.data_24_jam) }}%</td>
                                <td>
                                    <button class="btn btn-warning btn-sm me-2" @click="editSchool(school.id)">
                                        <font-awesome-icon :icon="['fas', 'pen']" />
                                    </button>
                                    <button class="btn btn-danger btn-sm me-2" @click="deleteSchool(school.id)">
                                        <font-awesome-icon :icon="['fas', 'trash']" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="d-flex justify-content-center mt-4">
                    <button class="btn btn-primary">
                        <font-awesome-icon :icon="['fas', 'circle-down']" /> Export
                    </button>
                </div>
            </div>
        </div>

        <Modalfix :isVisible="showModal" :title="isEdit ? 'Edit Internet Sekolah' : 'Tambah Internet Sekolah'"
            @close="closeModal" @save="saveSchool">
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
                    <select id="schoolName" v-model="selectedSchoolId" class="form-select" required>
                        <option disabled value="">Pilih Sekolah</option>
                        <option v-for="school in schoolsList" :key="school.id" :value="school.id">
                            {{ school.nama_sekolah }}
                        </option>
                    </select>
                </div>

                <div class="mb-4">
                    <label for="internetNumber" class="form-label">
                        Nomor Internet Aktif <span class="text-danger">*</span>
                    </label>
                    <select id="internetNumber" v-model="selectedInternetNumber" class="form-select" required>
                        <option disabled value="">Pilih Nomor Internet</option>
                        <option v-for="internet in internetNumbers" :key="internet.id"
                            :value="internet.nomor_internet_sekolah">
                            {{ internet.nomor_internet_sekolah }}
                        </option>
                    </select>
                </div>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="workHours" class="form-label">
                            Work Hours (Tanpa %) <span class="text-danger">*</span>
                        </label>
                        <input type="text" id="workHours" v-model="workHours" class="form-control" required />
                    </div>
                    <div class="col-md-6">
                        <label for="hours24" class="form-label">
                            24 Hours (tanpa %) <span class="text-danger">*</span>
                        </label>
                        <input type="text" id="hours24" v-model="hours24" class="form-control" required />
                    </div>
                    <div>
                        <button type="button" class="btn btn-primary mt-4 w-100">
                            <font-awesome-icon :icon="['fas', 'cloud-arrow-up']" /> Import Dari Excel
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

import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

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

const schools = ref([]);
const schoolsList = ref([]);
const showModal = ref(false);
const workHours = ref('');
const hours24 = ref('');
const internetList = ref([]);
const isEdit = ref(false);
const currentSchool = ref(null);
const selectedInternetNumber = ref('');
const selectedSchoolId = ref('');
const internetNumbers = ref([]);


const filteredSchools = computed(() => {
    return schools.value.filter(school => {
        return school.internet_sekolah &&
            school.bulan === months.value.find(month => month.id === selectedMonth.value)?.text &&
            school.tahun_berjalan === selectedYear.value;
    });
});

const fetchData = async () => {
    try {
        const token = localStorage.getItem('Authorization');
        const responseSchools = await axios.get('http://127.0.0.1:8000/api/sekolah', {
            'headers': {
                'Authorization': `Bearer ${token}`,
            },
        });

        const response = await axios.get('http://127.0.0.1:8000/api/pengukuran-internet', {
            'headers': {
                'Authorization': `Bearer ${token}`
            },
            'params': {
                'bulan': months.value.find(month => month.id === selectedMonth.value)?.text,
                'tahun': selectedYear.value
            }
        });

        if (response.data.status === 'success') {
            schools.value = response.data.data;
        }
        schoolsList.value = responseSchools.data.data[0];
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const fetchInternetNumbers = async (schoolId) => {
    try {
        const token = localStorage.getItem('Authorization');
        const response = await axios.get(`http://127.0.0.1:8000/api/internet-sekolah/internet-sekolah-aktif/${schoolId}`, {
            'headers': {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.data.status === 'success') {
            internetNumbers.value = response.data.data;
        }
    } catch (error) {
        console.error('Error fetching internet numbers:', error);
    }
};

watch(selectedSchoolId, (newSchoolId) => {
    if (newSchoolId) {
        fetchInternetNumbers(newSchoolId);
    } else {
        internetNumbers.value = [];
    }
});

const openModalForAdd = () => {
    resetForm();
    showModal.value = true;
    isEdit.value = false;
};

const closeModal = () => {
    showModal.value = false;
};

const resetForm = () => {
    selectedSchoolId.value = '';
    selectedInternetNumber.value = '';
    workHours.value = '';
    hours24.value = '';
};

const saveSchool = async () => {
    const form = document.querySelector('form');
    if (form.checkValidity()) {
        try {
            const token = localStorage.getItem('Authorization');
            const payload = {
                'id_internet': internetNumbers.value.find(internet => internet.nomor_internet_sekolah === selectedInternetNumber.value)?.id,
                'bulan': months.value.find(month => month.id === selectedMonth.value)?.text,
                'data_jam_kerja': workHours.value,
                'data_24_jam': hours24.value,
            };

            if (isEdit.value) {
                const response = await axios.put(`http://127.0.0.1:8000/api/pengukuran-internet/${currentSchool.value.id}`, payload, {
                    'headers': {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.data.status === 'success') {
                    alert(response.data.message);
                    fetchData();
                    closeModal();
                } else {
                    console.error('Gagal memperbarui data:', response.data);
                }
            } else {
                const response = await axios.post('http://127.0.0.1:8000/api/pengukuran-internet', payload, {
                    'headers': {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.data.status === 'success') {
                    alert(response.data.message);
                    fetchData();
                    closeModal();
                } else {
                    console.error('Gagal menambahkan data:', response.data);
                }
            }
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }
};

const editSchool = (id) => {
    const schoolToEdit = schools.value.find(school => school.id === id);
    if (schoolToEdit) {
        selectedSchoolId.value = schoolToEdit.internet_sekolah.sekolah.id;
        selectedInternetNumber.value = schoolToEdit.internet_sekolah.nomor_internet_sekolah;
        selectedMonth.value = months.value.find(month => month.text === schoolToEdit.bulan)?.id;
        workHours.value = schoolToEdit.data_jam_kerja;
        hours24.value = schoolToEdit.data_24_jam;
        showModal.value = true;
        isEdit.value = true;
        currentSchool.value = schoolToEdit;
    }
};

const deleteSchool = async (id) => {
    try {
        const token = localStorage.getItem('Authorization');
        const response = await axios.delete(`http://127.0.0.1:8000/api/pengukuran-internet/${id}`, {
            'headers': {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (response.data.status === 'success') {
            schools.value = schools.value.filter(school => school.id !== id);
            alert(response.data.message);
        } else {
            console.error('Gagal menghapus data:', response.data);
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        alert('Terjadi kesalahan saat menghapus data');
    }
};


onMounted(() => {
    fetchData();
});
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
    overflow-y: auto;
}
</style>