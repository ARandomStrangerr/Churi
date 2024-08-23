<script setup>
</script>

<template>
<div><h1>Calendar</h1></div>
<div class="calendar">
	<div class="calendar-row" v-for="(row, rowIndex) of dates" :key="rowIndex">
		<div class="calendar-cell" v-for="(cell, cellIndex) of row" :key="cellIndex">{{ cell }}</div>
	</div>
</div>
</template>

<script>
export default {
	data() {
		return {
			dates: []
		}
	},
	methods: {
		createDateArray(year, month) {
			let firstDateThisMonth = new Date(year, month, 1);
			let lastDateLastMonth = new Date(year, month, 0);
			let row = [];
			for (let offset = firstDateThisMonth.getDay() - 1; offset > - 1; offset--) row.push(lastDateLastMonth.getDate() - offset);
			
			let lastDateThisMonth = new Date(year, month + 1, 0);
			for (let index = 1; index <= lastDateLastMonth.getDate(); index++) {
				row.push (index);
				if (row.length === 7) {
					this.dates.push(row);
					row = [];
				}
			}

			for (let index = 1; index < 6 - lastDateThisMonth.getDay(); index++) row.push(index);
			if (row.length != 0) this.dates.push(row);
		}
	},
	mounted() {
		this.createDateArray(2024, 7);
	}
}
</script>

<style scoped>
.calendar {
	display: flex;
	flex-direction: column;
	border-style: solid;
	border-width: 1px;
	border-color: #e9ecef;
	flex-grow: 1;
}
.calendar-row {
	display: flex;
	flex-direction: row;
	flex-grow: 1;
	border-style: solid;
	border-width: 0px 0px 1px 0px;
	border-color: #e9ecef;
}
.calendar-row:last-child {
	border-width: 0px;
}
.calendar-cell {
	width: calc(100% / 7);
	flex-grow: 1;
	border-style: solid;
	border-width: 0px 1px 0px 0px;
	border-color: #e9ecef;
}
.calendar-cell:last-child {
	border-width: 0px;
}
</style>
