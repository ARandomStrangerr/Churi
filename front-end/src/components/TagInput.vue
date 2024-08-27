<script setup>
import CrossIcon from "./icons/Cross.vue";
</script>

<template>
<div class="tag-input">
	<div class="tag-and-input">
		<div class="tag" v-for="(tag, tagIndex) of tags" :key="tagIndex">
			{{ tag }}
			<div><CrossIcon class="remove-tag-button"/></div>
		</div>
		<div class="suggestion-input">
			<input type="text" @change="createTag($event)">
			<div class="suggestion-list">
				<div>No suggestions</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	props: {
		suggestList: {
			type: Array,
			requied: true
		}
	},
	data() {
		return {
			tags: []
		}
	},
	methods: {
		createTag(event){
			this.tags.push(event.target.value);
			event.target.value = "";
		}
	}
}
</script>

<style scoped>
.tag-input {
	display: flex;
	flex-direction: column;
	position: relative;
	padding: 0.5em;
	border-radius: 4px;
	border-width: 1px;
	border-style: solid;
	border-color: #f4f4f9;
}
.tag-and-input {
	display: flex;
	flex-direction: row;
}
.tag {
	border-radius: 4px;
	padding: 0px 4px 0px 4px;
	background-color: #bde0fe;
	margin-right: 1em;
	display: flex;
	flex-direction: row;
}
.remove-tag-button {
	width: 1em;
	height: 1em;
	background-color: #ffafcc;
}
.suggest-input {

}
input {
	border: 0px;
	border-style: none;
}
</style>
