@echo off
title Engineering Analysis - Full Deploy
set /p msg="Enter commit message: "
if "%msg%"=="" set msg="Update Engineering Analysis"

echo.
echo === [1/4] Adding and Committing changes ===
git add .
git commit -m "%msg%"

echo.
echo === [2/4] Pushing to GitHub ===
git push origin main

echo.
echo === [3/4] Building and Deploying Frontend to Firebase ===
cd client
:: Use 'call' so the script doesn't exit after npm/firebase
call npm run build
call firebase deploy --only hosting
cd ..

echo.
echo === [4/4] Triggering Render Backend Deployment ===
curl -X POST "https://api.render.com/sync/exs-d6669drh46gs73ahgih0?key=TnaxQGSV1tE"

echo.
echo.
echo ======================================================
echo    SUCCESS! Backend and Frontend are both deploying.
echo ======================================================
pause
