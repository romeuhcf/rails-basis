class AddMessageToSensors < ActiveRecord::Migration[5.2]
  def change
    add_column :sensors, :message, :string
  end
end
