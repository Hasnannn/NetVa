<template>
    <div v-if="isVisible" class="modal-overlay">
        <div class="modal-content">
            <div class="modal-header my-2">
                <button class="back bg-white" @click="close" aria-label="Close"><font-awesome-icon :icon="['fas', 'chevron-left']" /></button>
                <h4 class="modal-title">{{ title }}</h4>
            </div>
            <hr>
            <div class="modal-body">
                <slot></slot>
            </div>
            <hr>
            <div class="modal-footer my-2">
                <button type="submit" class="btn btn-success text-white" @click="$emit('save')"><font-awesome-icon :icon="['fas', 'floppy-disk']" />  Simpan</button>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    isVisible: Boolean,
    title: String
});

const emit = defineEmits(['close', 'save']);

const close = () => {
    emit('close');
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background: white;
    padding: 1rem;
    border-radius: 10px;
    width: 800px;
    height: 700px;
}

.modal-header {
    display: flex;
    justify-content: start;
    align-items: center;
}

.modal-footer {
    justify-content: center;
}

.text-danger {
    color: red;
}

.back {
    margin-right: 15px;
    outline: none;
    border: none;
}
</style>
