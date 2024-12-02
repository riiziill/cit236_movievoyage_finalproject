document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const messageDiv = document.getElementById("response-message");

  try {
    const response = await fetch("includes/process_signup.php", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();

    if (result.success) {
      messageDiv.textContent = "Sign-up successful! Redirecting...";
      messageDiv.style.color = "green";
      setTimeout(() => {
        window.location.href = "log_in.php";
      }, 4000);
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
