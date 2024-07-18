<template>
	<div class="container">
		<div v-for="(item, index) of notifications" :key="index" :class="{'notification': true, 'green': item.color==='green', 'red': item.color==='red', 'yellow': item.color==='yellow'}">
			{{item.msg}}
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			notifications: []
		}
	} 
}
</script>

<style scoped>
.container {
	position: absolute;
	top:0px;
	right: 0px;
	z-index: 9;
}
.red {
	background-color: #fde2e4;
	border-color: #fad2e1;
}
.green {
	background-color: #e2ece9;
	border-color: #bee1e6;
}
.yellow {
	background-color: #fdf3d9;
	border-color: #fbecc1;
}
.notification {
	width: 20em;
	padding: 1em;
	border-width: 0px 0px 0px 4px;
	border-style: solid;
	margin-bottom: 0.5em;
}
</style>
