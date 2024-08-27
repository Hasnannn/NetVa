<template>
    <div>
        <h3 class="fw-bold">Selamat Datang, Aulia Arief</h3>
        <h6>Data Sekolah yang Sudah Terdaftar =></h6>
        <div class="card my-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h3 class="m-0 fw-bold">Daftar Internet Sekolah</h3>
                <div class="d-flex align-items-center">
                    <input type="text" class="form-control me-2" placeholder="Search" v-model="searchQuery"
                        style="width: 200px;" />
                    <div class="dropdown me-2">
                        <button class="btn btn-white" @click="toggleDropdown">
                            <font-awesome-icon :icon="['fas', 'filter']" />
                        </button>
                        <div class="dropdown-menu" :class="{ show: dropdownOpen }">
                            <li><a class="dropdown-item" href="#" @click="setFilter('')">Semua Status</a></li>
                            <li><a class="dropdown-item" href="#" @click="setFilter('Aktif')">Aktif</a></li>
                            <li><a class="dropdown-item" href="#" @click="setFilter('Non-Aktif')">Non-Aktif</a></li>
                        </div>
                    </div>
                    <button class="btn btn-success text-white" @click="openModalForAdd"
                        style="width: 130px;"><font-awesome-icon :icon="['fas', 'plus']" />Tambah
                    </button>
                </div>

            </div>
            <div class="card-body p-3 mb-5">
                <div class="table-responsive">
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
                                <td>{{ school.sekolah.nama_sekolah }}</td>
                                <td>{{ school.nomor_internet_sekolah }}</td>
                                <td>{{ school.status_internet_sekolah }}</td>
                                <td>
                                    <button class="btn btn-warning btn-sm me-2" @click="editSchool(school)">
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

        <Modalfix :isVisible="showModal" :title="isEdit ? 'Edit Sekolah' : 'Tambah Sekolah'" @close="closeModal"
            @save="saveSchool">
            <form @submit.prevent="saveSchool" ref="schoolForm">
                <div class="mb-4">
                    <label for="schoolName" class="form-label">Nama Sekolah <span class="text-danger">*</span></label>
                    <select id="schoolName" v-model="selectedSchool" class="form-select" required>
                        <option disabled value="">Pilih Sekolah</option>
                        <option v-for="school in schoolsList" :key="school.id" :value="school.nama_sekolah">
                            {{ school.nama_sekolah }}
                        </option>
                    </select>
                </div>
                <div v-for="(internet, index) in internetEntries" :key="index" class="row mb-3">
                    <div class="col-md-6">
                        <label v-if="index === 0" for="nomor_internet_sekolah" class="form-label">
                            Nomor Internet Sekolah<span class="text-danger">*</span>
                        </label>
                        <input type="text" v-model="internet.number" class="form-control" required />
                    </div>
                    <div class="col-md-6">
                        <label v-if="index === 0" class="form-label">
                            Status Internet Sekolah<span class="text-danger">*</span>:
                        </label>
                        <div class="d-flex align-items-center">
                            <div class="form-check me-5 mt-2">
                                <input type="radio" :id="'active-' + index" value="Aktif" v-model="internet.status"
                                    class="form-check-input" required />
                                <label :for="'active-' + index" class="form-check-label">Aktif</label>
                            </div>
                            <div class="form-check mt-2">
                                <input type="radio" :id="'inactive-' + index" value="Non-Aktif"
                                    v-model="internet.status" class="form-check-input" required />
                                <label :for="'inactive-' + index" class="form-check-label">Non-Aktif</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center mb-3">
                    <button type="button" class="btn btn-sub me-2" @click="addInternetEntry"
                        v-if="internetEntries.length < 5">
                        <font-awesome-icon :icon="['fas', 'plus']" />
                    </button>
                    <button type="button" class="btn btn-sub" @click="removeInternetEntry"
                        v-if="internetEntries.length > 1">
                        <font-awesome-icon :icon="['fas', 'minus']" />
                    </button>
                </div>
            </form>
        </Modalfix>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'home'
});

import axios from 'axios';
import { ref, computed, onMounted } from 'vue';

const searchQuery = ref('');
const filterStatus = ref('');
const dropdownOpen = ref(false);
const schools = ref([]);
const showModal = ref(false);
const schoolsList = ref([]);
const selectedSchool = ref('');
const internetEntries = ref([{ number: '', status: 'Aktif' }]);
const isEdit = ref(false);
const currentSchool = ref(null);

