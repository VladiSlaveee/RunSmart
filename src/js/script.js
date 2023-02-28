// $(document).ready(function(){
//     $('.carousel__inner').slick({                                 - вариант реализации слайдера с помошью библиотеки slick
//         speed: 1200,
//         adaptiveHeight: true,
//         prevArrow:  '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
//         responsive: [
//             {
//                 breakpoint: 992,
//                 settings: {
//                   dots: true,
//                   arrows: false
//                 } 
//             }
//         ]
//       });
//   });


const slider = tns({                                                                      //- tiny-слайдер
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
  });


  document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
  });


  document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
  });

$(document).ready(function(){                                                            //- переключение класса active (табы)
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  // $('.catalog-item__link').each(function(i) {                                         - переключение класса active без функции (при нажатии на ссылку подробнее/назад в карточке товара в каталоге)
  //   $(this).on('click', function(e) {
  //     e.preventDefault();
  //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
  //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
  //   })
  // })

  // $('.catalog-item__back').each(function(i) {
  //   $(this).on('click', function(e) {
  //     e.preventDefault();
  //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
  //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
  //   })
  // })

  function toggleSlide(item) {                                                          //переключение класса active с использованием функции
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    });
  };

  toggleSlide ('.catalog-item__link');
  toggleSlide ('.catalog-item__back');

  // Modal

  $('[data-modal=consultation]').on('click', function() {                               //показать 1-ую модалку
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function() {                                           //при нажатии на крестик скрыть все модалки и подложку
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  })
  $('.button_mini').each(function(i) {                                                  //показать 2-ую модалку + текст у .modal__descr заменить на .catalog-item__subtitle (подтянуть подзаголовок у карточки товара в модалку)
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    })
  });

  function validationForms(form) {                                                      // валидация форм
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: "введите имя",
        phone: "введите номер телефона",
        email: {
          required: "введите имейл",
          email: "это не имейл"
        }
      }
    });
  }

  validationForms('#consultation-form');
  validationForms('#consultation form');
  validationForms('#order form');

  $('form').submit(function(e) {                                                        //отправка писем с сайта
    e.preventDefault();

    if (!$(this).valid()) {                                                             //если форма не провалидирована, код не выполняется
      return;
    }

    $.ajax({                                                                            //настройки ajax + показать 3-ую модалку
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');

      $('form').trigger('reset');
    });
    return false;
  });

  //Smooth scroll and pageup

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });


  new WOW().init();
});
