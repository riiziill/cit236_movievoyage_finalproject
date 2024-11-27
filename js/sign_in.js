document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
        storedUser &&
        storedUser.email === formData.get("email") &&
        storedUser.password === formData.get("password")
    ) {
        alert("Sign-In Successful!");
        window.location.href = "home.html";
    } else {
        alert("Invalid email or password!");
    }
});