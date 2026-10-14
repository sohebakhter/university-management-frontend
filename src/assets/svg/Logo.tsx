import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src="/logo.svg"
      alt="Logo"
      width={35}
      height={40}
      style={{ width: "auto", height: "auto" }}
      priority
    />
  );
};

export default Logo;
