
let options = {
  banner_name      : 'Online Survey-Kenya 320x480',
  format             : 'Ad Survey',
  default_click_url  : '', //Put the Landing Page
  click_selectors    : [ ],
  hover_selectors    : [ '.survey-main' ],
  hover_seconds      : 5,
};

let campaign_id = null, creative_id = null ,site_domain = '' ,click_url = '' ,unique_id = '';

// Add Click and Hover tracking events to all selectors that match.
options.click_selectors.forEach(el => {
  document.querySelector(el).addEventListener('click', handleClickEvent, false);
});

options.hover_selectors.forEach(el => {
  document.querySelector(el).addEventListener('mouseover', handleHoverEvent, false);
  document.querySelector(el).addEventListener('mouseout', handleHoverOutEvent, false);
})


//Generate UUID string, to uniquely identify this impression.
unique_id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);return v.toString(16);});

//==========================================================================================================================
// Get Query Params, in case they are not being passed via DSP Iframe testing.
function hasQueryString(){
    return (location.search && location.search != undefined) ? true : false;
}

if(hasQueryString()){
  const queryString = window.location.search;
  var searchParams = new URLSearchParams(queryString);
  campaign_id = searchParams.getAll("campaign_id") ;
  campaign_id = campaign_id[0] || null;
  creative_id = searchParams.getAll("creative_id") || null;
  creative_id = creative_id[0] || null;
  site_domain = searchParams.getAll("site_domain");
  site_domain = site_domain[0] || ((window.location != window.parent.location) ? document.referrer : document.location.href);
  click_url = searchParams.getAll("click_url");
  click_url = click_url[0];
  if(click_url == '' || click_url == null){
    click_url = options.default_click_url;
  }
} else {
   window.addEventListener("message", function(msg) {
    campaign_id = msg.data.campaign_id || null;
    creative_id = msg.data.creative_id || null;
    site_domain = msg.data.site_domain || ((window.location != window.parent.location) ? document.referrer : document.location.href);
    site_domain = decodeURIComponent(site_domain);
    click_url   = msg.data.click_url;
    if(click_url == '' || click_url == null){
      click_url = options.default_click_url;
    }
  }, false);
}
//====================================================================================


function handleClickEvent(){
    sendBannerEngagementEvent('click');
    window.open(click_url, '_blank');
}


//Engagement Tracking
let hoverEventStarted = false;
var sec = options.hover_seconds;
var timer = null;
let hoverTracked = false; 
function timerFunction(){
  if(hoverEventStarted){
      console.log(`${sec} seconds`)
      sec--;
      if (sec < 1) {
          console.log('Sending Banner Engagement');
          sendBannerEngagementEvent('hovered_5_seconds');
          resetTimer();
          hoverTracked = true;
      }
    } 
}

function resetTimer(){
  clearInterval(timer);
  sec = options.hover_seconds;
  console.log('Resetting Timer');
}

function handleHoverEvent(){
  if(!hoverTracked){
    if(!hoverEventStarted){
      hoverEventStarted = true;
      timer = setInterval(timerFunction, 1000);
    }
  }
}

function handleHoverOutEvent(){
  // hoverEventStarted = false;
  // resetTimer();
}

//============================================
function sendBannerEngagementEvent(event){
  console.log('Creating engagement event ' + event);

  let data = {
      "banner_id": creative_id,
      "banner_name": options.banner_name,
      "format": options.format,
      "unique_id": unique_id,
      "event": event,
      "site_domain": site_domain
  };

  console.log(data);

    (async () => {
    const rawResponse = await fetch('https://dxp.mediapal.net/api/banner_engagements/create', {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(data)
	  });
	  const content = await rawResponse.json();

	  console.log(content);
	})();
  }