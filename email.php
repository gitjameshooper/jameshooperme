 <?php
	$msg = 'Name: ' . $_POST['name'] . "\n" 
		. 'Email: ' . $_POST['email'] . "\n"
		. 'Comment: ' . $_POST['comment'];
		@mail('jamesthomashooper@gmail.com', 'James-Hooper.me Email', $msg);
?>
 
 
 