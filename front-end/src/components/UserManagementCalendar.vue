<script setup>
import RightArrowIcon from "./icons/RightArrow.vue";
import LeftArrowIcon from "./icons/LeftArrow.vue";
</script>

<template>
<div class="banner">
	<h1>Calendar</h1>
	<div>
		<div><LeftArrowIcon /></div>
		<div>{{ getMonthName(today.getMonth() + 1, "long") }} {{ today.getFullYear() }}</div>
		<div><RightArrowIcon /></div>
	</div>
</div>
<div class="calendar">
	<div class="calendar-row">
		<div class="calendar-cell">Sun</div>
		<div class="calendar-cell">Mon</div>
		<div class="calendar-cell">Tue</div>
		<div class="calendar-cell">Wed</div>
		<div class="calendar-cell">Thu</div>
		<div class="calendar-cell">Fri</div>
		<div class="calendar-cell">Sat</div>
	</div>
	<div class="calendar-row" v-for="(row, rowIndex) of dates" :key="rowIndex">
		<div class="calendar-cell" v-for="(cell, cellIndex) of row" :key="cellIndex">
			<div :class="{'date': true, 'this-month': cell.style==='viewMonth', 'today': cell.style==='today'}">{{ cell.date }}</div>
		</div>
	</div>
</div>
</template>

<script>
export default {
	data() {
		return {
			dates: [],
			today: new Date()
		}
	},
	methods: {
		getMonthName(month, form) {
			if (form === "long"){
				switch (month) {
					case 1: return "January";
					case 2: return "Febuary";
					case 3: return "March";	
					case 4: return "April";
					case 5: return "May";
					case 6: return "June";
					case 7: return "July";
					case 8: return "August";
					case 9: return "September";
					case 10: return "October";
					case 11: return "November";
					case 12: return "December";
					default: return null;
				}
			} else if (form === "short") {
				switch (month) {
					case 1: return "Jan";
					case 2: return "Feb";
					case 3: return "Mar";	
					case 4: return "Apr";
					case 5: return "May";
					case 6: return "Jun";
					case 7: return "Jul";
					case 8: return "Aug";
					case 9: return "Sep";
					case 10: return "Oct";
					case 11: return "Nov";
					case 12: return "Dec";
					default: return null;
				}	
			} else return null;
		},
		createDateArray(year, month) {
			let firstDateThisMonth = new Date(year, month, 1);
			let lastDateLastMonth = new Date(year, month, 0);
			let row = [];
			for (let offset = firstDateThisMonth.getDay() - 1; offset > - 1; offset--) row.push({date: lastDateLastMonth.getDate() - offset});

			let lastDateThisMonth = new Date(year, month + 1, 0);
			for (let index = 1; index <= lastDateLastMonth.getDate(); index++) {
				let style = this.today.getYear() === firstDateThisMonth.getYear() && this.today.getMonth() === firstDateThisMonth.getMonth() && this.today.getDate() === index ? "today" : "viewMonth";
				row.push ({date: index, style: style});
				if (row.length === 7) {
					this.dates.push(row);
					row = [];
				}
			}

			for (let index = 1; index < 6 - lastDateThisMonth.getDay(); index++) row.push({date: index});
			if (row.length != 0) this.dates.push(row);
		}
	},
	mounted() {
		this.createDateArray(this.today.getFullYear(), this.today.getMonth());
	}
}
</script>

<style scoped>
.banner {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
.banner > div {
	display: flex;
	flex-direction: row;
	text-align: center;
}
.banner > div > div {
	padding-right: 1em;
}
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
.calendar-row:first-child {
	flex-grow: 0;
	padding-bottom: 0.5em
}
.calendar-row:last-child {
	border-width: 0px;
}
.calendar-cell {
	padding-top: 0.5em;
	display: flex;
	justify-content: center;
	width: calc(100% / 7);
	flex-grow: 1;
	border-style: solid;
	border-width: 0px 1px 0px 0px;
	border-color: #e9ecef;
}
.calendar-cell:last-child {
	border-width: 0px;
}
.date {
	border-radius: 50%;
	background-color: #dee2e6;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	width: 1.5em;
	height: 1.5em;
}
.date.this-month {
	background-color: #bde0fe;
}
.date.today {
	background-color: #cdb4db;
}
</style>
