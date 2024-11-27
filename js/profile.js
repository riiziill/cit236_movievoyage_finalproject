document.addEventListener('DOMContentLoaded', () => {
    const userName = "John Doe"; // Replace this with code to get the actual user's name from sign-in/sign-up
    const profileImage = "profile-image.jpg"; // Replace this with code to get the actual user's profile image
    const watchlist = [
        "Movie 1",
        "Movie 2",
        "Movie 3",
        "Movie 4",
        "Movie 5",
    ]; // Replace this with code to get the actual user's watchlist from the database

    document.getElementById('user-name').textContent = userName;
    document.getElementById('profile-img').src = profileImage;

    const watchlistElement = document.getElementById('watchlist');
    watchlistElement.innerHTML = ''; // Clear the loading text

    watchlist.forEach(movie => {
        const listItem = document.createElement('li');
        listItem.textContent = movie;
        watchlistElement.appendChild(listItem);
    });

    // Handle profile image change
    const profileImgInput = document.getElementById('profile-img-input');
    const profileImg = document.getElementById('profile-img');

    profileImg.addEventListener('click', () => {
        const changePic = confirm('Do you want to change your profile picture?');
        if (changePic) {
            profileImgInput.click();
        }
    });

    profileImgInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImg.src = e.target.result;
                // Here you can add code to upload the new profile image to the server
            }
            reader.readAsDataURL(file);
        }
    });

    // Handle bio editing
    const bioTextarea = document.getElementById('bio');
    const editBioBtn = document.getElementById('edit-bio-btn');
    const saveBioBtn = document.getElementById('save-bio-btn');

    editBioBtn.addEventListener('click', () => {
        bioTextarea.disabled = false;
        editBioBtn.style.display = 'none';
        saveBioBtn.style.display = 'inline-block';
    });

    saveBioBtn.addEventListener('click', () => {
        bioTextarea.disabled = true;
        editBioBtn.style.display = 'inline-block';
        saveBioBtn.style.display = 'none';
        const newBio = bioTextarea.value;
        // Here you can add code to save the new bio to the server
    });
});
