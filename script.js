$(document).ready(function () {
    var $messages = $('.messages-content'),
        i = 0,
        msgId = 0;

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

    // Inserts message
    function insertMessage() {
        if (msgId === 7) return;
        if (msgId !== 2 || msgId !== 3) clickedCandidate();
        if (msgId === 2 || msgId === 3) {
            msg = $('.message-input').val();
            let text = msg.charAt(0).toUpperCase() + msg.slice(1).toLowerCase();
            if ($.trim(msg) == '') {
                return false;
            }
            $('<div class="message message-personal">' + text + '</div>').appendTo($('.mCSB_container')).addClass('new');
            if(msgId === 2) responses[msgId].push(text);
            if (msgId === 3) responses[msgId].push(text);
            console.log(responses)
            $('.message-input').val(null);
            text = "";
        }
        msgId++;

        updateScrollbar();
        setTimeout(function () {
            fakeMessage();
        }, 1000 + (Math.random() * 20) * 100);
    }

    // Inserts message when choice is clicked
    function insertChoiceMade(choice) {
        if (choice == '') {
            return false;
        }
        $('<div class="message message-personal">' + choice + '</div>').appendTo($('.mCSB_container')).addClass('new');
       
        $('.message-input').val(null);
        updateScrollbar();
        setTimeout(function () {
            fakeMessage();
        }, 1000 + (Math.random() * 20) * 100);
    }

    // Inserts choice selected
    $('.message-submit').click(function () {
        if(msgId === 2 || msgId === 3 ) insertMessage(); 
    });

    // Inserts typed text
    $(window).on('keydown', function (e) {
        if (msgId === 2 || msgId === 3) {
            if (e.which == 13) {
                insertMessage();
                return false;
            }
        } else {
            e.preventDefault();
        }
    });

    // Questions with multiple choices
    let questionOneOptions = `
    <div class="options question_0_options">
        <ul>
            <li class="option" data-value="Yes">Yes</li>
        </ul>
        <ul>
            <li class="option" data-value="No">No</li>
        </ul>
    </div>`;

    let questionTwoOptions = `
    <div class="options question_1_options">
        <ul>
            <li class="option" data-value="Male">Male</li>
        </ul>
        <ul>
            <li class="option" data-value="Female">Female</li>
        </ul>
    </div>`;

    let candidatesDiv = `
    <div class="candidates question_4_options">
        <ul>
            <li class="option" data-value="Raila Odinga">Raila Odinga</li>
            <li class="option" data-value="William Ruto">William Ruto</li>
            <li class="option" data-value="Fred Matiangi">Fred Matiangi</li>
        </ul>
        <ul>
            <li class="option" data-value="Musalia Mudavadi">Musalia Mudavadi</li>
            <li class="option" data-value="Kalonzo Musyoka">Kalonzo Musyoka</li>
            <li class="option" data-value="Others">Others</li>
        </ul>
    </div>`;

    let questionSixOptions = `
    <div class="options question_5_options">
        <ul>
            <li class="option" data-value="For">For</li>
        </ul>
        <ul>
            <li class="option" data-value="Against">Against</li>
        </ul>
    </div>`;

    let questionSevenOptions = `
    <div class="options question_6_options">
        <ul>
            <li class="option" data-value="Yes">Yes</li>
        </ul>
        <ul>
            <li class="option" data-value="No">No</li>
        </ul>
    </div>`;


    let choice = '';

    function clickedCandidate() {
        // console.log(msgId)

        if (msgId === 2 || msgId === 3) return;
        if (msgId !== 2 || msgId !== 3) {
            let questionOptions = document.querySelector(`.question_${msgId}_options`);
            let options = questionOptions.querySelectorAll('.option');
            

            options.forEach((option, i) => {
                option.addEventListener('click', () => {
                    choice = options[i].getAttribute("data-value");
                    insertChoiceMade(choice);
                    questionOptions.style.display = 'none';
                    // return choice;
                    responses[msgId].push(choice);
                    console.log(responses)
                    choice = '';
                    msgId++;
                });
            });
        }
    }


    var Fake = [
        {
            question: 'Are you a youth? (Below 35yrs)',
            options: questionOneOptions,
        },
        {
            question: 'What is your gender?',
            options: questionTwoOptions
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
            options: questionSixOptions
        },
        {
            question: 'Do you support 1 man, 1 vote, 1 shilling policy?',
            options: questionSevenOptions
        }
    ];


    // Loads next question
    function fakeMessage() {
        if ($('.message-input').val() != '') {
            return false;
        }
        $('<div class="message loading new"><figure class="avatar"><img src="https://cdn.diversityavatars.com/assets/images/avatars-gallery/placeholder.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
        updateScrollbar();

        setTimeout(function () {
            $('.message.loading').remove();
            if (i === 7) {
                $('<div class="message new"><figure class="avatar"><img src="https://cdn.diversityavatars.com/assets/images/avatars-gallery/placeholder.png" /></figure>' + 'Thank you for completing the survey.' + '</div>').appendTo($('.mCSB_container')).addClass('new');
                updateScrollbar();
                document.querySelector('.message-box').style.display = 'none';
                return;
            } else {
                $('<div class="message new"><figure class="avatar"><img src="https://cdn.diversityavatars.com/assets/images/avatars-gallery/placeholder.png" /></figure>' + Fake[i].question + '<br>' + Fake[i].options + '</div>').appendTo($('.mCSB_container')).addClass('new');
                clickedCandidate();
            }
            updateScrollbar();
            i++;
        }, 1000 + (Math.random() * 20) * 100);
    }
});



