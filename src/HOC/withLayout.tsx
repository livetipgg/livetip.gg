import RootLayout from "@/components/layout";
import { setDocumentTitle } from "@/helpers/setDocumentTitle";
import { ComponentType, useEffect } from "react";

export function withLayout<P extends object>(
  WrappedComponent: ComponentType<P>,
  title?: string
) {
  return function Layout(props: P) {
    useEffect(() => {
      setDocumentTitle(title || "LiveTip");
    }, []);
    return (
      <RootLayout {...props}>
        <WrappedComponent {...props} />
      </RootLayout>
    );
  };
}
