 <?php

 
	$msg = 'Name: ' . $_POST['name'] . "\n" 
		. 'Email: ' . $_POST['email'] . "\n"
		. 'Comment: ' . $_POST['comment'];
		@mail('jimhooper86@gmail.com', 'JimHooper.me Email', $msg);
		 
	
 

?>
 
 
 