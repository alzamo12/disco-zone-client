import { Transition } from "@headlessui/react";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";

const companies = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Meta_Platforms_Inc._logo.svg" },
    { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
];

const Featured = () => {
    return (
        <section className="bg-primary text-white py-16 px-6 md:px-12 lg:px-20 rounded-xl" >
            <div className="max-w-7xl mx-auto text-center space-y-10">

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-sky-500">
                    Our Featured Commitments
                </h2>
                <p className="text-neutral-300 max-w-2xl mx-auto text-base md:text-lg">
                    Disco Zone is trusted and supported by leading companies and
                    communities worldwide.
                </p>

                {/* Marquee */}
                <Marquee gradient={false} speed={50}>
                    <div className="flex h-24 gap-16 items-center mr-16">
                        {companies.map((company, index) => (
                            <motion.div
                                key={index}
                                whileHover={{scale:1.1}}
                                transition={{type:'spring', stiffness:200}}
                                className="flex items-center justify-center h-20 w-40 bg-slate-900 rounded-xl shadow-md border border-slate-700 p-3"
                            >
                                <img
                                    src={company.logo}
                                    alt={company.name}
                                    className="h-full object-contain"
                                />
                            </motion.div>
                        ))}
                    </div>
                </Marquee>
            </div>
        </section>
    );
};
export default Featured
