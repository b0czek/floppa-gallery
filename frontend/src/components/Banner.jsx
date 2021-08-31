const bannerVariants = {
    black: "floppabanner-black.png",
    white: "floppabanner-white.png",
    femboy: "floppabanner-femboy.png",
};

const bannerPathBuilder = (variant) => `/img/${bannerVariants[variant ?? "white"]}`;

const Banner = (props) => {
    return (
        <img
            src={bannerPathBuilder(props.variant)}
            alt="Floppa Gallery"
            className={props.className}
        />
    );
};
export default Banner;
