#!/bin/sh

set -e
echo "ENVIRONMENT: $RAILS_ENV"

# remove any existing pid file
rm -f $APP_PATH/tmp/pids/server.pid

# append bundle exec to every command
bundle exec ${@}