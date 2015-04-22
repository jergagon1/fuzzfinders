class SocketsController < WebsocketRails::BaseController
  def amber_alert
    p message
    broadcast_message :amber_alert, message
  end
end
