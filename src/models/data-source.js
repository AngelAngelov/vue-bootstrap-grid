import Vue from 'vue';
import axios from 'axios';
import Row from './row';

export default new Vue({
    data() {
        return {
            items: [],
            data: [],
            sortOrders: {},
            pageSize: 2,
            currentPage: 1,
            filters: [],
            sortKey: '',
            paging: false,
            currentItemsCount: 0,
            baseUrl: ''
        }
    },
    methods: {
        _filterData(data) {
            if (this.filters.length) {
                this.filters.forEach((filter) => {
                    data = data.filter(function (row) {
                        switch (filter.col.type) {
                            case 'number': {
                                const op1 = parseFloat(row.items[filter.col.prop]);
                                const op2 = parseFloat(filter.value);
                                let expression = op1 + filter.operator + op2;
                                return Boolean(eval(expression));
                            }
                            case 'date':
                                break;
                            case 'string':
                            case 'html':
                            default: {
                                const op1 = String(row.items[filter.col.prop]).toLowerCase();
                                const op2 = String(filter.value).toLowerCase();

                                if (filter.operator === '~') { //Contains
                                    return op1.indexOf(op2) > -1;
                                } else if (filter.operator === '/') { //Starts with
                                    return op1.indexOf(op2) === 0;
                                } else if (filter.operator === '==') { //Equal
                                    return op1 === op2;
                                }
                            }
                        }

                    });
                })
            }

            return data;
        },
        _sortData(data) {
            if (this.sortKey) {
                let order = this.sortOrders[this.sortKey] || 1;

                data = data.slice().sort((row1, row2) => {
                    row1 = row1.items[this.sortKey];
                    row2 = row2.items[this.sortKey];
                    return (row1 === row2 ? 0 : row1 > row2 ? 1 : -1) * order;
                });
            }

            return data;
        },
        _buildQueryString() {
            let url = '';

            if (this.sortKey) {
                let order = this.sortOrders[this.sortKey] || 1;
                url += `grid_sort=${this.sortKey}&grid_sort_order=${order}`;
            }

            if (this.filters.length) {
                let filterStr = '';
                this.filters.forEach((filter, index) => {
                    var str = `${filter.col.prop}_${filter.operator}_${filter.value}_${filter.col.type}`;
                    filterStr += `&grid_filter=${str}`;
                });

                url += filterStr;
            }

            if (this.paging) {
                url += `&grid_page=${this.currentPage}&grid_page_size=${this.pageSize}`
            }

            if (url.length && url[0] === '&') {
                url = url.substring(1);
            }

            return url;
        },
        _processLocalData() {
            const promise = new Promise((resolve, reject) => {
                try {
                    if (this.items.length) {
                        let data = [...this.items];

                        data = this._filterData(data);
                        data = this._sortData(data);
                        this.currentItemsCount = data.length;

                        if (this.paging) {
                            const startIndex = (this.currentPage - 1) * this.pageSize;
                            data = data.splice(startIndex, this.pageSize);
                        }

                        this.data = data;
                    }

                    resolve();
                } catch (error) {
                    reject(err)
                }
            });

            return promise;
        },
        _processRemoteData() {
            const queryString = this._buildQueryString();
            let url = this.baseUrl + '?' + queryString;
            window.history.pushState(null, null, location.href.split('?')[0] + '?' + queryString);
            return axios.get(url)
                .then(response => {
                    let rows = [];
                    this.currentItemsCount = response.data.totalItems;
                    response.data.items.forEach(item => rows.push(new Row(item)));
                    this.data = rows;
                })
                .catch(err => console.error(err));
        },
        processData() {
            if (this.baseUrl) {
                return this._processRemoteData();
            } else {
                return this._processLocalData();
            }
        },
        setData(items) {
            if (items && !this.baseUrl) {
                items.forEach((item, index) => {
                    this.items.push(new Row(item, { selected: false }));
                });
            }

            return this.processData();
        },
        sort(sortKey) {
            this.sortKey = sortKey;
            this.sortOrders[sortKey] = this.sortOrders[sortKey] * -1;
            this.currentPage = 1;
            return this.processData();
        },
        applyFilter(filter) {
            let currentIndex = this.filters.findIndex((fl) => {
                return fl.col.prop === filter.col.prop;
            });

            if (currentIndex != -1) {
                this.filters[currentIndex] = filter;
            } else {
                this.filters.push(filter);
            }

            this.currentPage = 1;
            return this.processData();
        },
        setPage(number) {
            this.currentPage = number;
            return this.processData();
        },
        removeFilter(col) {
            let promise = new Promise((resolve, reject) => {
                const index = this.filters.findIndex((item) => {
                    return item.col.prop === col.prop
                });

                if (index == -1) {
                    resolve();
                }

                this.currentPage = 1;
                this.filters.splice(index, 1);
                this.processData()
                    .then(() => resolve())
                    .catch((err) => reject(err));
            })

            return promise;
        }
    }
});