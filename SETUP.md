# Visual Studio Code 설치 가이드

## 📁 폴더 구조

프로젝트를 아래와 같이 구성해주세요:

```
sin-timeline/
├── public/
│   ├── sin1.png
│   ├── sin2.png
│   ├── sin3.png
│   ├── sin4.png
│   ├── sin5.png
│   ├── sin6.png
│   ├── sin7.png
│   ├── sin8.png
│   ├── sin9.png
│   ├── sin10.png
│   ├── sin11.png
│   ├── sin12.png
│   ├── sin13.png
│   ├── sin14.png
│   ├── final-poster.png
│   └── gridshift.mp3
│
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── SinNewspaperTimeline.jsx
│
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

## 🚀 설치 방법

### 1. 프로젝트 폴더 만들기

```bash
# 새 폴더 생성
mkdir sin-timeline
cd sin-timeline
```

### 2. 파일 복사

다운로드 받은 파일들을 위 폴더 구조대로 배치:

**루트 폴더에:**
- `index.html`
- `package.json`
- `vite.config.js`
- `.gitignore`
- `README.md`

**src 폴더에:**
- `App.jsx`
- `main.jsx`
- `index.css`
- `SinNewspaperTimeline.jsx`

**public 폴더에:**
- `sin1.png ~ sin14.png` (14개)
- `final-poster.png` (1개)
- `gridshift.mp3` (1개)

### 3. VS Code로 폴더 열기

```bash
# VS Code로 프로젝트 폴더 열기
code .
```

또는 VS Code에서:
1. File → Open Folder
2. `sin-timeline` 폴더 선택

### 4. 의존성 설치

VS Code 터미널에서 (Ctrl + ` 또는 View → Terminal):

```bash
npm install
```

### 5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속!

## 🔧 VS Code 추천 확장

프로젝트 작업에 유용한 확장:

1. **ES7+ React/Redux/React-Native snippets**
2. **Prettier - Code formatter**
3. **ESLint**
4. **Auto Rename Tag**
5. **Color Highlight**

## 📝 주의사항

### public 폴더 파일명 확인

```
✅ sin1.png (소문자, 띄어쓰기 없음)
✅ sin2.png
...
✅ sin14.png
✅ final-poster.png (하이픈, 소문자)
✅ gridshift.mp3 (소문자)

❌ Sin1.png (대문자 X)
❌ sin 1.png (띄어쓰기 X)
❌ Final-Poster.png (대문자 X)
```

### 인스타그램 링크

이미 설정되어 있습니다:
```
https://www.instagram.com/p/DPxpMKKj0oG/
```

변경하려면 `SinNewspaperTimeline.jsx` 파일에서 `instagramUrl` 수정

## 🐛 문제 해결

### "Cannot find module" 에러
```bash
rm -rf node_modules
npm install
```

### 이미지가 안 보일 때
1. `public` 폴더에 이미지 있는지 확인
2. 파일명 대소문자 확인
3. 브라우저 새로고침 (Ctrl + Shift + R)

### 포트가 이미 사용 중일 때
```bash
# 다른 포트로 실행
npm run dev -- --port 3000
```

## 📦 빌드 (배포용)

완성 후 배포하려면:

```bash
npm run build
```

`dist` 폴더가 생성됨 → 이 폴더를 서버에 업로드

## 💡 팁

- **자동 저장**: File → Auto Save 켜기
- **단축키**:
  - `Ctrl + P`: 파일 빠르게 열기
  - `Ctrl + Shift + P`: 명령 팔레트
  - `Ctrl + B`: 사이드바 토글
  - `Alt + ↑/↓`: 줄 이동

---

**Happy Coding! 🚀**
