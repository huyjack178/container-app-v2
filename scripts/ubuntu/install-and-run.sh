#!/usr/bin/env bash

set -euo pipefail

NODE_VERSION="18.20.8"
NODE_DISTRO="node-v${NODE_VERSION}-linux-x64"
NODE_ARCHIVE="${NODE_DISTRO}.tar.xz"
NODE_URL="https://nodejs.org/dist/v${NODE_VERSION}/${NODE_ARCHIVE}"
INSTALL_DIR="/usr/local/lib/nodejs"
APP_NAME="server3000"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

log() {
  printf '\n[%s] %s\n' "$1" "$2"
}

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing command: $1"
    exit 1
  fi
}

node_matches_required_version() {
  if command -v node >/dev/null 2>&1; then
    local current
    current="$(node -v || true)"
    [[ "$current" == "v${NODE_VERSION}" ]]
    return
  fi
  return 1
}

install_node() {
  log "SETUP" "Installing Node.js v${NODE_VERSION}"

  sudo mkdir -p "${INSTALL_DIR}"
  cd /tmp

  require_cmd curl
  require_cmd tar

  curl -fsSLO "${NODE_URL}"
  sudo rm -rf "${INSTALL_DIR}/${NODE_DISTRO}"
  sudo tar -xJf "${NODE_ARCHIVE}" -C "${INSTALL_DIR}"
  rm -f "${NODE_ARCHIVE}"

  sudo ln -sf "${INSTALL_DIR}/${NODE_DISTRO}/bin/node" /usr/local/bin/node
  sudo ln -sf "${INSTALL_DIR}/${NODE_DISTRO}/bin/npm" /usr/local/bin/npm
  sudo ln -sf "${INSTALL_DIR}/${NODE_DISTRO}/bin/npx" /usr/local/bin/npx
  sudo ln -sf "${INSTALL_DIR}/${NODE_DISTRO}/bin/corepack" /usr/local/bin/corepack
}

ensure_base_packages() {
  log "SETUP" "Installing base packages"
  sudo apt-get update
  sudo apt-get install -y curl xz-utils build-essential
}

ensure_global_tools() {
  log "SETUP" "Installing global tools (pm2) and enabling pnpm"

  sudo npm install -g pm2
  sudo corepack enable
  sudo corepack prepare pnpm@latest --activate
}

install_dependencies() {
  log "NPM" "Installing production dependencies"
  cd "${REPO_ROOT}"
  pnpm install --prod --frozen-lockfile
}

start_server() {
  log "PM2" "Starting API server with pm2"
  cd "${REPO_ROOT}"

  if pm2 describe "${APP_NAME}" >/dev/null 2>&1; then
    pm2 restart "${APP_NAME}"
  else
    pm2 start ./apps/api/src/server.js --name "${APP_NAME}"
  fi

  pm2 save

  log "PM2" "To auto-start on reboot, run the command below once:"
  pm2 startup systemd -u "$USER" --hp "$HOME" || true
}

main() {
  ensure_base_packages

  if node_matches_required_version; then
    log "NODE" "Node.js v${NODE_VERSION} already installed"
  else
    install_node
  fi

  log "NODE" "Current version: $(node -v)"
  log "NPM" "Current version: $(npm -v)"

  ensure_global_tools
  install_dependencies
  start_server

  log "DONE" "Ubuntu installation and app startup complete"
}

main "$@"
