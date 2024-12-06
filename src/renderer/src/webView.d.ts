declare global {
  namespace JSX {
    interface IntrinsicElements {
      webview: React.DetailedHTMLProps<WebViewHTMLAttributes, HTMLWebViewElement>;
    }

    interface WebViewHTMLAttributes<T> extends React.HTMLAttributes<T> {
      src?: string;
      onTitleUpdated?: (event: CustomEvent<{ title: string }>) => void;
    }
  }

  interface HTMLWebViewElement extends HTMLElement {
    src: string;
  }
}
