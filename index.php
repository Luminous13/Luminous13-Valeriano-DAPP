<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>EZ Bet - Dota 2</title>
	<link rel="icon" href="https://ipfs.io/ipfs/QmaV4YhHfRtK6HHddFE21YJRjZmnvmMtw9q16PZgd8ecJr">
	<link rel="stylesheet" href="./css/bootstrap.min.css">
	<link rel="stylesheet" href="./css/main.css">
	<script src="./js/jquery-3.3.1.min.js" type="text/javascript"></script>
	<script src="./js/popper.min.js" type="text/javascript"></script>
	<script src="./js/bootstrap.min.js" type="text/javascript"></script>
	<script src="./js/notify.min.js" type="text/javascript"></script>
	<script src="./js/index.js" type="text/javascript"></script>
	<script src="./js/web3.min.js" type="text/javascript"></script>
	<script src="./js/contract.js" type="text/javascript"></script>
	<script src="./js/abi.js" type="text/javascript"></script>
	<script src="./js/bets.js" type="text/javascript"></script>
</head>
<body>
	<div id="navHolder">
		
		<?php include 'header.html'; ?>

	</div>
	
	<div class="container bg-dark">
		
		<div class="mainContent">
			<?php include 'home.html'; ?>
		</div>
		

	</div>

	<!-- MODAL -->
	<div class="modal fade" id="buyToken">
	
		<div class="modal-dialog">
			
			<div class="modal-content">

				<div class="modal-header">
					<h4 class="font-weight-bold text-center">Buy Tokens!</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>
				
				<div class="modal-body mx-auto">
					
					<button class="btn buyingToken">
						<h5 class="font-weight-bold" id="price1"></h5>
						<img src="https://ipfs.io/ipfs/QmYn7vre7x352AiiFAhLbwu1SjJDhvgrHdHfc9cQ7Ajxwa" alt="Token">
						<h2 class="middle font-weight-bold">BUY!</h2>
						<h3 class="font-weight-bold">5 Tokens!</h3>
					</button>

					<button class="btn buyingToken">
						<h5 class="font-weight-bold" id="price2"></h5>
						<img id="three" src="https://ipfs.io/ipfs/QmSt7S75fEh4DYSWEPG8GA1xL5Abjq96z4tZuRd3NhpML1" alt="Token">
						<h2 class="middle font-weight-bold" id="secondBuy">BUY!</h2>
						<h3 class="font-weight-bold">20 Tokens!</h3>
					</button>

					<button class="btn buyingToken">
						<h5 class="font-weight-bold" id="price3"></h5>
						<img src="https://ipfs.io/ipfs/QmY8cQdu4wne4yQdjE3drbeozNxEwJTySfzbPCKvPq1naG" alt="Token">
						<h2 class="middle font-weight-bold" id="thirdBuy">BUY!</h2>
						<h3 class="font-weight-bold">50 Tokens!</h3>
					</button>

				</div>
				
				<div class="modal-footer mx-auto">
					<h6 class="">You can also Donate Eth to: <strong>0x4b46cacf94ea1eb93cd7eaac5ef4ce5f354a63cd</strong></h6>
				</div>

			</div>
		</div>

	</div>

	<div id="footerholder">
		
		<?php include 'footer.html'; ?>

	</div>
</body>
</html>