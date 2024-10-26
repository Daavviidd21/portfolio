////       NAV BUTTON
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

/// END NAV BUTTON

// about me skills

function opentab(tabname) {
  // Get all elements with the class "tab-links"
  var tablinks = document.getElementsByClassName("tab-links");
  // Get all elements with the class "tab-contents"
  var tabcontents = document.getElementsByClassName("tab-contents");

  // Remove the active-link class from all tab links
  for (var link of tablinks) {
    link.classList.remove("active-link");
  }

  // Remove the active-tab class from all tab contents
  for (var content of tabcontents) {
    content.classList.remove("active-tab");
  }

  // Add the active-link class to the clicked tab
  event.currentTarget.classList.add("active-link");
  // Add the active-tab class to the content corresponding to the clicked tab
  document.getElementById(tabname).classList.add("active-tab");
}

// end about me

////       SMOOTH SCROLLING
const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    //Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEL = document.querySelector(href);
      sectionEL.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile nav
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

// arrow up

window.addEventListener("scroll", function () {
  let scroll = document.querySelector("#up");
  scroll.classList.toggle("active", window.scrollY > 500);
});

const upBtn = document.querySelector("#up");

upBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// arrow end here

// Send Message

const scriptURL =
  "https://script.google.com/macros/s/AKfycbyTUayrbluJQqnjldgUvL3PKSXBGhUSOU-Qq8IJFntWTzSkZliJKkB4RiHf2B9bh-kM3w/exec";
const form = document.forms["submit-to-google-sheet"];
const msg = document.querySelector("#msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML = "Message sent successfully";
      setTimeout(() => {
        msg.innerHTML = "";
      }, 3000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});

// send end here
