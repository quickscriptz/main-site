<?php
require_once("config.php");
require_once("lib/recaptcha.php");

if($_GET['validate']){
	$resp = recaptcha_check_answer ($privatekey,
         $_SERVER["REMOTE_ADDR"],
         $_GET["recaptcha_challenge_field"],
         $_GET["recaptcha_response_field"]);
 
	if (!$resp->is_valid) {
    	die("fail");
	}else{
    	die("success");
	}
}elseif($_POST){
	
	//check if its an ajax request, exit if not
	if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
    	$output = json_encode(array('type'=>'error', 'text' => 'Request must come from AJAX'));die($output);
	} 
	
	// identify type of contact submission
	$type = filter_var($_POST["type"], FILTER_SANITIZE_STRING);
	if($type == "" || ($type != "gi" && $type != "pq")){
		$output = json_encode(array('type'=>'error', 'text' => 'Invalid contact submission type'));die($output);
	}
	if($type == "gi"){$typelong = "General Info";}
	if($type == "pq"){$typelong = "Project Quote";}
	
	// any basic fields left blank?
	if(!isset($_POST['fname']) || !isset($_POST['lname']) || !isset($_POST['email'])){
		$output = json_encode(array('type'=>'error', 'text' => 'A required field was left blank'));die($output);
	}else{
		$fname = filter_var($_POST["fname"], FILTER_SANITIZE_STRING);
		$lname = filter_var($_POST["lname"], FILTER_SANITIZE_STRING);
		$email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
	}
	
	// format the date
	date_default_timezone_set('America/Toronto');
	$date = date("l, F jS, Y @ g:i A T");
	
	// begin message template
	$themessage = '
<html>
<body>
<b><font size="6" color="#444">QuickScriptz Design</font></b><br/>
<b><font size="4" color="#3A7EA0">Web Development & Creative Services</font></b><br/><hr>
<br/><i>'.$date.'</i><br/>
<b>RE: Website Contact Submission - '.$typelong.'</b><br/><br/>';

	
	// general info
	if($type == "gi"){
		// ensure we're not missing any variables
		if(!isset($_POST['message'])){
			$output = json_encode(array('type'=>'error', 'text' => 'A required field was left blank'));die($output);
		}
		$message = $_POST["message"];
		$subject = "QS Contact - General Info";
		$themessage .= '<br/>'.nl2br($message);
		
		// close message body
		$themessage .= '
<br/><br/><br/>'.$fname.' '.$lname.'<br/>
(e) '.$email.'</body></html>';
	
	
	
	// project quote
	}elseif($type == "pq"){
		// ensure we're not missing any variables
		if(!isset($_POST['cname']) || !isset($_POST['csite']) || !isset($_POST['ctitle']) || !isset($_POST['pbudget']) || !isset($_POST['pdate']) || !isset($_POST['poutline'])){
			$output = json_encode(array('type'=>'error', 'text' => 'A required field was left blank'));die($output);
		}
		$cname = filter_var($_POST["cname"], FILTER_SANITIZE_STRING);
		$csite = filter_var($_POST["csite"], FILTER_SANITIZE_URL);
		$ctitle = filter_var($_POST["ctitle"], FILTER_SANITIZE_STRING);
		$pbudget = filter_var($_POST["pbudget"], FILTER_SANITIZE_STRING);
		$pdate = filter_var($_POST["pdate"], FILTER_SANITIZE_STRING);
		$poutline = nl2br($_POST["poutline"]);
		$subject = "QS Contact - Project Quote";
		$themessage .= '
<b>Estimated Budget:</b> '.$pbudget.'<br/>
<b>Completion Date:</b> '.$pdate.'<br/><br/><br/>
'.$poutline;
		// close message body
		$themessage .= '
<br/><br/><br/>'.$fname.' '.$lname.'<br/>
'.$ctitle.'<br/>
'.$cname.'<br/>
(w) '.$csite.'<br/>
(e) '.$email.'</body></html>';
	}
	
	
	
	// set the content headers
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	$headers .= 'From: '.$fname.' '.$lname.' <' . $email . '>' . "\r\n";
	$headers .= 'Reply-To: ' . $email . "\r\n" .
	
	// do the actual sending
	$send = @mail($to, $subject, $themessage, $headers);
	
	// the result
	if(!$send){
        $output = json_encode(array('type'=>'error', 'text' => 'An error occurred, message was not sent'));die($output);
    }else{
        $output = json_encode(array('type'=>'message', 'text' => 'Message sent'));die($output);
    }
	
}
?>