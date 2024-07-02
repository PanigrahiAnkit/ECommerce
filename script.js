document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("search-bar1");
  const resultsContainer = document.getElementById("results");
  // searchBar.addEventListener('input', async () => {
  //     const query = searchBar.value.trim().toLowerCase();

  //     if(query.length > 0) {
  //         // console.log("this is empty")
  //         const data = await fetch('https://fakesearchapi.com/products')
  //         const datajson = data.json()
  //     }

  //     // console.log(query);
  // });

  searchBar.addEventListener("input", () => {
    const query = searchBar.value.trim().toLowerCase();

    if (query.length > 0) {
      fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {
          //   console.log(data);
          const filteredItems = data.filter((item) => {
            return item.title.toLowerCase().includes(query);
          });

          displayResults(filteredItems);
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
                <img src="${item.image}" alt="${item.title}" />
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <p>${item.price}</p>
            `;

      resultsContainer.appendChild(itemDiv);
    });
  }
});
