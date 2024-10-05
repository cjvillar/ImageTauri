# ImageTauri - Tauri + Rust + React Image Editing Desktop App

This project is a test application built with Tauri 2.0, Rust, and React for creating a desktop image editing app. 

### Check out the Tauri 2.0 changes:
[HackMD: Tauri 2.0 Updates](https://hackmd.io/@lucasfernog/B1hd1SfB2)

---

## Getting Started

1. Clone the repository and navigate to the project folder:
   ```bash
   cd ImageTauri
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Desktop Development

To run the project in desktop mode, use the following command:
```bash
npm run tauri dev
```

---

## Code Linting and Formatting

For linting and formatting JavaScript code, run:
```bash
npm run prettier
```

For formatting and linting Rust code, run:
```bash
cargo fmt
cargo clippy
```


## Resources

- [Calling Rust from JavaScript in Tauri](https://tauri.app/develop/calling-rust/)
- [Tauri File System Plugin](https://v2.tauri.app/plugin/file-system/)
- [Image Processing in Rust](https://docs.rs/crate/image/latest)

---

## Known Issues

Here are some known issues to be aware of:

- [Tauri Issue #9667](https://github.com/tauri-apps/tauri/issues/9667)
- [Tauri Issue #6962](https://github.com/tauri-apps/tauri/issues/6962)

---

## Processing Libraries

[Image Crate Documentation](https://docs.rs/crate/image/latest)

---

## Roadmap

- **Phase 1**: Initial Setup
  - Basic Tauri, Rust, and React integration.
  - Desktop development setup.
  
- **Phase 2**: Core Functionality
  - Implement basic image editing features.
  - Ensure Rust-based image processing pipeline works seamlessly.
    
- **Phase 3**: Advanced Features
  - Add more advanced image editing tools.
  - Improve UI/UX.
  
- **Phase 4**: Testing and Optimization
  - Linting and formatting for both JS and Rust code.
  - Optimize performance for large image files.
  
- **Phase 5**: Release Alpha
  - Publish desktop App for more user feedback.

---

```

