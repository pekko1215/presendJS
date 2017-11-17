$(() => {
    var slides = [];
    var slideURL = location.href+"slides/"
    var slideIdx = 1;
    slides.push(slideURL + "1.html");

    $('.slider').append($('<iframe allowfullscreen>').attr({ frameborder: 0 }).addClass('slide').attr({ src: "./slides/1.html" }))
    appendMiniSlide(slideURL + '1.html', 1);
    (function autoLoad(idx) {
        var url = slideURL + `${idx}.html`;
        $.get(url, (data) => {
            slides.push(url);
            appendMiniSlide(url, idx);
            autoLoad(idx + 1)
        })
    })(2);
    $('.contener').click((e) => {
        if (e.clientX < window.outerWidth) {
            slideLeft();
        } else {
            slideRight();
        }
    })

    $('#full').click(() => {
        $('.slider iframe')[0].webkitRequestFullscreen()
    })

    document.onkeydown = (e) => {
        e.keyCode == 37 && slideLeft();
        e.keyCode == 39 && slideRight();
    }

    function registPageEvent() {
        $('.slide')[0].onload = () => {
            $('.slide')[0].contentDocument.body.onkeydown = (e) => {
                e.keyCode == 37 && slideLeft();
                e.keyCode == 39 && slideRight();
            }
        }
    }

    registPageEvent()


    function slideLeft() {
        if (slideIdx == 1) {
            return;
        }
        slideIdx--;
        $(".twitter-share-button").attr("data-text", $("title").text() + " スライド" + slideIdx)
        $('.slide').get(0).contentDocument.location.replace(slideURL + `${slideIdx}.html`);
    }

    function slideRight() {
        if (slideIdx == slides.length) {
            return;
        }
        slideIdx++;
        $(".twitter-share-button").attr("data-text", $("title").text() + " スライド" + slideIdx)
        $('.slide').get(0).contentDocument.location.replace(slideURL + `${slideIdx}.html`);
    }

    function appendMiniSlide(url, count) {
        var target = $('.minislides');
        var frame = $('<iframe>');
        frame.addClass('minislide');
        frame.attr({ src: url })
        var wrap = $('<div>');
        wrap.addClass('minislidewrap')
        wrap.attr("data-id", count)
        var label = $('<h4>');
        label.text(count);
        wrap.append(label)
        wrap.append(frame);
        target.append(wrap);

        frame.get(0).contentDocument.body.onload = function() {
            frame.get(0).contentDocument.body.onclick = function() {
                slideIdx = count;
                $(".twitter-share-button").attr("data-text", $("title").text() + " スライド" + slideIdx)
                $('.slide').get(0).contentDocument.location.replace(slideURL + `${slideIdx}.html`);
            }
        }
    }
})