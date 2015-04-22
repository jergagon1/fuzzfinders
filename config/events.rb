WebsocketRails::EventMap.describe do
  # You can use this file to map incoming events to controller actions.
  # One event can be mapped to any number of controller actions. The
  # actions will be executed in the order they were subscribed.
  #
  # Uncomment and edit the next line to handle the client connected event:
<<<<<<< HEAD
  #   subscribe :client_connected, :to => Controller, :with_method => :method_name
=======
  #   subscribe :client_connected, :to => SocketsController, :with_method => :client_connected
>>>>>>> c15b25ea638201bb99de6b99fbbf98ff051d2ef4
  #
  # Here is an example of mapping namespaced events:
  #   namespace :product do
  #     subscribe :new, :to => ProductController, :with_method => :new_product
  #   end
  # The above will handle an event triggered on the client like `product.new`.
<<<<<<< HEAD
  subscribe :client_connected, :to => ChatController, :with_method => :user_connected
  subscribe :new_message, :to => ChatController, :with_method => :incoming_message
  subscribe :set_name, :to => ChatController, :with_method => :set_name
=======
  subscribe :amber_alert, to: SocketsController, with_method: :amber_alert
  # subscribe :amber_alert, to: ChatController, with_method: :amber_alert
>>>>>>> c15b25ea638201bb99de6b99fbbf98ff051d2ef4
end
