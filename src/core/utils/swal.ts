type MUITheme = {
  palette: {
    mode: "light" | "dark";
    background: { default: string; paper: string };
    text: { primary: string; secondary: string };
    primary: { main: string };
  };
  typography?: {
    fontSize?: number;
  };
};

interface SwalOptions {
  title?: string;
  message: string;
}

export default function swal({ title, message }: SwalOptions): Promise<void> {
  return new Promise((resolve) => {
    const rawTheme = localStorage.getItem("customTheme");
    const theme: MUITheme = rawTheme
      ? JSON.parse(rawTheme)
      : {
          palette: {
            mode: "light",
            background: { default: "#fafafa", paper: "#fff" },
            text: { primary: "#000", secondary: "#555" },
            primary: { main: "#1976d2" }
          }
        };

    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.4);
      backdrop-filter: blur(6px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1300;
    `;

    const box = document.createElement("div");
    box.style.cssText = `
      background: ${theme.palette.background.paper};
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      text-align: center;
      max-width: 90%;
      min-width: 280px;
      color: ${theme.palette.text.primary};
      font-size: ${theme.typography?.fontSize || 14}px;
      transform: scale(0.8);
      opacity: 0;
      transition: all 250ms ease;
    `;
    if (title) {
      const titleEl = document.createElement("h2");
      titleEl.textContent = title;
      titleEl.style.cssText = `
        margin: 0 0 12px 0;
        font-size: 1.25rem;
        font-weight: 500;
        color: ${theme.palette.text.primary};
      `;
      box.appendChild(titleEl);
    }

    const text = document.createElement("p");
    text.textContent = message;
    text.style.cssText = `
      margin: 0 0 20px 0;
    `;

    const button = document.createElement("button");
    button.textContent = "OK";
    const primary = theme.palette.primary.main;
    button.style.cssText = `
      background-color: ${primary};
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      font-weight: 500;
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.3s;
    `;

    button.onmouseenter = () => {
      button.style.backgroundColor = darkenColor(primary, 0.1);
    };
    button.onmouseleave = () => {
      button.style.backgroundColor = primary;
    };

    button.onclick = () => {
      document.body.removeChild(overlay);
      resolve();
    };

    box.appendChild(text);
    box.appendChild(button);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    requestAnimationFrame(() => {
      box.style.transform = "scale(1)";
      box.style.opacity = "1";
    });
  });
}

function darkenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent * 100);
  const r = Math.max((num >> 16) - amt, 0);
  const g = Math.max(((num >> 8) & 0x00ff) - amt, 0);
  const b = Math.max((num & 0x0000ff) - amt, 0);
  return `rgb(${r},${g},${b})`;
}
