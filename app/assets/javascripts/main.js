var lastMessage = "";
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

this.ChatApp = (function() {
  ChatApp.prototype.messageTemplate = function(message) {
    return "<div>\n  <span>\n    <label class='label label-info'>\n      [" + message.user + "]\n    </label> " + message.text + "\n  </span>\n</div>";
  };

  function ChatApp(_at_currentChannel, _at_username) {
    this.currentChannel = _at_currentChannel != null ? _at_currentChannel : void 0;
    this.username = _at_username != null ? _at_username : void 0;
    this.sendMessage = __bind(this.sendMessage, this);
    this.receiveGlobalMessage = __bind(this.receiveGlobalMessage, this);
    this.setUserInfo = __bind(this.setUserInfo, this);
    this.dispatcher = new WebSocketRails(window.location.host + "/websocket");
    this.bindEvents();
  }

  ChatApp.prototype.bindEvents = function() {
    this.dispatcher.bind('user_info', this.setUserInfo);
    this.dispatcher.bind('new_message', this.receiveGlobalMessage);
    $('#send_message').click(this.sendMessage);
  };

  ChatApp.prototype.setUserInfo = function(userInfo) {
    return this.username = userInfo.user;
  };

  ChatApp.prototype.receiveGlobalMessage = function(message) {
    if ((lastMessage != message.text || lastMessage === "") && message.text != '' ) {
      lastMessage = message.text
      return $('#chat_history').append(this.messageTemplate(message));
    }
  };

  ChatApp.prototype.sendMessage = function(e) {
    var message;
    e.preventDefault();
    message = $('#new_message').val();
    $('#new_message').val('');
    this.dispatcher.trigger('new_message', {
      text: message,
      username: this.username
    });
  };

  return ChatApp;

})();

$(document).ready(function() {

  return window.chatApp = new ChatApp;
});


// var listen,
//   __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

// listen = function(el, event, handler) {
//   if (el.addEventListener) {
//     return el.addEventListener(event, handler);
//   } else {
//     return el.attachEvent('on' + event, function() {
//       return handler.call(el);
//     });
//   }
// };

// this.Lost = (function() {
//   Lost.prototype.messageTemplate = function(message, channelName) {
//     if (channelName == null) {
//       channelName = 'broadcast';
//     }
//     return "<div>\n  <span>\n    <label class='label label-" + (channelName === 'broadcast' ? 'warning' : 'info') + "'>\n      [" + channelName + "]\n    </label> " + message + "\n  </span>\n</div>";
//   };

//   Lost.prototype.joinTemplate = function(channelName) {
//     return "<div>\n  <span>\n    <label class='label label-'>\n      [Joined Channel]\n    </label> " + channelName + "\n  </span>\n</div>";
//   };

//   function Lost(_at_currentChannel, _at_username) {
//     this.currentChannel = _at_currentChannel != null ? _at_currentChannel : void 0;
//     this.username = _at_username != null ? _at_username : void 0;
//     this.joinChannel = __bind(this.joinChannel, this);
//     this.sendMessage = __bind(this.sendMessage, this);
//     this.receiveMessage = __bind(this.receiveMessage, this);
//     this.receiveGlobalMessage = __bind(this.receiveGlobalMessage, this);
//     this.setUserInfo = __bind(this.setUserInfo, this);
//     this.dispatcher = new WebSocketRails(window.location.host + "/websocket");
//     this.bindEvents();
//   }

//   Lost.prototype.bindEvents = function() {
//     this.dispatcher.bind('user_info', this.setUserInfo);
//     this.dispatcher.bind('new_message', this.receiveGlobalMessage);
//     $('#send_message').click(this.sendMessage);
//     return $('.join_chan').click(this.joinChannel);
//   };

//   Lost.prototype.setUserInfo = function(userInfo) {
//     return this.username = userInfo.user;
//   };

//   Lost.prototype.receiveGlobalMessage = function(message) {
//     return $('#chat_history').append(this.messageTemplate(message.text));
//   };

//   Lost.prototype.receiveMessage = function(message) {
//     return $('#chat_history').append(this.messageTemplate(message.text, this.currentChannel.name));
//   };

//   Lost.prototype.sendMessage = function(e) {
//     var message;
//     e.preventDefault();
//     message = $('#new_message').val();
//     if (this.currentChannel != null) {
//       this.currentChannel.trigger('new_message', {
//         text: message,
//         username: this.username
//       });
//     } else {
//       this.dispatcher.trigger('new_message', {
//         text: message,
//         username: this.username
//       });
//     }
//     return $('#new_message').val('');
//   };

//   Lost.prototype.joinChannel = function(e) {
//     var channelName;
//     e.preventDefault();
//     if (this.currentChannel != null) {
//       this.currentChannel.trigger('user_disconnected', {
//         username: this.username
//       });
//       this.dispatcher.unsubscribe(this.currentChannel.name);
//       return this.currentChannel = void 0;
//     } else {
//       channelName = $(e.target).html();
//       this.currentChannel = this.dispatcher.subscribe(channelName);
//       this.currentChannel.bind('new_message', this.receiveMessage);
//       $('#chat_history').append(this.joinTemplate(channelName));
//       return this.currentChannel.bind('user_disconnected', (function(_this) {
//         return function(data) {
//           return $("#chat_history").append(_this.messageTemplate(" User " + data.username + " disconnected", _this.currentChannel.name));
//         };
//       })(this));
//     }
//   };

//   return Lost;

// })();

// $(document).ready(function() {
//   return window.lost = new Lost;
// });


// $(function() {
//   // Here we instantiate a new WebSocketRails instance
//   dispatcher = new WebSocketRails($('#echo').data('uri'), true)
//   // We send the message when we push the 'send' button
//   document.querySelector('button#fire').onclick = function() {
//     send(document.querySelector('#send').value);
//     document.querySelector('#send').value = '';
//   };
//   // We bind the incoming message event
//   dispatcher.bind('new_message',
//     function(message) {
//       document.querySelector('#messages').innerHTML += '<li>' + message + '</li>';
//     })
// });
// // Here we send the message in the websocket
// function send(message) {
//   dispatcher.trigger('new_message', message);
// }