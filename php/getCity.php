<?php
require_once 'connection.php';
if($_SERVER['REQUEST_METHOD'] == 'GET'){
	$id = $_GET['id'];
	$sql = "SELECT * FROM city WHERE state_id='$id'";

	$result = mysqli_query($con,$sql);

	if(mysqli_num_rows($result)>0){
		echo "<option disabled selected>Select City</option>";
		while ($c = mysqli_fetch_assoc($result)) {
			$id = $s['id'];
			$name = $c['city_name'];
			echo "<option value='".$id."'>$name</option>";
		}
	}
}

?>