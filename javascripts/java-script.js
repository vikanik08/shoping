document.addEventListener('DOMContentLoaded', function () {
   
    const slider = document.getElementById('slider');
    const slides = slider.querySelectorAll('.slide');
  
    function updateActiveSlide() {
      const sliderCenter = slider.scrollLeft + slider.offsetWidth / 2;
  
      slides.forEach(slide => {
        const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
        const distance = Math.abs(sliderCenter - slideCenter);
        slide.classList.toggle('active', distance < slide.offsetWidth / 2);
      });
    }
  
    slider.addEventListener('scroll', updateActiveSlide);
    window.addEventListener('load', updateActiveSlide);
  
    // Горизонтальный скролл колесом мыши
    slider.addEventListener('wheel', (e) => {
      e.preventDefault();
      slider.scrollLeft += e.deltaY;
    }, { passive: false });
 
});
