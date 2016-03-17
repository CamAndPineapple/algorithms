document.addEventListener("DOMContentLoaded", function(event) {

  var searchBarContainer = document.getElementById('search-container');
  var searchBarInput = document.getElementById('search-input');

  // Add boxshadow to search bar when clicked
  searchBarInput.addEventListener('click', function() {
    searchBarContainer.style.boxShadow = 'rgb(110, 115, 241) 0px 0px 5px 2px';
  }, false);
  // Remove boxshadow from searchbar when you click anywhere else on page
  document.onclick = function(e) {
    var from = e.target || e.srcElement;
    if (from.id === 'search-input') {
      return;
    }
    searchBarContainer.style.boxShadow = 'none';
  };

});
