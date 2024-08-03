<script setup>
import EditIcon from "./icons/Edit.vue"
import TrashBinIcon from "./icons/TrashBin.vue"
import {defineProps} from "vue";
import {RouterLink} from "vue-router"

const props = defineProps({
	columnName: Array,
	columnKey: Array,
	tableData: Array
});
</script>

<template>
	<table>
		<tbody>
			<tr>
				<th v-for="(name, index) of columnName" :key="index">{{name}}</th>
			</tr>
			<tr v-for="(row, index) of tableData" :key="index">
				<td v-for="(key) in columnKey" :key="key">{{row[key]}}</td>
				<td>
					<RouterLink :to="row['editURL']"><div class="button yellow"><EditIcon /></div></RouterLink>
					<RouterLink :to="row['deleteURL']"><div class="button red"><TrashBinIcon /></div></RouterLink>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<style scoped>
.button {
	display: inline-flex;
	width: 2em;
	height: 2em;
	border-radius: 4px;
	margin-right: 1em;
}
.button:last-child {
	margin-right: 0px;
}
</style>
