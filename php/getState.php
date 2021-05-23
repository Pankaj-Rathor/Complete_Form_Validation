<?php
require_once 'connection.php';
if($_SERVER['REQUEST_METHOD'] == 'GET'){
	$cid = $_GET['cid'];
	$sql = "SELECT * FROM state WHERE country_id='$cid'";

	$result = mysqli_query($con,$sql);

	if(mysqli_num_rows($result)>0){
		echo "<option disabled selected>Select State</option>";
		while ($s = mysqli_fetch_assoc($result)) {
			$id = $s['id'];
			$sname = $s['state_name'];
			echo "<option value='".$id."'>$sname</option>";
		}
	}
}

?>