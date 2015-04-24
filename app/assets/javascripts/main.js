var lastMessage = "";
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

this.ChatApp = (function() {
  ChatApp.prototype.messageTemplate = function(message) {
    return "<span>\n    <label class='label label-info chatter'>\n      [" + message.user + "]\n    </label> " + message.text + "\n  </span>\n <br>";
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
    // $('#send_message').click(this.sendMessage);
    $('#fucking-message').on('submit', this.sendMessage)
  };

  ChatApp.prototype.setUserInfo = function(userInfo) {
    return this.username = userInfo.user;
  };

  ChatApp.prototype.receiveGlobalMessage = function(message) {
    if ((lastMessage != message.text || lastMessage === "") && message.text != '' ) {
      lastMessage = message.text
      return $('#chat_history').append(this.messageTemplate(message)).scrollTop(10000);
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


