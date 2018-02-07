#!/bin/bash

# Migrate database
yarn sequelize db:migrate

exec "$@"
