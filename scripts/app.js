'use strict';

new Vue({
    el:'#app',
    data() {
        return {
            showSearchDrawer: false,
            searchTerm: '',
            schoolList: {},
        }
    },
    methods: {
        filter() {
            // this.searchTerm
            return '';
        }
    },
    computed: {
        filterList(){
            console.log( this.schoolList );
            return '';
        }
    },
    mounted() {
        $.getJSON('data/schools.json', function (data){
          this.schoolList = data;
        })
    }
})