/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).on("ready", function() {
  
  function renderTweets(tweets) {
    tweets.forEach(function(tweet) {
      var $tweet = createTweetElement(tweet);
      $("#tweets").append($tweet);
    });
  };

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
  
  var tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  renderTweets(tweetData);
});