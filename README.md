Node.js based runner for Django projects
========================================

Made with respect to Blade Runner (c) Philip K. Dick

This actual runner configured to run https://github.com/vsergeyev/django-visual


Idea
----

 * Electron application -> provides a Windows with IFRAME
 * Electron application spawns a Python with manage.py
 * IFRAME points to 127.0.0.1:8000 where Django application is
 * PROFIT
