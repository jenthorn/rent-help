var hood = {};

hood.d = new Date();
hood.year = hood.d.getFullYear();

hood.collectInfo = function(){
	$('form').on('submit', function(e){
		e.preventDefault();
		var location = $('#location').val();
		if (location.indexOf(' ') >= 0) {
			location = location.replace(/\s/g, '+');
		}
		var price = $('#price').val();
		var beds = $('#beds').val();
		hood.getInfo(location, price, beds);
		$('.loading').addClass('show');
	});
};

hood.getInfo = function(itemOne, itemTwo, itemThree){

	$.ajax({
		url: 'http://45.55.140.101/api?location=' + itemOne + '&price=' + itemTwo +'&rooms=' +  itemThree,
		method: 'GET',
		dataType: 'jsonp',
		timeout: 5000,
		success: function(response){
			$('.found').empty();
			hood.displayInfo(response);
		},
		error: function(x, t, m) {
			if(t === "timeout") {
				console.log('Scraper Timeout. Click Again');
			} else {
				alert(t);
			}
		}
	});

};

hood.displayInfo = function(result){

	

	$.each(result, function(i, item){
		if (item.title.indexOf('basement') > 0 || item.title.indexOf('bsmt') > 0 || item.title.indexOf('Bsmt') > 0 || item.title.indexOf('BSMT') > 0 || item.title.indexOf('Basement') > 0 || item.title.indexOf('Lower level') > 0 || item.title.indexOf('lower level') > 0 || item.title.indexOf('Wanted') > 0 || item.title.indexOf('WANTED') > 0 || item.title.indexOf('wanted') > 0 ) {
			console.log('fuck that');
		} else {
			var pic = $('<img>').attr('src', item.pic);
			var title = $('<h2>').text(item.title);
			var price = $('<h3>').addClass('price').text(item.price);
			var now = moment(item.posted).year(hood.year).format("MMM Do, YYYY");
			var display = moment(item.posted).format("MMDD");
			var hiddenDate =$('<time>').addClass('hideDate').text(display);
			var posted =$('<time>').addClass('date').text('Date Posted: ' + now);
			var article = $('<article>').addClass('result').append(pic, title, price, posted, hiddenDate);
			var link = $('<a>').addClass('resultLink').attr({href: item.link,target: '_blank'}).html(article);
			$('.found').append(link);
		}
	});

	$('.loading').removeClass('show');

	// Animate the body
	$('html, body').animate({
		scrollTop: $('#results').offset().top - 45
	}, 750);
	var $container = $('.found');

	$container.imagesLoaded(function() {
		$container.isotope({
			itemSelector: '.result',
			layoutMode: 'packery',
			packery: { gutter: 10 },
			getSortData: { date: '.hideDate' },
			sortBy: 'date',
			sortAscending: false
		});
	});

	
};


$(function(){
	console.log('loaded');
	hood.collectInfo();

	$("#price").ionRangeSlider({
	  hide_min_max: true,
	  keyboard: true,
	  min: 1000,
	  max: 3000,
	  from: 1000,
	  to: 4000,
	  type: 'single',
	  step: 1,
	  prefix: "$",
	  grid: true
	});
});

