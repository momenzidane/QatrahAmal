
$('document').ready(function() {
  $('#doctorSlideshow').owlCarousel({
    nav: true,
    dots: false,
    navText: ["<span class='mai-arrow-back'></span>", "<span class='mai-arrow-forward'></span>"],
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 2
      },
      992: {
        items: 3
      }
    }
  });
});

$('document').ready(function() {
  $("a[data-role='smoothscroll']").click(function(e) {
    e.preventDefault();
    
    var position = $($(this).attr("href")).offset().top - nav_height;

    $("body, html").animate({
        scrollTop: position
    }, 1000 );
    return false;
  });
});
// مثال لجعل الأرقام تتزايد عند التحميل
document.addEventListener("DOMContentLoaded", function() {
  const counters = document.querySelectorAll(".stat-number");

  // إعداد IntersectionObserver لمراقبة القسم
  const statisticsSection = document.getElementById("Statistics");
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // عندما يظهر القسم على الشاشة، تشغيل العدادات
        counters.forEach(counter => {
          counter.innerText = '0';

          const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            const increment = target / 200; // سرعة التزايد

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCounter, 10);
            } else {
                counter.innerText = target;
            }
          };

          updateCounter();
        });

        // إيقاف المراقبة بعد تشغيل العدادات
        observer.unobserve(statisticsSection);
      }
    });
  }, { threshold: 0.5 }); // الحد الذي يعتبر عنده القسم مرئياً بنسبة 50%

  observer.observe(statisticsSection);
});


$('document').ready(function() {
  // Back to top
  var backTop = $(".back-to-top");

  $(window).scroll(function() {
    if($(document).scrollTop() > 400) {
      backTop.css('visibility', 'visible');
    }
    else if($(document).scrollTop() < 400) {
      backTop.css('visibility', 'hidden');
    }
  });

  backTop.click(function() {
    $('html').animate({
      scrollTop: 0
    }, 1000);
    return false;
  });
});


$('document').ready(function() {
  // Tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // Popovers
  $('[data-toggle="popover"]').popover();

  // Page scroll animate
  new WOW().init();
});



