import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ImagePostCards from "../../components/common/ImagePostCards";
import ImageMyCard from "../../components/common/ImageMyCard";

const HomePage = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };
  const slider = [
    { id: 1, name: "Joy Slick Slider" },
    { id: 2, name: "Ray Slick Slider" },
    { id: 3, name: "Jonny Slick Slider" },
    { id: 4, name: "last Slick Slider" },
    { id: 5, name: "first Slick Slider" },
    { id: 6, name: "Slick Slider" },
  ];

  return (
    <main className="flex flex-col gap-4 w-full md:w-[65%] lg:w-1/2 xl:w-[39.5%] overflow-hidden mt-6 absolute md:left-1/2 md:-translate-x-1/2">
      <section className="grid grid-flow-col gap-2">
        <Carousel responsive={responsive}>
          <ImageMyCard />
          {slider.map((slider) => (
            <ImagePostCards key={slider.id} name={slider.name} />
          ))}
        </Carousel>
      </section>
    </main>
  );
};

export default HomePage;
