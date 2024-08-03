import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import "./UpButton.css";
import { Tooltip } from "@mui/material";

function UpButton() {
  const [isShowButton, setIsShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 500) {
      setIsShowButton(true);
    } else {
      setIsShowButton(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isShowButton && (
        <Tooltip title="Click để về đầu trang">
          <button onClick={handleClick} className="upBtn">
            <FontAwesomeIcon icon={faChevronUp as IconProp} />
          </button>
        </Tooltip>
      )}
    </>
  );
}

export default UpButton;
