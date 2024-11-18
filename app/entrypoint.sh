#!/bin/bash

npx webpack --config webpack.config.js
npx tailwindcss -i ./frontend/static/main.css -o ./frontend/static/tailwind.css --minify

python manage.py migrate

exec "$@"