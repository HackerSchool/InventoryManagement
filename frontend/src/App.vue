<template>
    <div id="app">
        <HeaderBar> </HeaderBar>

        <router-view> </router-view>
    </div>
</template>

<script>
    import HeaderBar from './components/HeaderAndFooter/HeaderBar.vue'
    export default {
        name: "App",

        components: {
            HeaderBar,
        },
    }
</script>