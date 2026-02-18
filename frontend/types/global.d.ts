export {};

declare global {
  interface Window {
    feather: {
      replace: () => void;
    };
    initLayout: () => void;
    bootstrap?: any;
  }
}