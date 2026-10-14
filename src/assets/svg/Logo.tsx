import Image from "next/image";

const Logo = () => {
  return <Image src="/logo.svg" alt="Logo" width={40} height={20} priority />;
};

export default Logo;
