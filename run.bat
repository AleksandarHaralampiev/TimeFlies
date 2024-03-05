@ECHO OFF

start cmd /c "cd ./backend & python manage.py migrate & python manage.py runserver"

cd ./frontend
npm run dev