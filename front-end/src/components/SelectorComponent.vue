<script setup>
const props = defineProps({
	options: Array,
	defaultValue: String
})
</script>

<template>
<div class="selector" v-on:mouseover="onMouseOver" v-on:mouseleave="onMouseOut">
	<div class="selected-option" ref="currentOption">{{ defaultValue }}</div>
	<div class="option-list" ref="option-list">
		<div class="option" v-for="(option, index) in options" :key="index" v-on:click="onChange">{{ option }}</div>
	</div>
</div>
</template>

<script>
export default {
	methods: {
		onChange(event){
			if (event.target.innerText != this.$refs.currentOption.innerText) this.$emit("onChange", event.target.innerText);
		},
		onMouseOver(){
			let optionList = this.$refs['option-list'];
			optionList.style.maxHeight = "11em";
			optionList.style.borderWidth = "1px";
			optionList.style.zIndex = "2";
		},
		onMouseOut(){
			let optionList = this.$refs['option-list'];
			optionList.style.maxHeight = "0px";
			optionList.style.borderWidth = "0px";
			optionList.style.zIndex = "0";
		}
	}
}
</script>

<style scoped>
.selector {
	display: flex;
	flex-direction: column;
	position: relative;
}
.option-list {
	position: absolute;
	border-width: 0px;
	max-height: 0px;
	overflow: hidden;
	transition: max-height 0.1s ease-out;
	box-sizing: border-box;
	border-style: solid;
	border-color: #cdb4db;
	border-radius: 4px;
	background-color: white;
	display: flex;
	flex-direction: column;
	width: 100%;
}
.option {
	cursor: pointer;
	padding: 0.5em 0em 0.5em 0em;
}
.option:hover {
	background-color: #cdb4db;
	border-radius: 0px;
}
</style>
