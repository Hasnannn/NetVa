<template>
    <div class="container-fluid">
        <div class="row vh-100">
            <div class="col-12 d-flex align-items-start justify-content-center flex-column bg-primary text-black"
                style="height: 34%;">
                <div class="welcome-text">
                    <h1>Selamat datang di <br> NetVa</h1>
                </div>
            </div>
            <div class="col d-flex align-items-start justify-content-start" style="height: 50%;">
                <div class="login-form w-50 p-4">
                    <h2 class="mb-4">Silahkan Login</h2>
                    <form @submit.prevent="Login">
                        <div class="mb-3 border-bottom border-secondary">
                            <input type="text" class="form-control" id="nip-input" placeholder="Masukan NIP"
                                v-model="nip" />
                        </div>
                        <div class="mb-4 border-bottom border-secondary">
                            <input type="password" class="form-control" id="password-input"
                                placeholder="Masukan Password" v-model="password" />
                        </div>
                        <button type="submit" class="btn btn-login text-white" style="width: 100%;"><font-awesome-icon :icon="['fas', 'right-to-bracket']" />  Masuk</button>
                        <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            nip: '',
            password: '',
            errorMessage: ''
        }
    },
    methods: {
        Login() {
            const validNip = '123';
            const validPass = '123';

            if (this.nip == validNip && this.password == validPass) {
                this.$router.push('/beranda');
            }else {
                this.errorMessage = 'NIP atau Password salah'
            }
        }
    }
}
</script>

<style lang="scss">
.container-fluid {
    position: relative;
    width: 100%;
    padding-left: 0;
    margin-left: 0;
}

.bg-primary {
    background-color: #D9D9D9 !important;
}

.text-white {
    color: #EEEDEB !important;
}

.welcome-text {
    margin-left: 125px;
    font-family: sans-serif;
}

.login-form {
    max-width: 400px;
    outline: 0px;
    margin-left: 125px;
}

.form-control {
    border:none;
    outline: none;
}
</style>