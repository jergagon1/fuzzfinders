class SocketsController < WebsocketRails::BaseController
  def amber_alert
    broadcast_message :amber_alert, message
  end
end
