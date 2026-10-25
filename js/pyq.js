document.addEventListener("DOMContentLoaded", function () {
  var search = document.getElementById("pyq-search");
  var category = document.getElementById("pyq-category");
  var subject = document.getElementById("pyq-subject");
  var cards = Array.from(document.querySelectorAll(".pyq-card"));
  var results = document.getElementById("pyq-results");
  var empty = document.getElementById("pyq-empty");

  if (!search || !category || !subject || !results || !empty || !cards.length) return;

  function filterSubjects() {
    var query = search.value.trim().toLocaleLowerCase();
    var selectedCategory = category.value;
    var selectedSubject = subject.value;
    var visibleCount = 0;

    cards.forEach(function (card) {
      var matchesSearch = card.dataset.subject.indexOf(query) !== -1;
      var matchesCategory = selectedCategory === "all" || card.dataset.category === selectedCategory;
      var matchesSubject = selectedSubject === "all" || card.dataset.subject === selectedSubject;
      var visible = matchesSearch && matchesCategory && matchesSubject;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    results.textContent = "Showing " + visibleCount + " of " + cards.length + " subjects";
    empty.hidden = visibleCount !== 0;
  }

  search.addEventListener("input", filterSubjects);
  category.addEventListener("change", filterSubjects);
  subject.addEventListener("change", filterSubjects);
  filterSubjects();
});
