import { motion, useCycle } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { ImGithub } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { TbMenu2 } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { useAccessibleNavigationPaths } from "../../router/utils";

const navVariants = {
  open: {
    clipPath: `circle(120vh at 50% -1vh)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
      when: "beforeChildren",
    },
  },
  closed: {
    clipPath: "circle(1vh at 50% -1vh)",
    transition: {
      delay: 0.3,
      type: "spring",
      stiffness: 400,
      damping: 40,
      when: "afterChildren",
    },
  },
};

const ulVariants = {
  open: {
    transition: { staggerChildren: 0.1 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const liVariants = (revert = true) => ({
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: revert ? -50 : 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
});

const MobileNav = () => {
  const [statusNav, toggleStatusNav] = useCycle(false, true);
  const accessiblePaths = useAccessibleNavigationPaths();
  const location = useLocation();

  return (
    <nav>
      <motion.button
        onClick={() => toggleStatusNav()}
        animate={statusNav ? { transform: "rotate(180deg)" } : {}}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-2 w-10 h-10 inline-flex items-center justify-center rounded-full 
        text-red-600 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-300 relative z-10"
      >
        <span className="sr-only">Open mobile menu</span>
        {statusNav ? <IoMdClose /> : <TbMenu2 />}
      </motion.button>
      <motion.div
        animate={statusNav ? "open" : "closed"}
        variants={navVariants}
        className="fixed inset-0 bg-nav pt-32 p-6"
      >
        <div className="container mx-auto h-full grid grid-rows-[1fr_auto] gap-7">
          <motion.ul variants={ulVariants} className="flex flex-col gap-7 pt-8">
            {accessiblePaths.map(({ isVisibleOnNavigation, name, path }) =>
              isVisibleOnNavigation ? (
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={liVariants()}
                  key={path}
                  className={`${
                    location.pathname === path && "text-red-600"
                  } text-center font-bold hover:text-red-600 transition-all bg-primary rounded-3xl mx-auto w-full py-2.5 sm:py-3 sm:text-2xl max-w-sm sm:max-w-lg`}
                >
                  <Link className="block" to={path}>
                    {name}
                  </Link>
                </motion.li>
              ) : null
            )}
          </motion.ul>
          <div>
            <ul className="flex justify-center gap-5">
              <motion.li
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={liVariants(false)}
              >
                <Link to="https://github.com/pawel9911">
                  <ImGithub className="text-3xl sm:text-5xl" />
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={liVariants(false)}
              >
                <Link to="https://www.linkedin.com/in/pawel-grzybek/">
                  <FaLinkedin className="text-3xl sm:text-5xl" />
                </Link>
              </motion.li>
            </ul>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default MobileNav;
