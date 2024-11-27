document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {
        firstName: formData.get("first-name"),
        lastName: formData.get("last-name"),
        email: formData.get("email"),
        password: formData.get("password"),
    };

    localStorage.setItem("user", JSON.stringify(user));
    alert("Sign-Up Successful! Redirecting to Sign-In page...");
    window.location.href = "sign-in.html";
});