#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
BUILD_ROOT="$(cd "${REPO_ROOT}/.." && pwd)/build"
TARGET_DIR="${BUILD_ROOT}/$(date +%m%d%Y%H%M%S)"
ENV_FILE_REL="apps/container-management/src/environments/environment.prod.ts"

log() {
  printf '\n[%s] %s\n' "$1" "$2"
}

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing command: $1"
    exit 1
  fi
}

escape_sed_replacement() {
  printf '%s' "$1" | sed -e 's/[\\&|]/\\&/g'
}

prompt_inputs() {
  read -r -p "Server IP (example: 192.0.0.1): " IP
  read -r -p "Server port (example: 3000): " PORT
  read -r -p "Expired date YYYY-MM-DD (example: 2030-01-01): " EXPIRED_DATE
  read -r -p "Serial ID: " SERIAL_ID
  read -r -p "Use native phone camera (yes/no): " USE_NATIVE_CAMERA
}

copy_source() {
  log "BUILD" "Copying source to ${TARGET_DIR}"
  mkdir -p "${TARGET_DIR}"

  rsync -a --delete \
    --exclude node_modules \
    --exclude .git \
    --exclude build \
    "${REPO_ROOT}/" "${TARGET_DIR}/"
}

replace_environment_values() {
  local env_file="${TARGET_DIR}/${ENV_FILE_REL}"
  log "BUILD" "Applying runtime values in ${ENV_FILE_REL}"

  if [[ ! -f "${env_file}" ]]; then
    echo "Environment file not found: ${env_file}"
    exit 1
  fi

  local ip_esc port_esc exp_esc serial_esc camera_esc
  ip_esc="$(escape_sed_replacement "${IP}")"
  port_esc="$(escape_sed_replacement "${PORT}")"
  exp_esc="$(escape_sed_replacement "${EXPIRED_DATE}")"
  serial_esc="$(escape_sed_replacement "${SERIAL_ID}")"
  camera_esc="$(escape_sed_replacement "${USE_NATIVE_CAMERA}")"

  sed -i "s|\\$IP|${ip_esc}|g" "${env_file}"
  sed -i "s|\\$PORT|${port_esc}|g" "${env_file}"
  sed -i "s|\\$EXPIRED_DATE|${exp_esc}|g" "${env_file}"
  sed -i "s|\\$SERIAL_ID|${serial_esc}|g" "${env_file}"
  sed -i "s|\\$USE_NATIVE_CAMERA|${camera_esc}|g" "${env_file}"
}

build_web() {
  log "BUILD" "Installing dependencies and building web"
  cd "${TARGET_DIR}"
  pnpm install
  pnpm run build:web
}

cleanup_output() {
  log "BUILD" "Removing source-only folders from package"
  cd "${TARGET_DIR}"
  rm -rf libs apps/container-management node_modules
}

main() {
  require_cmd rsync
  require_cmd sed
  require_cmd pnpm

  prompt_inputs
  copy_source
  replace_environment_values
  build_web
  cleanup_output

  log "DONE" "Build package generated at: ${TARGET_DIR}"
}

main "$@"
