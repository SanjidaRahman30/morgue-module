@echo off
:: Self-elevation to Run as Administrator
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo Requesting Administrator privileges to open Port 1999...
    powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

echo ========================================================
echo Adding Inbound Firewall Rule for Port 1999...
echo ========================================================

netsh advfirewall firewall add rule name="KYAMCH Morgue Module (Port 1999)" dir=in action=allow protocol=TCP localport=1999

echo.
echo ========================================================
echo [SUCCESS] Windows Firewall rule added!
echo Other PCs can now access:
echo http://192.168.100.131:1999/en/morgue
echo ========================================================
echo.
pause

