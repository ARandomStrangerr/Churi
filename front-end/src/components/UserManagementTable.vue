<script setup>
import EditIcon from "./icons/Edit.vue"
import TrashBinIcon from "./icons/TrashBin.vue"
import {defineProps} from "vue";

const props = defineProps({
	columnName: Array,
	columnKey: Array,
	tableData: Array
});
</script>

<template>
	<table>
		<thead>
			<tr>
				<th v-for="(name, index) of columnName" :key="index">
					{{name}}
					<div class="resizer" v-if="index < columnName.length - 1" v-on:mousedown="startResize($event, index)"/>
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(row, index) of tableData" :key="index">
				<td v-for="(key) in columnKey" :key="key">{{row[key]}}</td>
				<td>
					<div class="button yellow" v-on:click="onEdit(index)"><EditIcon /></div>
					<div class="button red" v-on:click="onDelete(index)"><TrashBinIcon /></div>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
export default {
	methods: {
		onEdit(index) {
			this.$emit("onEdit", index);	
		},
		onDelete(index) {
			this.$emit("onDelete", index);
		},
		startResize (e, columnIndex) {
			const parent = e.target.offsetParent;
		  const startMousePositionHorizontalAxis = e.clientX;
		  const columnStarWidth = parseInt(window.getComputedStyle(parent).width, 10);
		  const onMouseMove = (e) => {
		    const newWidth = columnStarWidth + (e.clientX - startMousePositionHorizontalAxis);
		    parent.style.width = `${newWidth}px`;
		  };

		  const onMouseUp = () => {
		    document.removeEventListener('mousemove', onMouseMove);
		    document.removeEventListener('mouseup', onMouseUp);
		  };

		  document.addEventListener('mousemove', onMouseMove);
		  document.addEventListener('mouseup', onMouseUp);
		}
	}
}

</script>
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
th{
	position: relative;
}
th:last-child {
	width: 90px;
}
.resizer {
  position: absolute;
  right: 0;
  top: 0;
  width: 1px;
  height: 80%;
  cursor: col-resize;
  background: rgba(0, 0, 0, 0.1);
}
</style>
