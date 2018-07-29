class Column {
    constructor(props) {
        this.prop = props.prop || this.defaults.prop;
        this.title = props.title || '';
        this.type = props.type || this.defaults.type;
        this.sortable = props.sortable || this.defaults.sortable;
        this.filterable = props.filterable || this.defaults.filterable;
        this.textAlign = props.textAlign || this.defaults.textAlign;
    }

    defaults = {
        textAlign: 'center',
        sortable: false,
        filterable: false,
        type: 'text',
        dateFormat: 'DD.MM.YYYY',
        dateTimeFormat: 'DD.MM.YYYY HH:mm',
        timeFormat: 'HH:mm',
        cellClass: '',
        titleClass: ''
    }
}

export default Column;