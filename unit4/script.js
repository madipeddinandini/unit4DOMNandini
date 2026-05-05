const form = document.getElementById("bookmarkForm");
const bookmarksList = document.getElementById("bookmarksList");

let bookmarks = [];
let currentFilter = "All";

form.addEventListener("submit", addBookMark);

function addBookMark(e) {
  e.preventDefault();

  const websiteTitle = document.getElementById("websiteTitle").value.trim();
  const websiteUrl = document.getElementById("websiteUrl").value.trim();
  const category = document.getElementById("category").value.trim();

  const newBookmark = {
    id: Date.now(),
    title: websiteTitle,
    url: websiteUrl,
    category: category
  };

  bookmarks.push(newBookmark);
  saveBookmarks();
  renderBookmarks();

  form.reset(); // reset after submit
}

function renderBookmarks() {
  const filteredBookmarks = filterBookmarks(currentFilter);

  if (filteredBookmarks.length === 0) {
    bookmarksList.innerHTML = "No bookmarks found";
    return;
  }

  bookmarksList.innerHTML = "";

  filteredBookmarks.forEach(bookmark => {
    const bookmarkElement = document.createElement("div");
    bookmarkElement.className = "bookmark-item";

    bookmarkElement.innerHTML = `
      <h3>${bookmark.title}</h3>
      <a href="${bookmark.url}" target="_blank">${bookmark.url}</a>
      <p>${bookmark.category}</p>
      <button class="delete-btn">Delete</button>
    `;

    const deleteBtn = bookmarkElement.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => deleteBookmark(bookmark.id));

    bookmarksList.appendChild(bookmarkElement);
  });
}

function deleteBookmark(id) {
  bookmarks = bookmarks.filter(b => b.id !== id);
  saveBookmarks();
  renderBookmarks();
}

function filterBookmarks(categoryFilter) {
  if (categoryFilter === "All") return bookmarks;

  return bookmarks.filter(b => b.category === categoryFilter);
}

const DEFAULT_SETTINGS = {
  storageKey: "bookmarksData"
};

function saveBookmarks() {
  localStorage.setItem(DEFAULT_SETTINGS.storageKey, JSON.stringify(bookmarks));
}

function loadBookmarks() {
  const stored = localStorage.getItem(DEFAULT_SETTINGS.storageKey);
  bookmarks = stored ? JSON.parse(stored) : [];
}

document.addEventListener("DOMContentLoaded", () => {
  loadBookmarks();
  renderBookmarks();
});