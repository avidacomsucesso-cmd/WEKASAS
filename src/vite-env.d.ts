/// <reference types="vite/client" />

interface Window {
  gtag?: (command: string, action: string, params: object) => void;
}
