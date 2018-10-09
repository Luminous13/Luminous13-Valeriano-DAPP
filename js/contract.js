$(document).ready(function($) {
	
	var Ezbet; 
	var userAccount;

	function startApp() {

		Ezbet = new web3js.eth.Contract(ABI, Ezbet_Address);
		var account;

		var accountInterval = setInterval(function() {

	        web3.eth.getAccounts((err, res) => {                   	        
	        	account = res[0];
	        });
	         
	         // Check if account has changed
        	if (account !== userAccount) {

	        	userAccount = account;

	        	getTokens().then(displayTokens);

	        }

		}, 100);

		getAllMatches().then(displayAllMatches);
		getTokenPrice().then(setTokenPrice);
		

	}

	$(".buyingToken").click(function() {
		var numTokens = $(this).find('h3').text().replace(" Tokens!", "");
		var price = $(this).find('h5').text().replace(" ether", "");
		price = price * 10**18;
		
		purchaseTokens(price, numTokens);
	});


	function purchaseTokens(price, numTokens) {
		$.notify("Please wait while your transaction is being processed...", {position: 'top center', className: "info"});

		return Ezbet.methods.buyTokens(numTokens)
		.send({from: userAccount, value: price})
		.on("receipt", function(receipt) {

		    $.notify("Tokens successfully bought!", {position: "top center", className: "success"});

		    getTokens().then(displayTokens);
		        
		})
		.on("error", function(receipt) {

		    $.notify("Tokens unsuccessfully bought!", {position: "top center", className: "error"});
		        
		})
	}

	function getTokens() {
		return Ezbet.methods.getTokens(userAccount).call();
	}

	function displayTokens(count) {
		$("#tokenCount").text(count);
	}

	function displayAllMatches(ids) {
		for (id of ids) {
			getMatchDetails(id)
			.then(function(Match) {

				if (Match.winner) {
					$("#tableContent").append(`<tr><td>${Match.teamA}</td><td>vs.</td><td>${Match.teamB}</td><td><a href="${Match.matchLink}" class="btn btn-primary">Show Link</a></td><td><button class="btn btn-primary makeBet">Bet</button></td></tr>`);
				}
			});
		}
	}

	function setTokenPrice(price) {

		var ether = price / 10**18;
		$("#price1").text(ether + " ether");
		$("#price2").text((ether * 3.5).toFixed(4) + " ether");
		$("#price3").text((ether * 9).toFixed(4) + " ether");
	}

	function getMatchDetails(id) {
		return Ezbet.methods.matches(id).call();
	}

	function getAllMatches() {
		return Ezbet.methods.getAllMatches().call();
	}

	function getTokenPrice() {
		return Ezbet.methods.getTokenPrice().call();
	}

	$("#linkBets").click(function(event) {
		$(".mainContent").hide();
		$(".mainContent").load("table.html");
		getAllMatches()
		.then(displayAllMatches)
		.then($(".mainContent").fadeIn('slow'));
		
	});

	window.addEventListener('load', function() {

	    if (typeof web3 !== 'undefined') {
	    	$.notify("You have Metamask!", {position: "top center",
	    		className: "info"});
	    	web3js = new Web3(web3.currentProvider);
	    } else {

	      	$.notify("You need to Install Metamask!", {position: "top center",
	    		className: "error"});
	    }

	    startApp()
	})


});