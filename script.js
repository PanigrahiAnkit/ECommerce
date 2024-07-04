document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("search-bar1");
  const resultsContainer = document.getElementById("results");
  let data = [];

  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((responseData) => {
      data = responseData;
      displayResults(data);
    });

  searchBar.addEventListener("input", () => {
    const query = searchBar.value.trim().toLowerCase();

    if (query.length > 0) {
      const filteredItems = data.filter((item) => {
        return item.title.toLowerCase().includes(query);
      });

      displayResults(filteredItems);
    } else {
      displayResults(data);
    }
  });

  function displayResults(items) {
    resultsContainer.innerHTML = "";

    items.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("item");

      itemDiv.innerHTML = ` 
      <div>
          <div class="prod-image">
          <img src="${item.image}" alt="${item.title}" class="image" />
        </div>

        <p class="category">${item.category
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}</p>
        
        <div class="title-text">
          <h3 class="title">${item.title.substring(0, 30)}</h3>
        </div>

        <p class="description">${item.description.substring(0, 50)}</p>

        <div class="rating">
          <p>${item.rating.rate}</p>
        </div>

        <div class="price">
          <p>$${item.price}</p>
        </div>
      </div>
        `;

      resultsContainer.appendChild(itemDiv);
    });
  }
});
