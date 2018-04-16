$(document).ready(function () {
    $('[data-toggle="popover"]').popover({
        placement: 'top',
        trigger: 'hover'
    });

    $(document.body).fadeIn(1000);
    $("a").click(function () {
        $("body").fadeOut("1000");
    });
});


// canvas code 

