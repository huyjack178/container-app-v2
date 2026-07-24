# Hướng Dẫn Cài Đặt Ubuntu

Dự án này hiện có script PowerShell cho Windows.
Tài liệu này bổ sung quy trình cho Ubuntu bằng các shell script tương đương.

## 1. Các File Đã Thêm

- `scripts/ubuntu/install-and-run.sh`: cài công cụ runtime và khởi động API bằng pm2.
- `scripts/ubuntu/build-package.sh`: build gói triển khai (tương đương `build.ps1`).

## 2. Chạy Nhanh (Ubuntu)

Chạy từ thư mục gốc của repository:

```bash
chmod +x scripts/ubuntu/install-and-run.sh scripts/ubuntu/build-package.sh
./scripts/ubuntu/install-and-run.sh
```

Script này sẽ:

1. Cài các gói hệ thống cơ bản (`curl`, `xz-utils`, `build-essential`).
2. Cài Node.js `v18.20.8`.
3. Cài `pm2` ở phạm vi global.
4. Bật `pnpm` thông qua `corepack`.
5. Chạy `pnpm install --prod --frozen-lockfile`.
6. Khởi động `apps/api/src/server.js` bằng pm2 với tên `server3000`.
7. Lưu danh sách process của pm2.

## 3. Build Gói Triển Khai (Ubuntu)

```bash
./scripts/ubuntu/build-package.sh
```

Script sẽ hỏi các thông tin:

- Server IP
- Server port
- Ngày hết hạn (`YYYY-MM-DD`)
- Serial ID
- Chế độ camera native (`yes` hoặc `no`)

Sau đó script sẽ:

1. Copy source vào `../build/<timestamp>`.
2. Thay placeholder trong `apps/container-management/src/environments/environment.prod.ts`.
3. Chạy `pnpm install` và `pnpm run build:web`.
4. Xóa `libs`, `apps/container-management` và `node_modules` khỏi output.

## 4. Các Lệnh PM2

Các lệnh thường dùng:

```bash
pm2 list
pm2 logs server3000
pm2 restart server3000
pm2 stop server3000
pm2 delete server3000
```

Bật tự khởi động sau khi reboot (chạy 1 lần nếu cần):

```bash
pm2 startup systemd -u "$USER" --hp "$HOME"
pm2 save
```

Nếu `pm2 startup` in ra thêm một lệnh `sudo`, hãy chạy chính xác lệnh đó một lần.

## 5. Lưu Ý

- Các script này dùng `sudo` để cài đặt ở mức hệ thống.
- Nếu chính sách server không cho phép cài npm global, hãy chuyển `pm2` sang cách cài local theo user.
- `build-package.sh` yêu cầu có sẵn `rsync` và `pnpm`.
