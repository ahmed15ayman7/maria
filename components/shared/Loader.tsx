const Loader = () => (
    <div className={`${'flex justify-center items-center h-[80vh]  '} w-full`}>
      <div className="relative h-[100px] w-[100px] flex justify-center items-center">
      <img
        src={`/assets/loader.svg`}
        alt="loader"
        width={100}
        height={100}
        className={`animate-spin absolute top-0 left-0 w-full h-full`}
        />
      <img src="/images/دائري مع مريه.png" alt="logo" width={90} height={90} />
        </div>
    </div>
  );
  
  export default Loader;