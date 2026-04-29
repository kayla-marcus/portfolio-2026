<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Get and sanitize form values
    $name = htmlspecialchars(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(trim($_POST["phone"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    // Validate required fields
    if (empty($name) || empty($email) || empty($message)) {
        die("Please fill out all required fields.");
    }

    // Where the message will be sent
    // Emails you want to receive the message
    $primaryRecipient     = "contact@kaylamarcus.x10.mx";    // your domain email
    $secondaryRecipient   = "kayla.marc12@gmail.com";         // your Gmail

    $subject = "New Portfolio Contact Form Message from $name";

    // Email content
    $body = "
    You received a new message from your website contact form.

    Full Name: $name
    Email: $email
    Phone: $phone

    Message:
    $message
    ";

    // Use your domain email as the sender to avoid spam issues
    $fromEmail = "contact@kaylamarcus.x10.mx";

    // Email headers
    $headers = "From: Website Contact Form <$fromEmail>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send to 1st email
    $send1 = mail($primaryRecipient, $subject, $body, $headers);

    // Send to 2nd email
    $send2 = mail($secondaryRecipient, $subject, $body, $headers);

    if ($send1 && $send2) {
        header("Location: contact.html?status=success");
        exit;
    } else {
        header("Location: contact.html?status=error");
        exit;
    }
}
