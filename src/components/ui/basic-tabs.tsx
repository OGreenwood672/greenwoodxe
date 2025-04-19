import { motion } from "framer-motion";
import { Dispatch } from "react";

interface TabProps {
  text: string;
  selected: boolean;
  setSelected: (text: string) => void;
}

const Tab = ({ text, selected, setSelected }: TabProps) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={`${
        selected
          ? "text-white"
          : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
      } relative rounded-md px-4 py-1 text-sm font-medium transition-colors cursor-pointer`}
    >
      <span className="relative z-10">
        {text[0].toUpperCase() + text.substring(1)}
      </span>
      {selected && (
        <motion.span
          layoutId="tab"
          transition={{ type: "spring", duration: 0.4 }}
          className="absolute inset-0 z-0 rounded-xl bg-gray-700"
        ></motion.span>
      )}
    </button>
  );
};

const ButtonShapeTabs = ({
  tabs,
  selected,
  setSelected,
}: {
  tabs: string[];
  selected: string;
  setSelected: Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-2">
      {tabs.map((tab) => (
        <Tab
          text={tab}
          selected={selected === tab}
          setSelected={setSelected}
          key={tab}
        />
      ))}
    </div>
  );
};

export default ButtonShapeTabs;
