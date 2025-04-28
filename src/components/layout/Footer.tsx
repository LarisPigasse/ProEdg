import ConnectionStatus from "./ConnectionStatus";
import VersionInfo from "./VersionInfo";
import FooterMenu from "../navigation/FooterMenu";
const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white px-4 py-1 text-right text-xxs text-dark flex items-center justify-between">
      <ConnectionStatus />
      <FooterMenu />
      <VersionInfo />
    </footer>
  );
};

export default Footer;
