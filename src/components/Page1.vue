/* eslint-disable */
<template>
	<div>
		<!-- <div class="col-md-12">
			<grid :items="gridData" :columns="gridCols" :paging="true" :pageSize="5" @rowClick="onRowClick"></grid>
		</div>-->
		<div class="col-md-12">
			<grid :useRemote="true" :baseUrl="url" :columns="grid2Cols" :paging="true" :pageSize="10" @rowClick="onRowClick" :items="gridData"></grid>
		</div>
	</div>
</template>

<script>
import grid from './grid';
export default {
	name: 'HelloWorld',
	components: {
		grid
	},
	props: {
		msg: String
	},
	data() {
		return {
			gridData: [
				{
					id: 1,
					date: '1998-09-04T00:00:00.000Z',
					company: 'Google',
					founders: 'Larry Page, Sergey Brin',
					website: "<a href='www.google.com'>www.google.com</a>"
				},
				{
					id: 2,
					date: '1976-04-01T00:00:00.000Z',
					company: 'Apple',
					founders: 'Steve Jobs, Steve Wozniak, Ronald Wayne',
					website: "<a href='www.aple.com'>www.aple.com</a>"
				},
				{
					id: 3,
					date: '1975-04-04T00:00:00.000Z',
					company: 'Microsoft',
					founders: 'Bill Gates, Paul Allen',
					website: "<a href='www.microsoft.com'>www.microsoft.com</a>"
				},
				{
					id: 4,
					date: '1994-07-05T00:00:00.000Z',
					company: 'Amazon',
					founders: 'Jeff Bezos',
					website: "<a href='www.amazon.com'>www.amazon.com</a>"
				},
				{
					id: 5,
					date: '2003-07-01T00:00:00.000Z',
					company: 'Tesla',
					founders:
						'Martin Eberhard, Marc Tarpenning, Elon Musk, J. B. Straubel, Ian Wright',
					website: "<a href='www.tesla.com'>www.tesla.com</a>"
				},
				{
					id: 6,
					date: '1975-01-01T00:00:00.000Z',
					company: 'Zara',
					founders: 'Amancio Ortega, Rosalía Mera',
					website: "<a href='www.zara.com'>www.zara.com</a>"
				},
				{
					id: 7,
					date: '1905-01-01T00:00:00.000Z',
					company: 'Nestle',
					founders: 'Henri Nestle',
					website: "<a href='www.nestle.com'>www.nestle.com</a>"
				},
				{
					id: 8,
					date: '1977-06-16T00:00:00.000Z',
					company: 'Oracle Corporation',
					founders: 'Larry Ellison, Bob Miner, Ed Oates',
					website: "<a href='www.oracle.com'>www.oracle.com</a>"
				},
				{
					id: 9,
					date: '1911-06-16T00:00:00.000Z',
					company: 'IBM',
					founders: 'Charles Ranlett Flint',
					website: "<a href='www.ibm.com'>www.ibm.com</a>"
				},
				{
					id: 10,
					date: '1886-01-01T00:00:00.000Z',
					company: 'Coca-Cola Company',
					founders: 'John Pemberton',
					website:
						"<a href='www.coca-colacompany.com'>www.coca-colacompany.com</a>"
				}
			],
			gridCols: [
				{
					prop: 'id',
					title: 'ID',
					type: 'number',
					sortable: true,
					textAlign: 'left',
					filterable: true
				},
				{
					prop: 'date',
					title: 'Date',
					type: 'date',
					sortable: true,
					textAlign: 'center',
					filterable: true
				},
				{
					prop: 'company',
					title: 'Company',
					type: 'string',
					sortable: true,
					filterable: true
				},
				{
					prop: 'founders',
					title: 'Founders',
					type: 'string',
					sortable: true,
					textAlign: 'left',
					filterable: true
				},
				{
					prop: 'website',
					title: 'Website',
					type: 'html',
					sortable: false,
					textAlign: 'right',
					filterable: true
				}
			],
			grid2Cols: [
				{
					prop: 'id',
					title: 'ID',
					type: 'number',
					sortable: true,
					textAlign: 'left',
					filterable: true
				},
				{
					prop: 'userId',
					title: 'User Id',
					type: 'number',
					sortable: true,
					textAlign: 'left',
					filterable: true
				},
				{
					prop: 'title',
					title: 'Title',
					type: 'string',
					sortable: true,
					filterable: true
				},
				{
					prop: 'body',
					title: 'Post',
					type: 'html',
					sortable: true,
					textAlign: 'left',
					filterable: true
				}
			],
			url: 'http://localhost:3000/posts'
		};
	},
	methods: {
		onRowClick(row) {
			console.log('row clicked', row);
		},
		onRowDblClick(row) {
			console.log('row dbl clicked', row);
		}
	}
};
</script>

<style scoped>
</style>
