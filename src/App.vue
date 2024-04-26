<script>
    import Header from "@/components/header.vue";
    export default {
        components: {
          Header,
        },
    };
</script>

<template>
    <!-- <AppHeader /> -->
    <div id="app">
        <Header />
        <div>
          <router-view />
        </div>
    </div>
</template>

<style>
    
</style>