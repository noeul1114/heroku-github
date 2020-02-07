web: gunicorn GlobalStock.wsgi --log-file -
release: python manage.py migrate --database=gabia_remote
release: python manage.py loaddata db_edit.json