import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Ruler } from "lucide-react";

interface SizeGuideProps {
  isOpen: boolean;
  onClose: () => void;
  category?: "tops" | "bottoms";
}

// Real size charts based on industry standards

// SHIRTS
const tshirtSizes = [
  { size: "S", chest: "36-38", length: "27", shoulder: "17", sleeve: "8" },
  { size: "M", chest: "39-41", length: "28", shoulder: "18", sleeve: "8.5" },
  { size: "L", chest: "42-44", length: "29", shoulder: "19", sleeve: "9" },
  { size: "XL", chest: "45-47", length: "30", shoulder: "20", sleeve: "9.5" },
  { size: "XXL", chest: "48-50", length: "31", shoulder: "21", sleeve: "10" },
];

const hoodieSizes = [
  { size: "S", chest: "40-42", length: "27.5", shoulder: "22", sleeve: "24" },
  { size: "M", chest: "43-45", length: "28.5", shoulder: "23", sleeve: "25" },
  { size: "L", chest: "46-48", length: "29.5", shoulder: "24", sleeve: "25.5" },
  { size: "XL", chest: "49-51", length: "30.5", shoulder: "25", sleeve: "26" },
  { size: "XXL", chest: "52-54", length: "31.5", shoulder: "26", sleeve: "26.5" },
];

const crewneckSizes = [
  { size: "S", chest: "38-40", length: "26", shoulder: "18", sleeve: "24" },
  { size: "M", chest: "41-43", length: "27", shoulder: "19", sleeve: "25" },
  { size: "L", chest: "44-46", length: "28", shoulder: "20", sleeve: "25.5" },
  { size: "XL", chest: "47-49", length: "29", shoulder: "21", sleeve: "26" },
  { size: "XXL", chest: "50-52", length: "30", shoulder: "22", sleeve: "26.5" },
];

// PANTS
const cargoPantsSizes = [
  { size: "S", waist: "28-30", hip: "36-38", inseam: "30", rise: "11", legOpening: "16" },
  { size: "M", waist: "31-33", hip: "39-41", inseam: "31", rise: "11.5", legOpening: "16.5" },
  { size: "L", waist: "34-36", hip: "42-44", inseam: "32", rise: "12", legOpening: "17" },
  { size: "XL", waist: "37-39", hip: "45-47", inseam: "32", rise: "12.5", legOpening: "17.5" },
  { size: "XXL", waist: "40-42", hip: "48-50", inseam: "33", rise: "13", legOpening: "18" },
];

const jeansSizes = [
  { size: "S", waist: "28-30", hip: "35-37", inseam: "32", rise: "10", legOpening: "14" },
  { size: "M", waist: "31-33", hip: "38-40", inseam: "32", rise: "10.5", legOpening: "14.5" },
  { size: "L", waist: "34-36", hip: "41-43", inseam: "32", rise: "11", legOpening: "15" },
  { size: "XL", waist: "37-39", hip: "44-46", inseam: "32", rise: "11.5", legOpening: "15.5" },
  { size: "XXL", waist: "40-42", hip: "47-49", inseam: "32", rise: "12", legOpening: "16" },
];

const joggerSizes = [
  { size: "S", waist: "28-30", hip: "36-38", inseam: "28", rise: "10.5", legOpening: "10" },
  { size: "M", waist: "31-33", hip: "39-41", inseam: "29", rise: "11", legOpening: "10.5" },
  { size: "L", waist: "34-36", hip: "42-44", inseam: "30", rise: "11.5", legOpening: "11" },
  { size: "XL", waist: "37-39", hip: "45-47", inseam: "30", rise: "12", legOpening: "11.5" },
  { size: "XXL", waist: "40-42", hip: "48-50", inseam: "31", rise: "12.5", legOpening: "12" },
];

const trouserSizes = [
  { size: "S", waist: "28-30", hip: "36-38", inseam: "31", rise: "11", legOpening: "18" },
  { size: "M", waist: "31-33", hip: "39-41", inseam: "32", rise: "11.5", legOpening: "18.5" },
  { size: "L", waist: "34-36", hip: "42-44", inseam: "32", rise: "12", legOpening: "19" },
  { size: "XL", waist: "37-39", hip: "45-47", inseam: "33", rise: "12.5", legOpening: "19.5" },
  { size: "XXL", waist: "40-42", hip: "48-50", inseam: "33", rise: "13", legOpening: "20" },
];

const shirtTypes = [
  { id: "tshirt", label: "T-Shirts", data: tshirtSizes, description: "Regular Fit" },
  { id: "hoodie", label: "Hoodies", data: hoodieSizes, description: "Oversized Fit" },
  { id: "crewneck", label: "Crewnecks", data: crewneckSizes, description: "Relaxed Fit" },
];

const pantTypes = [
  { id: "cargo", label: "Cargo Pants", data: cargoPantsSizes, description: "Relaxed Fit" },
  { id: "jeans", label: "Jeans", data: jeansSizes, description: "Slim Fit" },
  { id: "jogger", label: "Joggers", data: joggerSizes, description: "Tapered Fit" },
  { id: "trouser", label: "Trousers", data: trouserSizes, description: "Wide Leg" },
];

