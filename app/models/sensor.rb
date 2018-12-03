# Sensor represents a point of monitoration
class Sensor < ApplicationRecord
  after_create_commit -> { SensorsChannel.broadcast('onSensorCreated', self) }
  after_update_commit -> { SensorsChannel.broadcast('onSensorUpdated', self) }
  after_destroy -> { SensorsChannel.broadcast('onSensorDestroyed', self) }

  validates :key, presence: true, uniqueness: true
  validates :source, presence: true
  validates :title, presence: true
  validates :status, inclusion: { in: %w{success warning critical unknown} }

  serialize :details

  def self.receive(params)
    source, title = params.fetch(:source), params.fetch(:title)
    key = calculate_key(source, title)
    find_or_initialize_by(key: key).tap do |sensor|
      sensor.update!(details: params[:details],
                      value: params[:value],
                      status: params[:status],
                      ephemeral: params[:ephemeral],
                      source: source,
                      title: title)
    end
  end

  def snooze(minutes = 10)
    self.update!(snoozed_until: Time.now + minutes.minutes)
  end

  require 'digest'
  def self.calculate_key(source, title)
    Digest::SHA2.hexdigest [source, title].join('|')
  end
end
