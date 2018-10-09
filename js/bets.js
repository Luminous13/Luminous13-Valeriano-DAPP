$(document).ready(function($) {
	
	$("#linkMyBets").click(function(event) {
		$(".mainContent").hide();
		$(".mainContent").load("myBets.html");
		$(".mainContent").fadeIn('slow');
	});

	$(".makeBet").click(function(event) {
		
	});

});