$(document).ready(function () {
    var $messages = $('.messages-content'),
        i = 0;

    //Array to hold the responses
    let responses = [
        [], [], [], [], [], [], []
    ];

    $(window).load(function () {
        $messages.mCustomScrollbar();
        setTimeout(function () {
            fakeMessage();
        }, 100);
    });

    function updateScrollbar() {
        $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
            scrollInertia: 10,
            timeout: 0
        });
    }

    // function setDate() {
    //     d = new Date();
    //     var m = d.toLocaleTimeString('en-GB', { hour12: true, hour: "numeric", 
    //     minute: "numeric"});
    //         $('<div class="timestamp">' + m + '</div>').appendTo($('.message:last'));
    // }

    let msgId = 0;


    // Inserts message
    function insertMessage() {
        if (msgId === 7) {
            return;
        }
        if (msgId != 4) {
            msg = $('.message-input').val();
            if ($.trim(msg) == '') {
                return false;
            }
            $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
            responses[msgId].push(msg);
            console.log(responses);

            msgId++;

           
            $('.message-input').val(null);
        } else {
            clickedCandidate();
        }

        updateScrollbar();
        setTimeout(function () {
            fakeMessage();
        }, 1000 + (Math.random() * 20) * 100);
    }

    // Inserts message when candidate is clicked on
    function insertChoiceMade(choice) {
        if (choice == '') {
            return false;
        }
        $('<div class="message message-personal">' + choice + '</div>').appendTo($('.mCSB_container')).addClass('new');
        // setDate();
        $('.message-input').val(null);
        updateScrollbar();
        setTimeout(function () {
            fakeMessage();
        }, 1000 + (Math.random() * 20) * 100);
    }

    $('.message-submit').click(function () {
        insertMessage();
    });

    $(window).on('keydown', function (e) {
        if (e.which == 13) {
            insertMessage();
            return false;
        }
    });

    let candidatesDiv = `
    <div class="candidates">
        <ul>
            <li class="candidate" data-value="Raila Odinga">Raila Odinga</li>
            <li class="candidate" data-value="William Ruto">William Ruto</li>
            <li class="candidate" data-value="Fred Matiangi">Fred Matiangi</li>
        </ul>
        <ul>
            <li class="candidate" data-value="Musalia Mudavadi">Musalia Mudavadi</li>
            <li class="candidate" data-value="Kalonzo Musyoka">Kalonzo Musyoka</li>
            <li class="candidate" data-value="Others">Others</li>
        </ul>
    </div>`;


    let choice = '';

    function clickedCandidate() {
        let candidates = document.querySelectorAll('.candidate');
        let candidatesContainer = document.querySelector('.candidates');
        // console.log(candidates);

        candidates.forEach((candidate, i) => {

            candidate.addEventListener('click', () => {
                choice = candidates[i].getAttribute("data-value");
                insertChoiceMade(choice);
                candidatesContainer.style.display = 'none';
                // return choice;
                responses[4].push(choice);
                msgId++;
                console.log(responses);
            });
        });
    }


    var Fake = [
        {
            question: 'Are you a youth? (Below 35yrs)',
            options: 'Yes | No',
        },
        {
            question: 'What is your gender?',
            options: ''
        },
        {
            question: 'Which country are you from?',
            options: ''
        },
        {
            question: 'Who would you like to see vying for the next Presidential Elections?',
            options: ''
        },
        {
            question: 'If elections were held today, who would you support for President?',
            options: candidatesDiv
        },
        {
            question: 'If a referendum on the constitutional changes proposed in the BBI was held today, would you vote for or against the changes?',
            options: 'For | Against'
        },
        {
            question: 'Do you support 1 man, 1 vote, 1 shilling policy?',
            options: 'Yes | No'
        }
    ];


    function fakeMessage() {
        if ($('.message-input').val() != '') {
            return false;
        }
        $('<div class="message loading new"><figure class="avatar"><img src="https://cdn.diversityavatars.com/assets/images/avatars-gallery/placeholder.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
        updateScrollbar();

        setTimeout(function () {
            $('.message.loading').remove();
            if (i === 7) {
                $('<div class="message new"><figure class="avatar"><img src="https://cdn.diversityavatars.com/assets/images/avatars-gallery/placeholder.png" /></figure>' + 'Thank you for your answers. Have a lovely day.' + '</div>').appendTo($('.mCSB_container')).addClass('new');
                // $('.message-box');
                updateScrollbar();
                document.querySelector('.message-box').style.display = 'none';
                return;
            }
            if (i === 4) {
                $('<div class="message new"><figure class="avatar"><img src="https://cdn.diversityavatars.com/assets/images/avatars-gallery/placeholder.png" /></figure>' + Fake[i].question + '<br>' + Fake[i].options + '</div>').appendTo($('.mCSB_container')).addClass('new');
                clickedCandidate();
                updateScrollbar();
            } else {
                $('<div class="message new"><figure class="avatar"><img src="https://cdn.diversityavatars.com/assets/images/avatars-gallery/placeholder.png" /></figure>' + Fake[i].question + '<br>' + Fake[i].options + '</div>').appendTo($('.mCSB_container')).addClass('new');
            }
            updateScrollbar();
            i++;
        }, 1000 + (Math.random() * 20) * 100);
    }
});



