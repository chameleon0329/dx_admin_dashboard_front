<template>
    <header>
        <div class="headerMeunWrap">
            <div class="selectBox">

            </div>
        </div>
    </header>
</template>

<script>
    import SelectBox from './SelectBox.vue';

    export default {
        name: 'Header',
        components: {
            SelectBox,
        }
    }
</script>

<style>
.headerMeunWrap {
    height: 10px;
    position: fixed;
}
</style>


