import Image from "next/image";

const Loader = () => {
  return <div className="flex-center h-screen w0full"><Image src="/icons/loading-circle.svg" alt="Loading" width={50} height={50} /></div>;
};

export default Loader

