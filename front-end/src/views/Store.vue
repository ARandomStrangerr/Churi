<script setup>
import Header from "../components/StoreHeader.vue";
import Footer from "../components/StoreFooter.vue";
import { RouterView } from "vue-router";
</script>

<template>
	<Header />
	<RouterView />
	<Footer />
</template>

<style scoped>
</style>
