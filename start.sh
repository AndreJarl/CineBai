#!/usr/bin/env bash
# Start CineBai locally: backend (nodemon, port 8080) + frontend (Vite, port 5173).
# Usage: ./start.sh   — press Ctrl+C to stop both.

cd "$(dirname "$0")" || exit 1

# Install dependencies on first run
[ -d node_modules ] || npm install
[ -d frontend/node_modules ] || npm install --prefix frontend

pids=()

# Stop both servers (and their child node processes) when the script exits
cleanup() {
  echo
  echo "Stopping CineBai..."
  for pid in "${pids[@]}"; do
    if [ -r "/proc/$pid/winpid" ] && command -v taskkill >/dev/null; then
      taskkill //F //T //PID "$(cat "/proc/$pid/winpid")" >/dev/null 2>&1   # Windows (Git Bash)
    else
      pkill -P "$pid" 2>/dev/null; kill "$pid" 2>/dev/null                 # macOS / Linux
    fi
  done
}
trap cleanup EXIT INT TERM

echo "Starting backend  -> http://localhost:8080"
npm run dev &
pids+=($!)

echo "Starting frontend -> http://localhost:5173"
npm run dev --prefix frontend &
pids+=($!)

wait
