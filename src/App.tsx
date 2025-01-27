import { useEffect, useState } from "react";
import Home from "./components/home/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

interface AppState {
  shouldShowRotateImage: boolean;
}

function App() {
  const [shouldShowRotateImage, setShouldShowRotateImage] =
    useState<AppState["shouldShowRotateImage"]>(false);

  useEffect(() => {
    const handleResize = (): void => {
      const isLandscapeOrientation: boolean =
        window.innerHeight < window.innerWidth;
      const isHeightLessThan550: boolean = window.innerHeight <= 500;
      const isWidthLessThanMaxWidth: boolean = window.innerWidth <= 950; // You can set your max-width here
      // Show the rotate image only if the device height is <= 550px, it's in landscape orientation, and width is <= max-width
      setShouldShowRotateImage(
        isLandscapeOrientation && isHeightLessThan550 && isWidthLessThanMaxWidth
      );
    };

    // Initial check on mount
    handleResize();

    // Add event listener for screen resize and orientation change
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // Cleanup event listeners on component unmount
    return (): void => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home shouldShowRotateImage={shouldShowRotateImage} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
