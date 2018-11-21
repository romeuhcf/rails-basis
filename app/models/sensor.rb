# Sensor represents a point of monitoration
class Sensor < ApplicationRecord
  after_create_commit -> { SensorsChannel.broadcast('onSensorCreated', self) }
  after_update_commit -> { SensorsChannel.broadcast('onSensorUpdated', self) }
  after_destroy -> { SensorsChannel.broadcast('onSensorDestroyed', self) }
end
