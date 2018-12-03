class AddFieldsToSensors < ActiveRecord::Migration[5.2]
  def change
    add_column :sensors, :key, :string, index: true, unique: true
    add_column :sensors, :source, :string
    add_column :sensors, :value, :float, null: true
    add_column :sensors, :status, :string, null: true
    add_column :sensors, :ephemeral, :boolean, index: true, default: false
    add_column :sensors, :details, :text
  end
end
