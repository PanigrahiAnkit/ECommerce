document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("search-bar1");
  const resultsContainer = document.getElementById("results");

  // Fetch all items and display them initially
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      displayResults(data);
    });

  searchBar.addEventListener("input", () => {
    const query = searchBar.value.trim().toLowerCase();

    if (query.length > 0) {
      fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {
          const filteredItems = data.filter((item) => {
            return item.title.toLowerCase().includes(query);
          });

          displayResults(filteredItems);
        });
    } else {
      // If search bar is empty, display all items
      fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {
          displayResults(data);
        });
    }
  });

  function displayResults(items) {
    resultsContainer.innerHTML = "";

    items.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("item");

      //template string
      itemDiv.innerHTML = ` 
        <img src="${item.image}" alt="${item.title}" class="prod-image" />
        <p class="category">${
          item.category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        }</p>
        <h3 class="title">${item.title}</h3>
        <p class="description">${item.description.substring(0, 50)}</p>
        <p>${item.rating.rate}</p>
        <p>${item.price}</p>
        `;

      resultsContainer.appendChild(itemDiv);
    });
  }
});
