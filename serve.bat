@echo off
echo Starting Zenve CRM Hub Server on http://localhost:3000 ...
python -m http.server 3000 --directory "%~dp0"
pause

