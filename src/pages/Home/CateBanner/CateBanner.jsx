const CateBanner = () => {
  return (
    <div>
      <section className="py-6 mx-5">
        <div
          className="container flex flex-col justify-center p-4 mx-auto"
          bis_skin_checked="1"
        >
          <div
            className="grid grid-cols-1 gap-4 lg:grid-cols-4 sm:grid-cols-2"
            bis_skin_checked="1"
          >
            <img
              className="object-cover w-full dark:bg-gray-500 aspect-square"
              src="https://source.unsplash.com/random/300x300/?1"
            />
            <img
              className="object-cover w-full dark:bg-gray-500 aspect-square"
              src="https://source.unsplash.com/random/300x300/?2"
            />
            <img
              className="object-cover w-full dark:bg-gray-500 aspect-square"
              src="https://source.unsplash.com/random/300x300/?3"
            />
            <img
              className="object-cover w-full dark:bg-gray-500 aspect-square"
              src="https://source.unsplash.com/random/300x300/?4"
            />
            <img
              className="object-cover w-full dark:bg-gray-500 aspect-square"
              src="https://source.unsplash.com/random/300x300/?1"
            />
            <img
              className="object-cover w-full dark:bg-gray-500 aspect-square"
              src="https://source.unsplash.com/random/300x300/?1"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CateBanner;
