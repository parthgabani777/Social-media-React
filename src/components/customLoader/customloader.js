import { ClipLoader } from "react-spinners";

export function CustomLoader() {
    const loaderStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
    };

    return <ClipLoader css={loaderStyle} color="white" size="75px" />;
}
