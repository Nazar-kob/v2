#!/bin/bash

yarn webpack --config webpack.config.js --no-cache
yarn tailwindcss -i ./frontend/static/main.css -o ./frontend/static/tailwind.css --minify

python manage.py migrate

exec "$@"