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
		.on("error", function(error) {

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

				if (Match.winner == 0) {
					$("#tableContent").append(`<tr><td><span class="teamA">${Match.teamA}</span></td><td>vs.</td><td><span class="teamB">${Match.teamB}</span></td><td><a href="${Match.matchLink}" class="btn btn-primary matchLinkForbet">Show Link</a></td><td><button class="btn btn-primary makeBetBtn" data-toggle="modal" data-target="#makeBet">Bet</button></td></tr>`);
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

	function placeBet(_matchLink, _team, _tokens)
	{
		$.notify("Placing bet.. This may take a while", {position: "top center", className: "info"});
		
		return Ezbet.methods.betOnTeam(userAccount, _matchLink, _team, _tokens)
		.send({from: userAccount})
		.on("receipt", function(receipt) {
			$.notify("Successfully placed Bet!", {position: "top center", className: "success"});
		})
		.on("error", function(error) {
			$.notify("Error placing bet", {position: "top center", className: "error"});
		});
	}

	$("#linkBets").click(function(event) {
		$(".mainContent").hide();
		$(".mainContent").load("table.html");
		getAllMatches()
		.then(displayAllMatches)
		.then($(".mainContent").fadeIn('slow'));
		
	});

	$("table").delegate(".btn", "click", function(){
	    var teamA = $(this).parent().siblings().find('.teamA').text();
	    var teamB = $(this).parent().siblings().find('.teamB').text();
	    var matchLink = $(this).parent().siblings().find('.matchLinkForbet').attr('href');


	    $("#makeBet span.matchLink").text(matchLink);
	    $("#makeBet span.teamA").text(teamA);
	    $("#makeBet span.teamB").text(teamB);

	});

	$("#betNow").click(function(event) {

		var matchLink = $(this).parent().siblings().find('.matchLink').text();
		var _tokens = $(this).parent().siblings().find("#tokensBetted").val();
		var _tokenAmount = $("#tokenCount").text();

		if (_tokens <= _tokenAmount) {
			if ($(this).parent().siblings().find('#betOnTeamA').is(':checked')) {
				placeBet(matchLink, 1, _tokens);			
			}
			else {
				placeBet(matchLink, 2, _tokens);
			}
		}

		
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

	//add
	function addMatch(teamA, _teamB, _matchLink)
	{
		$.notify("Adding match....", {position: "top center", className: "info"});
		return Ezbet.methods.addMatch(_matchLink, teamA, _teamB)
		.send({from: userAccount})
		.on("receipt", function(receipt) {
			$.notify("Successfully created match!", {position: "top center", className: "success"});
		})
		.on("error", function(error) {
			$.notify("Error creating match", {position: "top center", className: "error"});
		});
	}

	$("#btnCreateMatch").click(function(event) {
	  var teamA = $("#teamA").val();
      var teamB = $("#teamB").val();
      var matchLink = $("#matchLink").val();
      addMatch(teamA, teamB, matchLink);
	});

	function setWinner(_winner,_matchLink)
	{
		$.notify("Configuring winner....", {position: "top center", className: "info"});
		return Ezbet.methods.betConclude(_matchLink, _winner)
		.send({from: userAccount})
		.on("receipt", function(receipt) {
			$.notify("Configured winner", {position: "top center", className: "success"});
		})
		.on("error", function(error) {
			$.notify("Error configuring winner", {position: "top center", className: "error"});
		});
	}

	$("#btnSetWin").click(function(event) {
	  var winner = $("#winner").val();
      var matchLink = $("#matchLinkWin").val();
      setWinner(winner, matchLink);
	});

});