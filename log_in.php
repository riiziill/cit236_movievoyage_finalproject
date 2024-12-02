<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="sign_in.css" />
    <title>Sign-In</title>
    <link rel="icon" type="image" href="assets/icon.png" />
  </head>
  <body>
    <div class="navbar">
      <div class="logo">
        <h1>MV</h1>
      </div>
    </div>

    <div class="form-container">
      <form id="login-form" method="POST" action="includes/process_login.php">
        <h2>Sign-In</h2>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <p class="gotosignup">Don't have an account? <a href="sign_up.php">Sign Up</a></p>
        <button type="submit">Sign In</button>
      </form>
      <div id="response-message"></div>
    </div>
    <script src="js/log_in.js"></script>
  </body>
</html>