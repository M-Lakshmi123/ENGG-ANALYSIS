@echo off
title Deploy Engineering Analysis
set /p msg="Enter commit message: "
if "%msg%"=="" set msg="Update Engineering Analysis"

echo.
echo === Adding files ===
git add .

echo.
echo === Committing changes ===
git commit -m "%msg%"

echo.
echo === Pushing to GitHub ===
:: Using 'main' as it is the default for this project
git push origin main

echo.
echo === Triggering Render Backend Deployment ===
:: Updated with new sync hook
curl -X POST "https://api.render.com/sync/exs-d6669drh46gs73ahgih0?key=TnaxQGSV1tE"

echo.
echo.
echo === Success! Changes pushed and Render deployment triggered. ===
pause
