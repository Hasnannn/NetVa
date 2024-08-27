<template>
    <div>
        <header class="shadow-sm backg">
            <nav class="container-fluid p-4 d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center ms-5">
                    <h2 class="fs-1 nav-link text-white m-0 me-5">NetVa</h2>
                    <ul class="nav nav-pills">
                        <li class="nav-item">
                            <NuxtLink to="/beranda" class="nav-link text-secondary mx-1">Beranda</NuxtLink>
                        </li>
                        <li class="nav-item">
                            <NuxtLink to="/sekolah" class="nav-link text-secondary mx-1">Internet Sekolah</NuxtLink>
                        </li>
                        <li class="nav-item">
                            <NuxtLink to="/internet" class="nav-link text-secondary mx-1">Pengukuran Internet</NuxtLink>
                        </li>
                    </ul>
                </div>
                <div class="d-flex align-items-center me-4">
                    <span class="text-white me-3">{{ userName }}</span>
                    <img src="@/assets/images/profile.png" alt="Profile Picture" class="profile-picture me-2">
                    <ul class="nav">
                        <li class="nav-item">
                            <NuxtLink to="/login" class="nav-link mx-1 text-white"><font-awesome-icon :icon="['fas', 'right-from-bracket']" /></NuxtLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <div class="container-fluid p-5 pt-4">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userName: 'Aulia Arief'
        };
    }
}
</script>

<style scoped>
.router-link-exact-active {
    color: white !important;
    background-color: #242424;
    border-radius: 6px;
}

.backg {
    background-color: #181C32;
}

.profile-picture {
    width: 40px;
    height: 40px;
    border-radius: 30%;
    object-fit: cover;
    border: 2px solid white;
}
</style>
