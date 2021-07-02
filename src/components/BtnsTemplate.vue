<template>
    <div>
        <span v-for="btn in templateArgs.btns" @click.stop="btn.clickHandler(templateArgs, $event)" v-show="btn.show" data-toggle="tooltip" class="pointer" :key="btn.id" :title="btn.tooltip">
            <i v-if="btn.icon" :class="btn.icon"></i>
            {{ btn.text ? btn.text : '' }}
        </span>
    </div>
</template>

<script>
    export default {
        name: 'BtnsTemplate',
        props: { 
            templateArgs: Object
        },
        mounted() {
            const container = $(this.$el);
            container.find('[data-toggle="tooltip"]').tooltip({container});
        },
        methods: {}
    };
</script>

<style>
</style>
