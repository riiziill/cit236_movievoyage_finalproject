document.addEventListener("DOMContentLoaded", () => {
  const userName = "John Doe";
  const profileImage = "profile-image.jpg";
  const watchlist = ["Movie 1", "Movie 2", "Movie 3", "Movie 4", "Movie 5"];

  document.getElementById("user-name").textContent = userName;
  document.getElementById("profile-img").src = profileImage;

  const watchlistElement = document.getElementById("watchlist");
  watchlistElement.innerHTML = "";

  watchlist.forEach((movie) => {
    const listItem = document.createElement("li");
    listItem.textContent = movie;
    watchlistElement.appendChild(listItem);
  });

  const profileImgInput = document.getElementById("profile-img-input");
  const profileImg = document.getElementById("profile-img");

  profileImg.addEventListener("click", () => {
    const changePic = confirm("Do you want to change your profile picture?");
    if (changePic) {
      profileImgInput.click();
    }
  });

  profileImgInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profileImg.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  const bioTextarea = document.getElementById("bio");
  const editBioBtn = document.getElementById("edit-bio-btn");
  const saveBioBtn = document.getElementById("save-bio-btn");

  editBioBtn.addEventListener("click", () => {
    bioTextarea.disabled = false;
    editBioBtn.style.display = "none";
    saveBioBtn.style.display = "inline-block";
  });

  saveBioBtn.addEventListener("click", () => {
    bioTextarea.disabled = true;
    editBioBtn.style.display = "inline-block";
    saveBioBtn.style.display = "none";
    const newBio = bioTextarea.value;
  });
});
