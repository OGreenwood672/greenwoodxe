import { ReactNode, Dispatch } from "react";
import { AnimatePresence, motion } from "framer-motion";

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (selected: boolean) => ({
    gap: selected ? ".5rem" : 0,
    paddingLeft: selected ? "1rem" : ".5rem",
    paddingRight: selected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.35 };

interface TabType {
  title: string;
  icon: ReactNode;
}

interface TabProps {
  tabs: TabType[];
  text: string;
  selected: boolean;
  setSelected: Dispatch<React.SetStateAction<TabType>>;
  children: ReactNode;
  index: number;
}

const Tab = ({
  tabs,
  text,
  selected,
  setSelected,
  index,
  children,
}: TabProps) => {
  return (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      custom={selected}
      onClick={() => setSelected(tabs[index])}
      transition={transition}
      className={`${
        selected
          ? "bg-gray-500/15 text-gray-900 dark:text-white"
          : " hover:text-gray-900 dark:hover:text-gray-100"
      } cursor-pointer relative flex items-center rounded-full px-4 py-2 text-sm font-medium text-gray-500 transition-colors duration-300 focus-within:outline-gray-500/50`}
    >
      {children}
      <AnimatePresence>
        {selected && (
          <motion.span
            variants={spanVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={transition}
            className="overflow-hidden"
          >
            <p className="dark:text-white">{text}</p>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// IconTabs component
const IconTabs = ({
  tabs,
  selected,
  setSelected,
  center,
}: {
  tabs: TabType[];
  selected: TabType;
  setSelected: Dispatch<React.SetStateAction<TabType>>;
  center?: boolean;
}) => {
  return (
    <div
      className={` ${
        center ? "justify-center " : ""
      } mb-8 flex flex-wrap items-center gap-2 border-b border-gray-200 pb-2 dark:border-gray-600`}
    >
      {tabs.map((tab, index) => (
        <Tab
          tabs={tabs}
          text={tab.title}
          selected={selected.title === tab.title}
          setSelected={setSelected}
          index={index}
          key={tab.title}
        >
          {tab.icon}
        </Tab>
      ))}
    </div>
  );
};

export default IconTabs;
export type { TabType };
