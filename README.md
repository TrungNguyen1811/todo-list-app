# 📝 Todo Kanban App

Ứng dụng quản lý công việc dạng **Kanban Board**, được xây dựng bằng **React + Vite**.  
Hỗ trợ quản lý task, drag & drop, Redux Toolkit + Saga để xử lý state & side effects.

---

## 🚀 Công nghệ sử dụng
- ⚛️ [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) – frontend framework
- 🎨 [Ant Design](https://ant.design/) – UI components
- 🎯 [Redux Toolkit](https://redux-toolkit.js.org/) – state management
- 🔄 [Redux Saga](https://redux-saga.js.org/) – side effects (async, API)
- 📡 [Axios](https://axios-http.com/) – gọi API
- 🎭 [SCSS](https://sass-lang.com/) – styling
- ✅ [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) – form & validation

---

## 📦 Cài đặt

Clone repo và cài dependencies:
git clone https://github.com/your-username/todo-kanban-app.git
cd todo-kanban-app
pnpm install

Chạy ứng dụng dev:
pnpm dev

Build production:
pnpm build

Preview build:
pnpm preview


## 📂 Cấu trúc thư mục
<img width="563" height="622" alt="image" src="https://github.com/user-attachments/assets/6a00069e-7790-4ce9-a660-d95d4e2419e8" />

## Git Flow
- Branch
main: bản release
develop: code ổn định chuẩn bị release
feature/: phát triển tính năng mới
release/: chuẩn bị phát hành
hotfix/: vá lỗi gấp trên production

- Flow
git pull origin develop
git checkout -b feature/<tên-task>
git add .
git commit -m "feat: implement ...."
git push -u origin  feature/<tên-task>
git fetch origin
git pull --rebase origin develop
Create PR from feature/<tên-task> → develop.
Đợi code review + CI test.
Remove branch 

- Just 1 commit/ 1 PR
git commit —amend —no-edit: Không sinh ra commit (add thêm file không tạo thêm commit)

- Merge nhiều commit thành 1 commit
git reflog —oneline: view histort log
git reset —soft <<commit id before first commit>>

- Structure commit:
feat:	Tính năng mới	(feat: thêm chức năng upload file)
fix:	Sửa bug	(fix: xử lý lỗi crash khi login)
refactor:	Refactor code	(refactor: tối ưu hàm validateEmail)




