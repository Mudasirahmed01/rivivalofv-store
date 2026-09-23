import { motion } from "framer-motion";
import { Truck, Shield, Recycle, Award } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Orders over $200",
  },
  {
    icon: Shield,
    title: "Secure Checkout",
    description: "SSL encrypted",
  },
  {
    icon: Recycle,
    title: "Sustainable",
    description: "Eco materials",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Handcrafted",
  },
];

export default function Features() {
  return (
    <section className="bg-white border-y border-black/5 py-8 md:py-12 px-4 md:px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center gap-2 md:gap-3"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center">
                <feature.icon size={16} className="text-[#111] md:hidden" />
                <feature.icon size={20} className="text-[#111] hidden md:block" />
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-semibold text-[#111] mb-0.5">
                  {feature.title}
                </h3>
                <p className="text-[10px] md:text-xs text-[#6E6E73]">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
