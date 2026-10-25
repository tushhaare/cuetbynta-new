document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     MOBILE NAVIGATION
  ========================= */

  var openBtn = document.querySelector(".nav-toggle");
  var closeBtn = document.querySelector(".mobile-nav-close");
  var panel = document.querySelector(".mobile-nav");
  var lastFocusedElement;

  function closeMobileNav() {
    if (!panel) return;
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    if (openBtn) openBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  if (openBtn && panel) {
    openBtn.addEventListener("click", function () {
      panel.classList.add("is-open");
      panel.setAttribute("aria-hidden", "false");
      openBtn.setAttribute("aria-expanded", "true");
      lastFocusedElement = openBtn;
      document.body.style.overflow = "hidden";
      if (closeBtn) closeBtn.focus();
    });
  }

  if (closeBtn && panel) {
    closeBtn.addEventListener("click", closeMobileNav);
  }

  if (panel) {
    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMobileNav);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && panel && panel.classList.contains("is-open")) {
      closeMobileNav();
    }
  });


  /* =========================
     NEWSLETTER SUBSCRIPTION
  ========================= */

  var newsletterForm = document.getElementById("newsletterForm");
  var newsletterEmail = document.getElementById("newsletterEmail");
  var newsletterMessage = document.getElementById("newsletterMessage");

  if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var submitButton = newsletterForm.querySelector("button");
      if (!newsletterEmail || !newsletterMessage || !submitButton) return;
      var email = newsletterEmail.value.trim();

      submitButton.disabled = true;
      submitButton.textContent = "Subscribing...";
      newsletterMessage.textContent = "";

      fetch(
        "https://script.google.com/macros/s/AKfycbyqZAAQgyKvNwkobIXUp3VjlO8KmdQ3eDCCksFYdGDVn6F5nBu4yb4sGbIlL5_jP6hfsw/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: "email=" + encodeURIComponent(email)
        }
      )
        .then(function () {

          newsletterMessage.textContent =
            "Thanks — your request was sent. We couldn't confirm delivery, so please check back for updates.";

          newsletterEmail.value = "";

          submitButton.disabled = false;
          submitButton.textContent = "Subscribe";

        })
        .catch(function () {

          newsletterMessage.textContent =
            "Something went wrong. Please try again.";

          submitButton.disabled = false;
          submitButton.textContent = "Subscribe";

        });

    });

  }


  /* =========================
     SCROLL REVEAL
  ========================= */

  var revealElements = document.querySelectorAll(
    ".story-grid, .section-head, .process-step, .cta-band"
  );

  revealElements.forEach(function (element) {
    element.classList.add("reveal");
  });


  /* =========================
     CARD REVEAL
  ========================= */

  var revealCards = document.querySelectorAll(
    ".svc-card, .why-card"
  );

  revealCards.forEach(function (element) {
    element.classList.add("reveal-card");
  });


  /* =========================
     INTERSECTION OBSERVER
  ========================= */

  if ("IntersectionObserver" in window) {

    var observer = new IntersectionObserver(
      function (entries) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
      }
    );


    document
      .querySelectorAll(".reveal, .reveal-card")
      .forEach(function (element) {
        observer.observe(element);
      });


  } else {

    /* Fallback for older browsers */

    document
      .querySelectorAll(".reveal, .reveal-card")
      .forEach(function (element) {
        element.classList.add("is-visible");
      });

  }

/* =========================
   BACK TO TOP
========================= */

var backToTop = document.getElementById("backToTop");

if (backToTop) {

  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

}

/* =========================
   RECRUITMENT POPUP
========================= */

var recruitPopup = document.getElementById("recruitPopup");
var recruitClose = document.getElementById("recruitClose");
  var recruitApply = document.querySelector(".recruit-apply");

if (recruitPopup) {
  var popupStorageKey = "cuetbyntaRecruitmentDismissed";
  var previouslyDismissed = false;
  try {
    previouslyDismissed = window.sessionStorage.getItem(popupStorageKey) === "true";
  } catch (error) {
    // Storage can be unavailable in private browsing; the popup still works.
  }

  function closeRecruitPopup() {
    recruitPopup.style.display = "none";
    try {
      window.sessionStorage.setItem(popupStorageKey, "true");
    } catch (error) {
      // Dismissal remains effective for this page view.
    }
  }

  if (previouslyDismissed) recruitPopup.style.display = "none";
  else if (recruitClose) recruitClose.focus();

  if (recruitClose) {
    recruitClose.addEventListener("click", closeRecruitPopup);
  }

  if (recruitApply) {
    recruitApply.addEventListener("click", function () {
      try {
        window.sessionStorage.setItem(popupStorageKey, "true");
      } catch (error) {
        // Navigation still works if storage is unavailable.
      }
    });
  }

  recruitPopup.addEventListener("click", function (e) {
    if (e.target === recruitPopup) {
      closeRecruitPopup();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && recruitPopup.style.display !== "none") {
      closeRecruitPopup();
    }
  });

}

});
