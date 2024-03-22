import React from "react";
import OrgControl from "./_components/OrgControl";

const OrganizationPageLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
};

export default OrganizationPageLayout;
