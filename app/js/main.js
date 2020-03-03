$(function() { /* запись функции такова, чтобы сразу код читался из файла html до конца, а потом уже смотрел в эту функцию */
    $(".rate-star").rateYo({
        rating: 5,
        starWidth: "12px",
        readOnly: true
    });

    $('.product-slider__inner').slick({
        dots: true,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 4
    });

    var mixer = mixitup('.products__inner-box');



});