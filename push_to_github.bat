@echo off
cd /d "%~dp0"
echo ========================================================
echo   Push KYAMCH Morgue Module to GitHub (SanjidaRahman30)
echo ========================================================
echo.
echo Make sure you have created the empty repository on GitHub first:
echo https://github.com/new
echo.
set /p REPO_NAME="Enter your GitHub repository name [default: morgue-module]: "
if "%REPO_NAME%"=="" set REPO_NAME=morgue-module

git remote remove origin 2>nul
git remote add origin https://github.com/SanjidaRahman30/%REPO_NAME%.git

echo.
echo Setting branch to main and pushing...
git branch -M main
git push -u origin main

echo.
echo ========================================================
echo If prompted, sign in with your GitHub browser window or Personal Access Token.
echo ========================================================
pause
