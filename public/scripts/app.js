/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).on("ready", function() {
  
  function renderTweet(tweet) {
    var $tweet = createTweetElement(tweet);
    $($tweet).prependTo("#tweets");
  };

  function renderTweets(tweets) {
    tweets.forEach(renderTweet);
  };

  function loadTweets(){
    $.ajax({
      method: "GET",
      url: "/tweets",
      success: function(tweets) {
        renderTweets(tweets);
      }
    });
  };
  
  loadTweets();

  function createTweetElement(tweet) {
    var article = $('<article>').addClass('tweet');
    
    function buildHeader() {
      var avatar = tweet.user['avatars'].small;
      var handle = tweet.user['handle'];
      var name = tweet.user['name'];
      var img = $('<img>').attr("src", avatar);
      var p = $('<p>').text(name);
      var span = $('<span>').text(handle);
      var header = $('<header>').append(img).append(p).append(span);
      return header;
    };

    function buildP() {
      var text = tweet.content['text'];
      var p = $('<p>').text(text);
      return p;
    };

    function buildFooter() {
      var timeStamp = tweet.created_at;
      var dateToday = Date.now();
      var oneDay = 24*60*60*1000;
      var diffDays = Math.round(Math.abs(dateToday - timeStamp)/(oneDay)) + " days ago";
      var icons = $('<span>').addClass('icons').append('<i class="fa fa-heart" aria-hidden="true"></i>')
                  .append('<i class="fa fa-retweet" aria-hidden="true"></i>')
                  .append('<i class="fa fa-flag" aria-hidden="true"></i>');
      var dateSpan = $('<span>').text(diffDays);
      var footer = $('<footer>').append(dateSpan).append(icons);
      return footer;
    };

    var formattedTweet = article.append(buildHeader()).append(buildP()).append(buildFooter());
    return formattedTweet;
  };

  $('.new-tweet').on('submit', function() {
    event.preventDefault();
    var theForm = $(this).find('form');
    var value = $(".new-tweet textarea").val().length;
    var error = $('<div id="error">').addClass('red-text')
                .text("ERROR: MUST BE 1-140 CHARACTERS IN LENGTH!!!");
    if (value < 1 || value > 140) {
        if (!$('.new-tweet div').text()) {
          $('.new-tweet').append(error);
          return;
        };
    } else {
      if ($('.new-tweet div').text()) {
        $('.new-tweet div').remove();
      };
      $.ajax({
        method: theForm.attr('method'),
        url: theForm.attr('action'),
        data: theForm.serialize()
      }).done(function(tweet) {
        $('.new-tweet textarea').val("").focus();
        $('.counter').text('140');
        renderTweet(tweet);
      });
    };
  });
  $('#compose-button').on("click", function() {
    $('.new-tweet').slideToggle("slow");
    $('.new-tweet textarea').focus();
  });
});