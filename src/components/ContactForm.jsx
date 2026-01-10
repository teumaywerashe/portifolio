import { useState, useRef } from "react";
import emailjs from "emailjs-com";
import { motion, useInView, AnimatePresence } from "framer-motion";
import useTheme from "../context/ThemeContext";

const ContactForm = () => {
  const { theme, isDarkMode } = useTheme();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [toast, setToast] = useState({ show: false, type: "", text: "" });

  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, margin: "-100px" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const showToast = (type, text) => {
    setToast({ show: true, type, text });
    setTimeout(() => setToast({ show: false, type: "", text: "" }), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send("service_pj42j4j", "template_tdis61b", form, "PKpVN9FZYcF6v5ZfU")
      .then(
        () => {
          showToast("success", "Message sent successfully!");
          setForm({ name: "", email: "", phone: "", service: "", message: "" });
        },
        (error) => {
          console.error(error.text);
          showToast("error", "Failed to send message. Please try again.");
        }
      );
  };

  const particles = Array.from({ length: 30 });

  return (
    <section
      id="contact"
      style={{ backgroundColor: theme.background }}
      className="relative flex items-center justify-center min-h-screen py-16 px-6 overflow-hidden transition-colors duration-500"
    >
      

      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((_, i) => {
          const size = Math.random() * 6 + 4;
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                backgroundColor: theme.primary,
                width: size,
                height: size,
                left: Math.random() * 100 + "%",
                filter: `blur(${size / 3}px)`,
                boxShadow: `0 0 ${size * 2}px ${theme.primary}40`,
              }}
              animate={{
                y: [-20, 1000],
                opacity: [0, 0.5, 0.5, 0],
                x: [0, Math.random() * 50 - 25, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * -20,
              }}
            />
          );
        })}
      </div>



      <motion.div
        ref={formRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{
          backgroundColor: theme.surface + "cc",
          backdropFilter: "blur(12px)",
          border: `1px solid ${theme.border}`,
          boxShadow: isDarkMode
            ? "0 25px 50px -12px rgba(0,0,0,0.5)"
            : "0 20px 40px rgba(0,0,0,0.05)",
        }}
        className="relative z-10 p-8 md:p-12 rounded-[2.5rem] max-w-2xl w-full"
      >
        <div className="text-center mb-10">
          <h2
            style={{ color: theme.textMain }}
            className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter"
          >
            Get <span style={{ color: theme.primary }}>In Touch.</span>
          </h2>
          <div
            className="h-1.5 w-16 rounded-full mx-auto mt-4"
            style={{ backgroundColor: theme.primary }}
          ></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "name", type: "text", placeholder: "Your Name" },
              { name: "email", type: "email", placeholder: "Your Email" },
              { name: "phone", type: "tel", placeholder: "Your Phone" },
            ].map((field) => (
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                required
                style={{
                  backgroundColor: theme.background,
                  color: theme.textMain,
                  borderColor: theme.border,
                }}
                className="w-full p-4 rounded-2xl border outline-none focus:border-orange-500 transition-all font-medium placeholder:opacity-50"
              />
            ))}

            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              required
              style={{
                backgroundColor: theme.background,
                color: theme.textMain,
                borderColor: theme.border,
              }}
              className="w-full p-4 rounded-2xl border outline-none focus:border-orange-500 transition-all font-medium appearance-none"
            >
              <option value="">Select Service</option>
              <option value="app">Web App Development</option>
              <option value="frontend">Front-end UI/UX</option>
              <option value="backend">Backend Systems</option>
              <option value="fullstack">Full-Stack Solution</option>
            </select>
          </div>

          <textarea
            name="message"
            placeholder="Tell me about your vision..."
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
            style={{
              backgroundColor: theme.background,
              color: theme.textMain,
              borderColor: theme.border,
            }}
            className="w-full p-4 rounded-2xl border outline-none focus:border-orange-500 transition-all font-medium resize-none placeholder:opacity-50"
          ></textarea>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{ backgroundColor: theme.primary }}
            className="w-full p-5 rounded-2xl text-white font-black uppercase tracking-widest shadow-lg hover:brightness-110 transition-all mt-4"
          >
            Send Message
          </motion.button>
        </form>

        
        
        <AnimatePresence>
          {toast.show && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              style={{
                position: "fixed",
                bottom: 30,
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: toast.type === "success" ? "#4ade80" : "#f87171",
                color: isDarkMode ? "#111" : "#fff",
                padding: "1rem 2rem",
                borderRadius: "1.5rem",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                zIndex: 1000,
                fontWeight: "bold",
              }}
            >
              {toast.text}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default ContactForm;
