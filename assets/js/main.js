/**
* Template Name: Personal - v2.1.0
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Dynamic Content Loading
  async function loadExperience() {
    try {
      const response = await fetch('data/experience.json');
      const experiences = await response.json();
      const experienceContainer = document.querySelector('#experience .col-lg-12');
      
      if (experienceContainer) {
        // Clear existing content except the first child (which might be empty)
        const existingBoxes = experienceContainer.querySelectorAll('.icon-box');
        existingBoxes.forEach(box => box.remove());

        experiences.forEach((exp, index) => {
          const experienceHTML = `
            <div class="col-md-12 mt-4 mt-md-0 icon-box" data-aos="fade-up" data-aos-delay="${100 + (index * 100)}">
              <h4 style="text-align:left;"><a href="${exp.website}" style="color:#00d4aa">${exp.company}</a><br></h4>
              <h5 style="text-align:left;">${exp.period}</h5>
              <p style="text-align:left;color:#e4e6ea"><em>${exp.position}</em></p>
              <ul style="text-align:left;">
                ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
              </ul>
            </div>
          `;
          experienceContainer.insertAdjacentHTML('beforeend', experienceHTML);
        });
      }
    } catch (error) {
      console.error('Error loading experience data:', error);
    }
  }

  async function loadProjects() {
    try {
      const response = await fetch('data/projects.json');
      const projects = await response.json();
      const projectContainer = document.querySelector('.portfolio-container');
      
      if (projectContainer) {
        // Clear existing projects
        projectContainer.innerHTML = '';

        projects.forEach(project => {
          const projectHTML = `
            <div class="col-lg-4 col-md-6 portfolio-item ${project.category}">
              <center><h4>${project.title}</h4></center>
              <div class="portfolio-wrap">
                <img src="${project.image}" class="img-fluid" alt="${project.title}">
                <div class="portfolio-info">
                  <div class="portfolio-links">
                    <a href="${project.detailsUrl}" data-gall="portfolioDetailsGallery" data-vbtype="iframe" class="venobox" title="Project Details">
                      <i class="bx bx-info-circle"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          `;
          projectContainer.insertAdjacentHTML('beforeend', projectHTML);
        });

        // Reinitialize Isotope after loading projects
        if (typeof $.fn.isotope !== 'undefined') {
          setTimeout(() => {
            const portfolioIsotope = $('.portfolio-container').isotope({
              itemSelector: '.portfolio-item',
              layoutMode: 'fitRows'
            });

            $('#portfolio-flters li').off('click').on('click', function() {
              $("#portfolio-flters li").removeClass('filter-active');
              $(this).addClass('filter-active');
              portfolioIsotope.isotope({
                filter: $(this).data('filter')
              });
            });
          }, 100);
        }
      }
    } catch (error) {
      console.error('Error loading projects data:', error);
    }
  }

  async function loadSkills() {
    try {
      const response = await fetch('data/skills.json');
      const skillCategories = await response.json();
      const skillsContainer = document.querySelector('#skills .col-lg-12');
      
      if (skillsContainer) {
        // Clear existing skills
        const existingSkills = skillsContainer.querySelectorAll('.icon-box');
        existingSkills.forEach(skill => skill.remove());

        skillCategories.forEach((category, index) => {
          const skillHTML = `
            <div class="col-md-12 mt-4 mt-md-0 icon-box" data-aos="fade-up" data-aos-delay="${100 + (index * 50)}" style="background:#fff">
              <h4 style="text-align:left;color:#09203a">${category.category}</h4>
              <p style="text-align:left;color:#333;font-size:14px;">
                ${category.skills}
              </p>
            </div>
          `;
          skillsContainer.insertAdjacentHTML('beforeend', skillHTML);
        });
      }
    } catch (error) {
      console.error('Error loading skills data:', error);
    }
  }

  // Initialize dynamic content loading
  function initDynamicContent() {
    loadExperience();
    loadProjects();
    loadSkills();
  }

  // Nav Menu
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var hash = this.hash;
      var target = $(hash);
      if (target.length) {
        e.preventDefault();

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if (hash == '#header') {
          $('#header').removeClass('header-top');
          $("section").removeClass('section-show');
          return;
        }

        if (!$('#header').hasClass('header-top')) {
          $('#header').addClass('header-top');
          setTimeout(function() {
            $("section").removeClass('section-show');
            $(hash).addClass('section-show');
          }, 350);
        } else {
          $("section").removeClass('section-show');
          $(hash).addClass('section-show');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }

        return false;
      }
    }
  });

  // Activate/show sections on load with hash links
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      $('#header').addClass('header-top');
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');
      setTimeout(function() {
        $("section").removeClass('section-show');
        $(initial_nav).addClass('section-show');
      }, 350);
    }
  }

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Portfolio isotope and filter
  $(window).on('load', function() {
    // Initialize dynamic content first
    initDynamicContent();
    
    // Wait a bit for content to load, then initialize isotope
    setTimeout(() => {
      var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      $('#portfolio-flters li').on('click', function() {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({
          filter: $(this).data('filter')
        });
      });
    }, 500);
  });

  // Initiate venobox (lightbox feature used in portfolio)
  $(document).ready(function() {
    // Initialize dynamic content on page ready as well
    setTimeout(() => {
      $('.venobox').venobox();
    }, 600);
  });

  // Modern Contact Form Handler (using Formspree)
  function initModernContactForm() {
    const form = document.querySelector('.php-email-form');
    if (form) {
      // Update form action to use Formspree (you'll need to replace with your endpoint)
      form.setAttribute('action', '@https://formspree.io/f/xldllzlj');
      form.setAttribute('method', 'POST');
      
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        const loading = form.querySelector('.loading');
        const errorMessage = form.querySelector('.error-message');
        const sentMessage = form.querySelector('.sent-message');
        
        // Show loading state
        loading.style.display = 'block';
        submitButton.disabled = true;
        
        try {
          const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });
          
          loading.style.display = 'none';
          
          if (response.ok) {
            sentMessage.style.display = 'block';
            form.reset();
          } else {
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'There was a problem sending your message. Please try again.';
          }
        } catch (error) {
          loading.style.display = 'none';
          errorMessage.style.display = 'block';
          errorMessage.textContent = 'Network error. Please check your connection and try again.';
        } finally {
          submitButton.disabled = false;
        }
      });
    }
  }

  // Initialize modern contact form
  $(document).ready(function() {
    initModernContactForm();
  });

  // Add smooth scrolling for better UX
  $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 100
        }, 1000, "easeInOutExpo");
      }
    }
  });

})(jQuery);