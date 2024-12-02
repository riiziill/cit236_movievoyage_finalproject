document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  const formData = new FormData(e.target);
  const messageDiv = document.getElementById("response-message");

  try {
    const response = await fetch("includes/process_login.php", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();

    if (result.success) {
      messageDiv.textContent = "Login successful! Redirecting...";
      messageDiv.style.color = "green";
      setTimeout(() => {
        window.location.href = "home.php"; // Redirect to the dashboard or home page
      }, 2000);
    } else {
      messageDiv.textContent = result.message;
      messageDiv.style.color = "red";
    }
  } catch (error) {
    messageDiv.textContent = "An error occurred. Please try again.";
    messageDiv.style.color = "red";
    console.error("Error:", error);
  }
});
