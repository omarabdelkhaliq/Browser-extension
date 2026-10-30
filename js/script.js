const dark = document.querySelector(".theme");
const list = document.querySelector(".list");
const filterBtns = document.querySelectorAll("[data-filter]");

const savedData = JSON.parse(localStorage.getItem("data"));

let data = savedData || [];
let currentFilter = "all";

async function getData() {
  try {
    const response = await fetch("data.json");
    data = await response.json();
    console.log(data);
    renderExtensions();
  } catch (error) {
    console.log(error);
  }
}
if (savedData) {
  renderExtensions();
} else {
  getData();
}

function renderExtensions() {
  list.innerHTML = "";
  let visibledata = data;

  if (currentFilter === "active") {
    visibledata = visibledata.filter((v) => v.isActive === true);
  } else if (currentFilter === "inactive") {
    visibledata = visibledata.filter((v) => v.isActive === false);
  }

  visibledata.forEach((ext) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `  <div class="card-top">
    <div class="image">
      <img src="${ext.logo}" alt="${ext.name} logo" />
    </div>
    <div class="text">
      <div class="name">
        <h4>${ext.name}</h4>
      </div>
      <div class="description">
        <p>${ext.description}</p>
      </div>
    </div>
  </div>
  <div class="buttons">
    <div class="remove-btn">
      <button class="remove">Remove</button>
    </div>
    <label class="switch">
      <input type="checkbox" ${ext.isActive ? "checked" : ""} />
      <span class="slider"></span>
    </label>
  </div>`;
    list.appendChild(card);
    const checkbox = card.querySelector("input");
    checkbox.addEventListener("change", function () {
      ext.isActive = !ext.isActive;
      renderExtensions();
    });
    const remove = card.querySelector(".remove");
    remove.addEventListener("click", function () {
      data = data.filter((r) => r.name !== ext.name);
      renderExtensions();
    });
  });
  localStorage.setItem("data", JSON.stringify(data));
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    filterBtns.forEach((b) => {
      b.classList.remove("active");
    });
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderExtensions();
  });
});

function setTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

setTheme(localStorage.getItem("theme") === "dark");

dark.addEventListener("click", function () {
  setTheme(!document.body.classList.contains("dark"));
});
