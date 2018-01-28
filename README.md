# lynlab-datasource
## Setup
```
# Install all prerequisites
yarn

# Set database configuration
cp config/config.json.example config/config.json
vi config/config.json

# Migrate database
yarn sequelize db:migrate
```

## Test
```
# Lint code (generated stuffs will be ignored)
yarn eslint .
```

## Run
```
# Server runs, listening 8080 port
yarn start
```
