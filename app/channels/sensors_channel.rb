# SensorsChannel sends messages to frontend when
# a sensor changes
class SensorsChannel < ApplicationCable::Channel
  def subscribed
    stream_from self.class.name
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def self.broadcast(event_name, sensor)
    ActionCable.server.broadcast self.name, event: event_name, sensor: JSON.parse(sensor.to_json)
  end
end
