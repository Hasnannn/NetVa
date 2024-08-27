<template>
    <div class="container-fluid">
        <div class="row vh-100">
            <div class="col-12 d-flex align-items-start justify-content-center flex-column bg-primary text-black welcome-section"
                style="height: 34%">
                <div class="welcome-text">
                    <h1>
                        Selamat datang di <br />
                        NetVa
                    </h1>
                </div>
            </div>
            <div class="d-flex align-items-start justify-content-start" style="height: 50%">
                <div class="login-form w-50 p-4">
                    <h2 class="mb-4">Silahkan Login</h2>
                    <form @submit.prevent="Login">
                        <div class="mb-3 border-bottom border-secondary">
                            <input type="text" class="form-control masuk" id="username-input" placeholder="Masukan Username"
                                v-model="username" />
                        </div>
                        <div class="mb-3 border-bottom border-secondary">
                            <input :type="passwordFieldType" class="form-control masuk" id="password-input"
                                placeholder="Masukan Password" v-model="password" />
                        </div>
                        <div class="form-check mb-4">
                            <input class="form-check-input" type="checkbox" id="show-password" v-model="showPassword">
                            <label class="form-check-label" for="show-password">
                                Tampilkan Password
                            </label>
                        </div>
                        <button type="submit" class="btn btn-login text-white" style="width: 100%">
                            <font-awesome-icon :icon="['fas', 'right-to-bracket']" /> Masuk
                        </button>
                        <div v-if="errorMessage" class="alert alert-danger mt-3">
                            {{ errorMessage }}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            username: "",
            password: "",
            showPassword: false,
            errorMessage: "",
        };
    },
    computed: {
        passwordFieldType() {
            return this.showPassword ? 'text' : 'password';
        }
    },
    methods: {
        async Login() {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/login', {
                    username: this.username,
                    password: this.password,
                });
                
                if (response.data.token) {
                    this.$router.push("/beranda");
                } else {
                    this.errorMessage = "Username atau Password salah";
                }
            } catch (error) {
                this.errorMessage = "Terjadi kesalahan saat login. Silakan coba lagi.";
            }
        },
    },
};
</script>

<style lang="scss">
.container-fluid {
    position: relative;
    width: 100%;
    padding-left: 0;
    margin-left: 0;
}

.bg-primary {
    background-color: #d9d9d9 !important;
}

.welcome-text {
    margin-left: 125px;
    font-family: sans-serif;
    position: relative;
    z-index: 1;
    color: white;
}

.welcome-section {
    position: relative;
    overflow: hidden;
}

.welcome-section::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("@/assets/images/image1.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(15px);
    z-index: 0;
}

.login-form {
    max-width: 400px;
    outline: 0px;
    margin-left: 125px;
}

.masuk {
    border: none;
    outline: none;
}
</style>
