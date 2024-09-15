import { TailSpin } from "react-loader-spinner";

function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <TailSpin
        visible={true}
        height="100"
        width="100"
        color="#22c55e"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Spinner;
