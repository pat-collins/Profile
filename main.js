

    // Open the Modal
  function openLightbox() {
    document.getElementById("myLightbox").style.display = "block";
  }

  // Close the Modal
  function closeLightbox() {
    document.getElementById("myLightbox").style.display = "none";
  }

  var slideIndex = 1;
  showSlides(slideIndex);

  // Next/previous controls
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  // Thumbnail image controls
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    captionText.innerHTML = dots[slideIndex-1].alt;
  }
 
// Collapse button
  function toggleAbout () {
    document.getElementById("about-content").classList.toggle("hide");
  }

  function toggleScada () {
    document.getElementById("scada-content").classList.toggle("hide");
  }
  function toggleCode () {
    document.getElementById("code-content").classList.toggle("hide");
  }
  function toggleTestimonies () {
    document.getElementById("testimonies-content").classList.toggle("hide");
  }

//Navigate to memory game page

document.getElementById("testimonial-button").onclick = function () {
  location.href = "./memory.html";
};

