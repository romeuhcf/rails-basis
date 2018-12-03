class AddSnoozeToSensors < ActiveRecord::Migration[5.2]
  def change
    add_column :sensors, :snoozed_until, :datetime, null: true, default: nil
  end
end