const howToMeasure = [
  {
    title: "CHEST",
    description: "Measure around the fullest part of your chest, keeping the tape horizontal and under your arms.",
    icon: "📏",
  },
  {
    title: "WAIST",
    description: "Measure around your natural waistline, typically the narrowest part above your belly button.",
    icon: "📐",
  },
  {
    title: "HIPS",
    description: "Measure around the fullest part of your hips, approximately 8 inches below your waist.",
    icon: "📏",
  },
  {
    title: "INSEAM",
    description: "Measure from the crotch seam to the bottom of the leg along the inner seam.",
    icon: "📐",
  },
];

export default function SizeGuide({ isOpen, onClose, category = "tops" }: SizeGuideProps) {
  const [unit, setUnit] = useState<"in" | "cm">("in");
  const [activeTab, setActiveTab] = useState<"chart" | "how-to">("chart");
  const [selectedShirtType, setSelectedShirtType] = useState("tshirt");
  const [selectedPantType, setSelectedPantType] = useState("cargo");

  const convertToCm = (inches: string) => {
    return inches
      .split("-")
      .map((val) => Math.round(parseFloat(val) * 2.54))
      .join("-");
  };

  const displayValue = (inches: string) => {
    if (unit === "in") return `${inches}"`;
    return `${convertToCm(inches)} cm`;
  };

  const currentShirtData = shirtTypes.find((t) => t.id === selectedShirtType)?.data || [];
  const currentPantData = pantTypes.find((t) => t.id === selectedPantType)?.data || [];
  const currentData = category === "tops" ? currentShirtData : currentPantData;
  const currentType = category === "tops" 
    ? shirtTypes.find((t) => t.id === selectedShirtType)
    : pantTypes.find((t) => t.id === selectedPantType);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 z-[260] bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 md:px-6 py-4 md:py-5 border-b border-black/5 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center">
                  <Ruler size={16} className="text-white" />
                </div>
                <div>
                  <h2 className="text-base md:text-lg font-bold text-[#111]">Size Guide</h2>
                  <p className="text-[10px] md:text-xs text-[#6E6E73]">
                    {category === "tops" ? "Shirts & Tops" : "Pants & Bottoms"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-black/5 shrink-0">
              <button
                onClick={() => setActiveTab("chart")}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === "chart"
                    ? "text-[#111] border-b-2 border-black"
                    : "text-[#6E6E73]"
                }`}
              >
                Size Chart
              </button>
              <button
                onClick={() => setActiveTab("how-to")}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === "how-to"
                    ? "text-[#111] border-b-2 border-black"
                    : "text-[#6E6E73]"
                }`}
              >
                How to Measure
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 md:p-6">
              {activeTab === "chart" ? (
                <div>
                  {/* Type Selector */}
                  <div className="mb-5">
                    <p className="text-xs text-[#6E6E73] mb-2">Select Type</p>
                    <div className="flex flex-wrap gap-2">
                      {category === "tops" ? (
                        shirtTypes.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => setSelectedShirtType(type.id)}
                            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                              selectedShirtType === type.id
                                ? "bg-black text-white"
                                : "bg-[#F5F5F7] text-[#6E6E73] hover:bg-black/10"
                            }`}
                          >
                            {type.label}
                          </button>
                        ))
                      ) : (
                        pantTypes.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => setSelectedPantType(type.id)}
                            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                              selectedPantType === type.id
                                ? "bg-black text-white"
                                : "bg-[#F5F5F7] text-[#6E6E73] hover:bg-black/10"
                            }`}
                          >
                            {type.label}
                          </button>
                        ))
                      )}
                    </div>
                    {currentType && (
                      <p className="text-[10px] text-[#6E6E73] mt-2 italic">
                        {currentType.description}
                      </p>
                    )}
                  </div>

                  {/* Unit Toggle */}
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-xs text-[#6E6E73]">All measurements in</p>
                    <div className="flex bg-[#F5F5F7] rounded-full p-0.5">
                      <button
                        onClick={() => setUnit("in")}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                          unit === "in" ? "bg-black text-white" : "text-[#6E6E73]"
                        }`}
                      >
                        Inches
                      </button>
                      <button
                        onClick={() => setUnit("cm")}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                          unit === "cm" ? "bg-black text-white" : "text-[#6E6E73]"
                        }`}
                      >
                        CM
                      </button>
                    </div>
                  </div>

                  {/* Size Chart Table */}
                  <div className="overflow-x-auto -mx-5 md:-mx-6 px-5 md:px-6">
                    <table className="w-full min-w-[500px]">
                      <thead>
                        <tr className="border-b-2 border-black">
                          <th className="text-left py-3 text-[10px] md:text-xs font-bold text-[#111] uppercase tracking-wider">
                            Size
                          </th>
                          {category === "tops" ? (
                            <>
                              <th className="text-left py-3 text-[10px] md:text-xs font-bold text-[#111] uppercase tracking-wider">Chest</th>
                              <th className="text-left py-3 text-[10px] md:text-xs font-bold text-[#111] uppercase tracking-wider">Length</th>
                              <th className="text-left py-3 text-[10px] md:text-xs font-bold text-[#111] uppercase tracking-wider">Shoulder</th>
                              <th className="text-left py-3 text-[10px] md:text-xs font-bold text-[#111] uppercase tracking-wider">Sleeve</th>
                            </>
                          ) : (
                            <>
                              <th className="text-left py-3 text-[10px] md:text-xs font-bold text-[#111] uppercase tracking-wider">Waist</th>
                              <th className="text-left py-3 text-[10px] md:text-xs font-bold text-[#111] uppercase tracking-wider">Hip</th>
                              <th className="text-left py-3 text-[10px] md:text-xs font-bold text-[#111] uppercase tracking-wider">Inseam</th>
                              <th className="text-left py-3 text-[10px] md:text-xs font-bold text-[#111] uppercase tracking-wider">Rise</th>
                              <th className="text-left py-3 text-[10px] md:text-xs font-bold text-[#111] uppercase tracking-wider">Leg Opening</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {currentData.map((row: any, i: number) => (
                          <tr key={row.size} className={`border-b border-black/5 ${i % 2 === 0 ? "bg-[#FAFAFA]" : ""}`}>
                            <td className="py-3 text-xs md:text-sm font-bold text-[#111]">{row.size}</td>
                            {category === "tops" ? (
                              <>
                                <td className="py-3 text-xs md:text-sm text-[#6E6E73]">{displayValue(row.chest)}</td>
                                <td className="py-3 text-xs md:text-sm text-[#6E6E73]">{displayValue(row.length)}</td>
                                <td className="py-3 text-xs md:text-sm text-[#6E6E73]">{displayValue(row.shoulder)}</td>
                                <td className="py-3 text-xs md:text-sm text-[#6E6E73]">{displayValue(row.sleeve)}</td>
                              </>
                            ) : (
                              <>
                                <td className="py-3 text-xs md:text-sm text-[#6E6E73]">{displayValue(row.waist)}</td>
                                <td className="py-3 text-xs md:text-sm text-[#6E6E73]">{displayValue(row.hip)}</td>
                                <td className="py-3 text-xs md:text-sm text-[#6E6E73]">{displayValue(row.inseam)}</td>
                                <td className="py-3 text-xs md:text-sm text-[#6E6E73]">{displayValue(row.rise)}</td>
                                <td className="py-3 text-xs md:text-sm text-[#6E6E73]">{displayValue(row.legOpening)}</td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Fit Note */}
                  <div className="mt-5 p-3 md:p-4 bg-[#F5F5F7] rounded-xl">
                    <p className="text-[10px] md:text-xs text-[#6E6E73] leading-relaxed">
                      <span className="font-bold text-[#111]">Fit Note:</span> {
                        category === "tops" 
                          ? selectedShirtType === "hoodie" 
                            ? "Our hoodies are designed with an oversized fit. Size down for a more regular look, or stay true to size for the intended oversized silhouette."
                            : selectedShirtType === "crewneck"
                            ? "Our crewnecks feature a relaxed fit with dropped shoulders. True to size for a comfortable everyday look."
                            : "Our t-shirts have a regular fit. True to size for a classic look, or size up for a more relaxed feel."
                          : selectedPantType === "cargo"
                          ? "Our cargo pants have a relaxed fit through the leg with multiple utility pockets. True to size for the intended look."
                          : selectedPantType === "jeans"
                          ? "Our jeans feature a slim fit through the leg. If between sizes, we recommend sizing up for comfort."
                          : selectedPantType === "jogger"
                          ? "Our joggers have a tapered fit with elasticated cuffs. True to size for the intended athletic look."
                          : "Our trousers feature a wide leg with a clean drape. True to size for the intended silhouette."
                      }
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  {/* How to Measure */}
                  <div className="space-y-4">
                    {howToMeasure
                      .filter((item) => {
                        if (category === "tops") return ["CHEST", "WAIST"].includes(item.title);
                        return ["WAIST", "HIPS", "INSEAM"].includes(item.title);
                      })
                      .map((item) => (
                        <div
                          key={item.title}
                          className="flex gap-4 p-4 bg-[#F5F5F7] rounded-xl"
                        >
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0 text-lg">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-[#111] uppercase tracking-wider mb-1">
                              {item.title}
                            </h4>
                            <p className="text-xs text-[#6E6E73] leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Pro Tip */}
                  <div className="mt-5 p-4 bg-black text-white rounded-xl">
                    <p className="text-xs font-bold uppercase tracking-wider mb-1">💡 Pro Tip</p>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Use a soft measuring tape and measure over lightweight clothing. For the most accurate fit, have someone help you with the measurements.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
