import error404 from "../../assets/images/error.svg";

export default function Notfound() {
  return (
    <>
      <div className="h-full py-5 flex flex-col justify-center items-center w-1/2 mx-auto">
        <img className="w-full" src={error404} alt="Error 404" />
        <h1>Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
    </>
  );
}
