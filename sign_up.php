<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="sign_up.css" />
    <title>Sign-Up</title>
    <link rel="icon" type="image" href="assets/icon.png" />
  </head>
  <body>
    <div class="navbar">
      <div class="logo">
        <h1>MV</h1>
      </div>
    </div>

    <div class="form-container">
      <form id="signup-form" method="POST" action="includes/process_signup.php">
        <h2>Sign-Up</h2>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required />
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" minlength="8" title="Password must be at least 8 characters" required />
        <label for="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" name="confirm_password" required />
        <p class="gotosignin">
          Already have an account? <a href="log_in.php">Sign In</a>
        </p>
        <button type="submit" >Sign Up</button>
      </form>
      <div id="response-message"></div>
    </div>
    <script src="js/sign_up.js"></script>
  </body>
</html>
