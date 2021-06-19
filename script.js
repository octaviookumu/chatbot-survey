$(document).ready(function () {
    var $messages = $('.messages-content');
    
    let i = 0;
    let msgId = 0;

    //Array to hold the responses
    let responses = [
        [], [], [], [], [], [], [], []
    ];

    let question_options = [
        {
            question: "Are You A Youth? (Below 35 Years)",
            question_number: 1,
            options: ["Yes", "No"],
        },
        {
            question: "What is your gender?",
            question_number: 2,
            options: ["Male", "Female"],
        },
        {
            question: "Which county are you from?",
            question_number: 3,
            options: "",
        },
        {
            question: "Which candidate would you want to vie? (Enter answer below)",
            question_number: 4,
            options: "",
        },
        {
            question: "If elections were held today, which candidate would you want to vie?",
            question_number: 5,
            options: ["Raila Odinga", "William Ruto", "Fred Matiangi", "Musalia Mudavadi", "Kalonzo Musyoka", "Others"]
        },
        {
            question: "If a referendum on the constitutional changes proposed in the BBI was held today, would you vote for or against the changes?",
            question_number: 6,
            options: ["For", "Against"]
        },
        {
            question: "Do you support one man, one vote, one shilling policy?",
            question_number: 7,
            options: ["Yes", "No"]
        },
        {
            question: "Enter your email below to receive your results, or press skip to finish survey.",
            question_number: 8,
            options: ""
        }
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
        if (msgId === 8) return;
        if (msgId !== 3 || msgId !== 7) clickedChoice();
        if (msgId === 3 || msgId === 7) {
            msg = $('.message-input').val();
            let text = msg.charAt(0).toUpperCase() + msg.slice(1).toLowerCase();
            if ($.trim(msg) == '') {
                return false;
            }
            if (msgId === 3) {
                $('<div class="message message-personal">' + text + '</div>').appendTo($('.mCSB_container')).addClass('new');
                responses[msgId].push(text);
            }
            if (msgId === 7) {
                document.querySelector(`.question_${msgId}_options`).style.display = 'none';
                $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                responses[msgId].push(msg);
            }
            sendAdSurveyResponse(msgId + 1, text);
            sendBannerEngagementEvent(`question_${msgId + 1}_input_entered`);
            $('.message-input').val(null);
            text = "";
            msgId++;
        }

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
        if (msgId === 3 || msgId === 7) insertMessage();
    });

    // Inserts typed text
    $(window).on('keydown', function (e) {
        if (msgId === 3 || msgId === 7) {
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

    let questionThreeOptions = `
    <div class="options question_2_options">
        <div class="counties">
        <select id="county-selected">
            <option selected="selected" value="">Select county</option>
            <option value="baringo">Baringo</option>
            <option value="bomet">Bomet</option>
            <option value="bungoma">Bungoma</option>
            <option value="busia">Busia</option>
            <option value="elgeyo marakwet">Elgeyo Marakwet</option>
            <option value="embu">Embu</option>
            <option value="garissa">Garissa</option>
            <option value="homa bay">Homa Bay</option>
            <option value="isiolo">Isiolo</option>
            <option value="kajiado">Kajiado</option>
            <option value="kakamega">Kakamega</option>
            <option value="kericho">Kericho</option>
            <option value="kiambu">Kiambu</option>
            <option value="kilifi">Kilifi</option>
            <option value="kirinyaga">Kirinyaga</option>
            <option value="kisii">Kisii</option>
            <option value="kisumu">Kisumu</option>
            <option value="kitui">Kitui</option>
            <option value="kwale">Kwale</option>
            <option value="laikipia">Laikipia</option>
            <option value="lamu">Lamu</option>
            <option value="machakos">Machakos</option>
            <option value="makueni">Makueni</option>
            <option value="mandera">Mandera</option>
            <option value="meru">Meru</option>
            <option value="migori">Migori</option>
            <option value="marsabit">Marsabit</option>
            <option value="mombasa">Mombasa</option>
            <option value="muranga">Muranga</option>
            <option value="nairobi">Nairobi</option>
            <option value="nakuru">Nakuru</option>
            <option value="nandi">Nandi</option>
            <option value="narok">Narok</option>
            <option value="nyamira">Nyamira</option>
            <option value="nyandarua">Nyandarua</option>
            <option value="nyeri">Nyeri</option>
            <option value="samburu">Samburu</option>
            <option value="siaya">Siaya</option>
            <option value="taita taveta">Taita Taveta</option>
            <option value="tana river">Tana River</option>
            <option value="tharaka nithi">Tharaka Nithi</option>
            <option value="trans nzoia">Trans Nzoia</option>
            <option value="turkana">Turkana</option>
            <option value="uasin gishu">Uasin Gishu</option>
            <option value="vihiga">Vihiga</option>
            <option value="wajir">Wajir</option>
            <option value="pokot">West Pokot</option>
        </select>
        </div>
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

    let questionEightOptions = `
    <div class="options question_7_options">
        <ul>
            <li class="option skip" data-value="Skip">Skip</li>
        </ul>
    </div>`;

    let choice = '';

    function clickedChoice() {
        if (msgId === 3 || msgId === 8) return;
        if (msgId === 7) {
            let questionOptionsDiv = document.querySelector(`.question_${msgId}_options`);
            let skipBtn = questionOptionsDiv.querySelector('.skip');

            skipBtn.addEventListener('click', () => {
                let choice = skipBtn.getAttribute("data-value");
                insertChoiceMade(choice);
                responses[msgId].push(choice);
                questionOptionsDiv.style.display = 'none';
                sendAdSurveyResponse(msgId + 1, choice);
                sendBannerEngagementEvent(`question_${msgId + 1}_option_${choice}_selected`);
                choice = '';
                msgId++;
                return;
            });
        }
        if (msgId === 2) {
            document.querySelector('#county-selected').addEventListener('change', (e) => {
                let county = e.target.value;
                let county_selected = county.charAt(0).toUpperCase() + county.slice(1).toLowerCase();
                insertChoiceMade(county_selected);
                responses[2].push(county_selected);
                document.querySelector('.question_2_options').style.display = 'none';
                sendAdSurveyResponse(msgId + 1, county_selected);
                sendBannerEngagementEvent(`question_${msgId + 1}_option_${county}_selected`);
                msgId++;
                return;
            });
        }
        if (msgId === 0 ||msgId === 1 ||msgId === 4 ||msgId === 5 ||msgId === 6) {
            let questionOptionsDiv = document.querySelector(`.question_${msgId}_options`);
            let options = questionOptionsDiv.querySelectorAll('.option');

            options.forEach((option, i) => {
                option.addEventListener('click', () => {
                    choice = options[i].getAttribute("data-value");
                    let first_word = choice.split(" ")[0];
                    insertChoiceMade(choice);
                    questionOptionsDiv.style.display = 'none';
                    responses[msgId].push(choice);
                    sendAdSurveyResponse(msgId + 1, choice);
                    sendBannerEngagementEvent(`question_${msgId + 1}_option_${first_word}_selected`);
                    choice = '';
                    msgId++;
                    return;
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
            question: 'Which county are you from?',
            options: questionThreeOptions
        },
        {
            question: 'Who would you like to see vying for the next Presidential Elections? (Enter answer below)',
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
        },
        {
            question: 'Enter your email below to receive your results, or press skip to finish survey.',
            options: questionEightOptions
        },
    ];


    // Loads next question
    function fakeMessage() {
        if ($('.message-input').val() != '') {
            return false;
        }
        $('<div class="message loading new"><figure class="avatar"><img src="images/chatbot-avatar.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
        updateScrollbar();

        setTimeout(function () {
            $('.message.loading').remove();
            if (i === 8) {
                $('<div class="message new"><figure class="avatar"><img src="images/chatbot-avatar.png" /></figure>' + 'Thank you for completing the survey.' + '</div>').appendTo($('.mCSB_container')).addClass('new');
                updateScrollbar();
                // document.querySelector('.message-box').style.display = 'none';
                console.log(responses)
                return;
            } else {
                $('<div class="message new"><figure class="avatar"><img src="images/chatbot-avatar.png" /></figure>' + Fake[i].question + '<br>' + Fake[i].options + '</div>').appendTo($('.mCSB_container')).addClass('new');
                clickedChoice();
                updateScrollbar();
                i++;
            }

        }, 1000 + (Math.random() * 20) * 100);
    }




    function sendAdSurveyResponse(question_number, response) {
        //  console.log(unique_id);

        let data = {
            "banner_id": creative_id,
            "banner_name": options.banner_name,
            "impression_unique_id": unique_id,
            ...question_options[question_number - 1],
            response: [response]
        };

        //   console.log(data);

        (async () => {
            const rawResponse = await fetch('https://dxp.mediapal.net/api/leadgen/adsurvey/create/1234567890', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            //   const content = await rawResponse.json();

            //   console.log(content);
        })();
    }
});



