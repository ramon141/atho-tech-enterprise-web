import ArgonBox from "components/ArgonBox";

// Argon Dashboard 2 MUI context
import { useArgonController } from "context";

// Images
import icon from "assets/sidebar/piggy_bank.png";

function SidenavFooter() {
  const [controller] = useArgonController();
  const { miniSidenav, darkSidenav } = controller;

  return (
    <ArgonBox opacity={miniSidenav ? 0 : 1} sx={{ transition: "opacity 200ms linear" }}>
      <ArgonBox position="relative" textAlign="center">
        <ArgonBox component="img" src={icon} alt="sidebar_illustration" width={100} />
      </ArgonBox>
    </ArgonBox>
  );
}

export default SidenavFooter;
