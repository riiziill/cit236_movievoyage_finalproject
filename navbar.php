<div class="header">
  <div class="nav">
    <h1>MV</h1>
    <a href="home.html">Home</a>
    <a href="watchlist.html">Watchlist</a>
    <div class="search-bar">
      <form id="filter-form" action="search.html" method="get">
        <input
          type="text"
          id="filter-title"
          name="query"
          placeholder="Search by Title"
        />
        <button type="submit" id="search-btn">Search</button>
      </form>
      <div id="no-results" style="display: none">No movies found.</div>
    </div>
    <a href="profile.php">
      <img src="assets/profile-image.png" alt="" class="nav-img" />
    </a>
  </div>
</div>
<script type="module" src="js/search.js"></script>