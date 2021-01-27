'use strict';

new Vue({
	el: '#app',

	data() {
		return {
			showSearchDrawer: false,
			showFilterForm: false,
			searchTerm: '',
			filters: {},
			schoolList: {},
		}
	},

	watch: {
		searchTerm() {
			this.filterSchoolList();
		}
	},

	methods: {

		filterSchoolList() {
			$('.school').hide();

			this.schoolList.forEach( function(school) {
				if( school.properties.Name.toLowerCase().includes( this.searchTerm.toLowerCase() ) ){
					$('.school#'+school.properties.ID).show();
				}
			}.bind(this))
		},

		clearFilterList() {
			this.searchTerm = ""
			this.filterList = {}
		},

		closeSearchBox() {
			this.showSearchDrawer = false;
			window.map.flyTo({
				center: [-80.3, 25.7],
				zoom: 10
			});
		},

		showSchoolDetails(school) {
			$('.school-details').hide();
			$('.school-details#school_' + school.properties.ID).show();
			console.log("test")
			window.map.flyTo({
				center: school.geometry.coordinates,
				zoom: 15
			});
		},

		getSchoolDetails( school ) {
			let details = school.properties;
			return {
				Neighborhood: details.Neighborhood,
				"Total Students": details["Total Students"],
				"Percentage of Minority": (details["Percentage of Minority"] * 100).toFixed(2) + "%",
				"Level": details["Level"],
				"Score": details["Score"].toFixed(3),
				"Category": details["Category"]
			}
		},

		getSchoolEthinicity( school ) {
			let details = school.properties,

					black_percentage = details["Black (%)"] * 100,
					white_percentage = details["White (%)"] * 100,
					hispanic_percentage = details["Hispanic (%)"] * 100,
					other_percentage = 100 - black_percentage  - white_percentage - hispanic_percentage,
					
					black = details["# Black"],
					white = details["# White"],
					hispanic = details["# Hispanic"],
					other = details["Total Students"] - black  - white - hispanic;

			return {
				'Black': { percentage: Math.round(black_percentage), count: black },
				'White': { percentage: Math.round(white_percentage), count: white },
				'Hispanic': { percentage: Math.round(hispanic_percentage), count: hispanic },
				'Other': { percentage: Math.round(other_percentage), count: other }
			}
		}
	},
	
	computed: {},

	mounted() {
		$.getJSON('schools.json', function (data) {
			this.schoolList = data;
		}.bind(this))
	}
})