import { ReactNode } from "react";

const ExploreLayout = ({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) => (
  <>
    {modal}
    {children}
  </>
);

export default ExploreLayout;
