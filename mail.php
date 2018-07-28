<?php
  $name = $_POST["name"];
  $mail = $_POST["email"];
  $content = $_POST["message"];


  if(IsInjected($visitor_email))
  {
      echo "Bad email value!";
      exit;
  }

  $email_from = "contact@workwithphilip.me";
  $email_subject = "Contact Request";
  $email_body = "Hi Philip. \n You have a new contact request from $name. \n The Mail is: $mail.\n The message is: \n $content";

  $to = "contact@workwithphilip.me";
  $headers = "From: $email_from \r\n";

  mail($to, $email_subject, $email_body, $headers);
  //Go to a thank you page.
  header('Location: thank-you.html');

  // Function to validate against any email injection attempts
  function IsInjected($str)
  {
    $injections = array('(\n+)',
                '(\r+)',
                '(\t+)',
                '(%0A+)',
                '(%0D+)',
                '(%08+)',
                '(%09+)'
                );
    $inject = join('|', $injections);
    $inject = "/$inject/i";
    if(preg_match($inject,$str))
      {
      return true;
    }
    else
      {
      return false;
    }
  }
 ?>
