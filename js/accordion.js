const timing = 400;

// Used to determine which sections are visible
function swapClasses (target, remove, add) {
	target.removeClass(remove);
	target.addClass(add);
};

// Slide up sub rows first and then package-headers
function hideChildren(rows, target) {
	for ( let i = 0; i < rows.length; i ++) {
		var row = $(rows[i]);
		if (!(row.hasClass('package-header'))) {
			row.slideUp(timing);
		}
	}
	for ( let i = 0; i < rows.length; i ++) {
		var row = $(rows[i]);
		if (row.hasClass('package-header')) {
			row.delay(timing).slideUp(timing);
		}
	}
	swapClasses(target, 'active', 'inactive');
};
/* Slide up all rows at same time
function hideChildren(rows, target) {
	for ( let i = 0; i < rows.length; i ++) {
		var row = $(rows[i]);
		row.slideUp();
	}
	swapClasses(target, 'active', 'inactive');
};
*/

// Slide down package-headers first and then sub rows
function revealChildren (rows, target) {
	for ( let i = 0; i < rows.length; i ++) {
		var row = $(rows[i]);
		if (row.hasClass('package-header')) {
			row.slideDown(timing);
		}
	}
	for ( let i = 0; i < rows.length; i ++) {
		var row = $(rows[i]);
		if (!(row.hasClass('package-header'))) {
			row.delay(timing).slideDown(timing);
		}
	}
	swapClasses(target, 'inactive', 'active');
};
/* Slide down all rows at same time
function revealChildren (rows, target) {
	for ( let i = 0; i < rows.length; i ++) {
		var row = $(rows[i]);
		row.slideDown('slow');
	}
	swapClasses(target, 'inactive', 'active');
};
*/

function checkAll () {
	const packages = $(".package-table");
	for (let i = 0; i < packages.length; i++) {
		var package = $(packages[i]);
		if (package.hasClass('inactive') || package.hasClass('active')) {
			continue;
		} else {
			hideChildren(package.find('.table-row'), package);
		}
	}
};

function hideAll () {
	const packages = $(".package-table");
	for (let i = 0; i < packages.length; i++) {
		var package = $(packages[i]);
		if (package.hasClass('inactive')) {
			continue;
		} else {
			hideChildren(package.find('.table-row'), package);
		}
	}
};

function resetClasses () {
	const packages = $('.package-table');
	for (let i = 0; i < packages.length; i++) {
		package = $(packages[i]);
		hideChildren(package.find('.table-row'), package);
	}
};

function checkWindow () {
	if ( $(window).width() <= 860) {
		checkAll();
	} else {
		resetClasses();
	}
};

$(document).ready( function() {
	checkWindow();
});

$(window).resize( function() {
	checkWindow();
});

var e = jQuery.Event("click");
$('div.package-row').click( function() {
	const targ = $(this);
	var table = targ.next();
	if (table.hasClass("inactive")) {
		hideAll();
		revealChildren(table.find('.table-row'), table);
	} else if (table.hasClass("active")) {
		hideChildren(table.find('.table-row'), table);
	}
});



