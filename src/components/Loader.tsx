import { BeatLoader } from "react-spinners";
interface LoaderProps {
  loaderRef?: (node?: Element | null) => void;
}
const Loader = ({ loaderRef }: LoaderProps) => (
  <div className="w-full flex justify-center my-16" ref={loaderRef}>
    <BeatLoader color="#fff" size={15} className="" />
  </div>
);

export default Loader;