const filteredSchools = computed(() => {
    return schools.value.filter(school => {
        const matchesSearch = school.sekolah.nama_sekolah.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesFilter = filterStatus.value ? school.status_internet_sekolah === filterStatus.value : true;
        return matchesSearch && matchesFilter;
    });
});

const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
};

const setFilter = (status) => {
    filterStatus.value = status;
    dropdownOpen.value = false;
};

const openModalForAdd = () => {
    isEdit.value = false;
    selectedSchool.value = '';
    internetEntries.value = [{ number: '', status: 'Aktif' }];
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    resetForm();
};

const resetForm = () => {
    selectedSchool.value = '';
    internetEntries.value = [{ number: '', status: 'Aktif' }];
    isEdit.value = false;
    currentSchool.value = null;
};

const addInternetEntry = () => {
    if (internetEntries.value.length < 5) {
        internetEntries.value.push({ number: '', status: 'Aktif' });
    }
};

const removeInternetEntry = () => {
    if (internetEntries.value.length > 1) {
        internetEntries.value.pop();
    }
};


const saveSchool = async () => {
    const form = document.querySelector('form');
    if (form.checkValidity()) {
        try {
            const numbers = internetEntries.value.map(entry => entry.number);
            const uniqueNumbers = new Set(numbers);
            if (numbers.length !== uniqueNumbers.size) {
                alert('Nomor internet tidak boleh duplikat');
                return;
            };

            const token = localStorage.getItem('Authorization');
            const selectedSchoolId = schoolsList.value.find(school => school.nama_sekolah === selectedSchool.value)?.id;

            const payload = {
                id_sekolah: selectedSchoolId,
                internet_sekolah: internetEntries.value.map(entry => ({
                    nomor_internet_sekolah:  entry.number,
                    status_internet_sekolah: entry.status
                }))
            };

            if (isEdit.value) {
                const response = await axios.put(`http://127.0.0.1:8000/api/internet-sekolah/${currentSchool.value.id}`, payload, {
                    'headers': {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.data.status === 'success') {
                    alert(response.data.message);
                    fetchSchoolsData();
                    closeModal();
                } else {
                    alert('Gagal memperbarui data');
                }
            } else {
                const response = await axios.post('http://127.0.0.1:8000/api/internet-sekolah', payload, {
                    'headers': {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.data.status === 'success') {
                    alert(response.data.message);
                    fetchSchoolsData();
                    closeModal();
                } else {
                    alert('Gagal menambahkan data');
                }
            }
        } catch (error) {
            console.error('Error saving school data:', error);
            alert('Terjadi kesalahan saat menyimpan data');
        }
    } else {
        form.reportValidity();
    }
};

const editSchool = (school) => {
    selectedSchool.value = school.sekolah.nama_sekolah;
    internetEntries.value = [{
        number: school.nomor_internet_sekolah,
        status: school.status_internet_sekolah,
    }];
    isEdit.value = true;
    currentSchool.value = school;
    showModal.value = true;
};

const deleteSchool = async (id) => {
    try {
        const token = localStorage.getItem('Authorization');
        const response = await axios.delete(`http://127.0.0.1:8000/api/internet-sekolah/${id}`, {
            'headers': {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.data.status === 'success') {
            // Hapus data dari frontend setelah berhasil dihapus dari backend
            schools.value = schools.value.filter(school => school.id !== id);
            alert(response.data.message); // Tampilkan pesan sukses
        } else {
            alert('Gagal menghapus data');
        }
    } catch (error) {
        console.error('Error deleting school data:', error);
        alert('Terjadi kesalahan saat menghapus data');
    }
};


const fetchSchoolsData = async () => {
    try {
        const token = localStorage.getItem('Authorization');
        const responseInternet = await axios.get('http://127.0.0.1:8000/api/internet-sekolah', {
            'headers': {
                'Authorization': `Bearer ${token}`,
            },
        });
        const responseSchools = await axios.get('http://127.0.0.1:8000/api/sekolah', {
            'headers': {
                'Authorization': `Bearer ${token}`,
            },
        });

        schools.value = responseInternet.data.data;
        schoolsList.value = responseSchools.data.data[0];
    } catch (error) {
        console.error('Error fetching schools data:', error);
    }
};

onMounted(() => {
    fetchSchoolsData();
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
    padding: 2rem;
}

.card {
    margin-bottom: 2rem;
    border-radius: 10px;
}

.table-responsive {
    max-height: 300px;
    overflow-y: auto;
}

.table td,
.table th {
    max-width: 90px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

}
</style>
