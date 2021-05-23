<?php
require_once 'connection.php';

$sql = "SELECT * FROM countries";

$result = mysqli_query($con,$sql);

if(mysqli_num_rows($result)>0){
	echo "<option disabled selected>Select Country</option>";
	while ($c = mysqli_fetch_assoc($result)) {
		$id = $c['id'];
		$cname = $c['country_name'];
		echo "<option value='".$id."'>$cname</option>";
	}
}
?>