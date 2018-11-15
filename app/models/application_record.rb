# frozen_string_literal: true

# Mother class of Models
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
end
