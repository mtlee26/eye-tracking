import LongPressButton from "@/components/longPressButton";
import {
  MdKeyboardVoice,
  MdHome,
  MdArrowBack,
  MdArrowForward,
} from "react-icons/md";

const RootLayout = ({ children, buttonProps }) => {
  const defaultButtonProps = {
    top: {
      className:
        "w-1/2 h-10 transform -translate-y-1/2 bg-[#1e1f25] text-white rounded-b-xl",
      onClick: () => console.log("Top button pressed"),
      label: "Top Button",
      icon: <MdKeyboardVoice />,
    },
    bottom: {
      className:
        "w-1/2 h-10 transform translate-y-1/2 bg-[#1e1f25] text-white rounded-t-xl",
      onClick: () => console.log("Bottom button pressed"),
      label: "Bottom Button",
      icon: <MdHome />,
    },
    left: {
      className:
        "absolute left-0 top-1/4 transform -translate-x-1/2 w-10 h-1/2 bg-[#1e1f25] text-white rounded-r-xl",
      onClick: () => console.log("Left button pressed"),
      label: "Left Button",
      icon: <MdArrowBack />,
    },
    right: {
      className:
        "absolute right-0 top-1/4 transform translate-x-1/2 w-10 h-1/2 bg-[#1e1f25] text-white rounded-l-xl",
      onClick: () => console.log("Right button pressed"),
      label: "Right Button",
      icon: <MdArrowForward />,
    },
  };

  const top = {
    ...defaultButtonProps.top,
    ...buttonProps.top,
  };

  const bottom = {
    ...defaultButtonProps.bottom,
    ...buttonProps.bottom,
  };

  const left = {
    ...defaultButtonProps.left,
    ...buttonProps.left,
  };

  const right = {
    ...defaultButtonProps.right,
    ...buttonProps.right,
  };

  return (
    <div className="relative w-screen h-screen">
      <div className="absolute inset-0 z-0 overflow-auto">{children}</div>

      <div className="flex flex-col items-center justify-between h-full z-10">
        <LongPressButton
          className={`${top.className} ${
            top.className.includes("hidden") ? "hidden" : ""
          }`}
          onClick={top.onClick}
          icon={top.icon}
        >
          {top.label}
        </LongPressButton>

        <LongPressButton
          className={`${bottom.className} ${
            bottom.className.includes("hidden") ? "hidden" : ""
          }`}
          onClick={bottom.onClick}
          icon={bottom.icon}
        >
          {bottom.label}
        </LongPressButton>
      </div>

      <LongPressButton
        className={`${left.className} ${
          left.className.includes("hidden") ? "hidden" : ""
        }`}
        onClick={left.onClick}
        icon={left.icon}
      >
        {left.label}
      </LongPressButton>

      <LongPressButton
        className={`${right.className} ${
          right.className.includes("hidden") ? "hidden" : ""
        }`}
        onClick={right.onClick}
        icon={right.icon}
      >
        {right.label}
      </LongPressButton>
    </div>
  );
};

export default RootLayout;
