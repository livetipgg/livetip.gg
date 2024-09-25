import RootLayout from "@/components/layout";
import { ComponentType } from "react";

export function withLayout<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  return function Layout(props: P) {
    return (
      <RootLayout {...props}>
        <WrappedComponent {...props} />
      </RootLayout>
    );
  };
}
