# API controller to Sensor resources
class SensorsController < ApplicationController
  def index
    sensors = Sensor.all
    render json: sensors
  end

  def create
    Sensor.receive(permitted_params)
  end

  def snooze
    Sensor.find(params[:id]).snooze
  end

  protected
    def permitted_params
      params.require(:sensor)
        .permit(:source, :title, :value, :tags, :message,
                :ephemeral, :status, details: {})
    end
end
