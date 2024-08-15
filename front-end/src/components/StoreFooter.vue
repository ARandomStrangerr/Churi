<script setup>
import FacebookIcon from "./icons/Facebook.vue";
import InstagramIcon from "./icons/Instagram.vue";
import PinterestIcon from "./icons/Pinterest.vue";
import MapIcon from "./icons/Map.vue";
</script>

<template>
<footer class="regular-main-page-width">
	<div>
		<img src="../assets/logo-1.png">
	</div>
	<div>
		<h2>Churi</h2>
		<div>About Us</div>
		<div>Contact Us</div>
	</div>
	<div>
		<h2>Help</h2>
		<div>Return Policy</div>
		<div>Shipping Policy</div>
		<div>FAQs</div>
	</div>
	<div>
		<h2>Connect</h2>
		<div><a href="https://www.facebook.com/ChuribyLz"><FacebookIcon />Facebook</a></div>
		<div><a href="https://www.instagram.com/churi.ca/"><InstagramIcon />Instagram</a></div>
		<div><a href="https://ca.pinterest.com/churonmi/"><PinterestIcon />Pinterest</a></div>
		<div><a href="https://maps.app.goo.gl/w6juwyojQM6z3QaF8"><MapIcon />Physical Store</a></div>
	</div>
</footer>
</template>

<style scoped>
h2 {
	margin-bottom: 1em;
}
footer {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}
svg {
	margin-right: 1em;
}
</style>
