# frozen_string_literal: true

# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically
# be available to Rake.

require_relative 'config/application'

Rails.application.load_tasks

desc "Runs JEST js test suite"
task "jest" do
  system "yarn test 2>&1"
  exit $?.success? ? 0 : 1
end
