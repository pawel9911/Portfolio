import { PageTransition } from "@components";
import { stack } from "./utils";

const gaps = "gap-8 lg:gap-7 xl:gap-10";
const cols = "grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-6";
const padding = "p-6 xs:p-7 xl:p-8";

const ResumeSection = () => {
  return (
    <PageTransition>
      <div className="container text-9xl">
        <section id="stack" className="mt-8 mb-16">
          <h2 className="h1 text-center mb-10">Stack</h2>
          <ul className={`grid ${cols} ${gaps}`}>
            {stack.map((e) => (
              <li
                className={`flex flex-col items-center rounded-lg shadow-item ${padding}`}
              >
                {e.icon}
                <p className="h3 mt-1">{e.title}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageTransition>
  );
};

export default ResumeSection;
