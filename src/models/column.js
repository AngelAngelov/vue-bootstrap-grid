class Column {
    constructor(props) {
        this.prop = props.prop || this.defaults.prop;
        this.title = props.title || '';
        this.type = props.type || this.defaults.type;
        this.sortable = props.sortable || this.defaults.sortable;
        this.textAlign = props.textAlign || this.defaults.textAlign;
        this.filterable = props.filterable || this.defaults.filterable
    }

    defaults = {
        textAlign: 'center',
        sortable: false,
        type: 'text',
        filterable: false
    }
}

export default Column;