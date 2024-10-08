import Img404 from "../assets/Img404";

const Page404 = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h1 className="text-center text-5xl font-bold uppercase">
        Page not found
      </h1>
      <div className="w-[80%] max-w-[700px]">
        <Img404 />
      </div>
      <h3>
        Back to{" "}
        <a href="/" className="text-indigo-400 hover:text-indigo-500">
          home
        </a>{" "}
        page.
      </h3>
    </div>
  );
};

export default Page404;
