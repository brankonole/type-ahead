(function (){
	var cities = null,
		$cityList = $('.js-suggestions');

	$.ajax({
		url: 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json',
		type: 'GET',
		dataType: 'json',
		success: function (response) {
			cities = response;
		}
	});

	$('.js-city-state-input').on('keyup cut paste', function () {
		var $this = $(this),
			inputVal = $this.val();

		var filteredCities = cities.filter(function (item) {
			return item.city.toLowerCase().indexOf(inputVal) !== -1 || item.state.toLowerCase().indexOf(inputVal) !== -1;
		});

		createList(filteredCities, inputVal);
	});

	function createList (cities, v) {
		var items = '';

		cities.forEach(function (item) {
			var city = item.city,
				state = item.state,
				posC = city.toLowerCase().indexOf(v),
				posS = state.toLowerCase().indexOf(v),
				vLength = v.length;

			var ca = city.substring(0, posC),
				cb = city.substring(posC, posC + vLength),
				cc = city.substring(posC + vLength, city.length),
				c = posC !== -1 ? ca + '<span class="h">' + cb + '</span>' + cc : city;

			var sa = state.substring(0, posS),
				sb = state.substring(posS, posS + vLength),
				sc = state.substring(posS + vLength, state.length),
				s = posS !== -1 ? sa + '<span class="h">' + sb + '</span>' + sc : state;

			items += '<li class="city-state"><p>' + c + ', ' + s + '</p><p class="populations">' + parseInt(item.population).toLocaleString() + '</p></li>';
		});

		$cityList.html(items);
	}
}());