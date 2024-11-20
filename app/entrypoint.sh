#!/bin/bash

npx webpack --config webpack.config.js --no-cache
npx tailwindcss -i ./frontend/static/main.css -o ./frontend/static/tailwind.css --minify

python manage.py migrate

exec "$@"