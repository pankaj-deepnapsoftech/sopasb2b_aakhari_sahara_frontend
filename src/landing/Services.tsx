//@ts-nocheck
import { motion } from "framer-motion";
import {
  Cog,
  Activity,
  Factory,
  Workflow,
  CloudLightning,
  ShieldCheck,
} from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      title: "Production Tracking",
      desc: "Monitor every step of your manufacturing in real time with intelligent analytics and smart dashboards. Visualize production flow, machine uptime, and operator performance instantly.",
      details: [
        "📊 Live status updates for every production unit",
        "⚙️ Real-time analytics on performance and downtime",
        "🔔 Automated alerts for production delays or errors",
        "📈 Improve overall efficiency through continuous monitoring",
      ],
      icon: Activity,
    },
    {
      title: "Workflow Automation",
      desc: "Eliminate repetitive manual tasks with no-code automation triggers designed for your factory operations. Focus on growth while we handle the workflow logic.",
      details: [
        "⚡ Set up automated approval flows and process triggers",
        "🔄 Seamless integration with existing ERP systems",
        "🧠 Custom automation scripts with zero coding",
        "🕒 Save time and minimize human errors in every step",
      ],
      icon: Workflow,
    },
    {
      title: "Smart Manufacturing",
      desc: "Empower your production units with AI-driven insights that optimize your plant’s capacity and resource allocation for maximum profitability.",
      details: [
        "🤖 AI-driven performance optimization",
        "🔍 Predictive analytics for supply and demand",
        "📦 Resource utilization and production forecasting",
        "🚀 Scale manufacturing without increasing costs",
      ],
      icon: Factory,
    },
    {
      title: "Cloud Sync & Backup",
      desc: "Keep your business connected and your data secure with automatic backups and real-time synchronization across all departments.",
      details: [
        "☁️ Cloud-based storage for fast and reliable access",
        "🔐 End-to-end encrypted data transfers",
        "🕓 Instant file sync and real-time updates",
        "🧭 Cross-department collaboration made easy",
      ],
      icon: CloudLightning,
    },
    {
      title: "Maintenance Alerts",
      desc: "Predict equipment failures before they happen with automated alerts and smart maintenance scheduling powered by IoT sensors.",
      details: [
        "🔔 Automated machine health monitoring",
        "🛠️ Predictive maintenance alerts for every unit",
        "📅 Maintenance logs and schedule tracking",
        "⚙️ Reduce downtime and extend equipment lifespan",
      ],
      icon: Cog,
    },
    {
      title: "Secure Infrastructure",
      desc: "Your data and processes are protected with enterprise-grade security protocols, ensuring 99.9% uptime and compliance with global standards.",
      details: [
        "🔒 256-bit SSL data encryption",
        "🧱 Firewall and intrusion detection systems",
        "🛡️ Secure APIs for integration with third-party tools",
        "⏱️ High-availability architecture with load balancing",
      ],
      icon: ShieldCheck,
    },
  ];

  return (
    <section
      id="services"
      className="relative w-full min-h-[100vh] bg-gradient-to-br from-blue-50 to-white py-24 px-6"
    >
      {/* Background Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        className="absolute w-[400px] h-[400px] bg-blue-300 rounded-full blur-3xl -top-20 -left-10"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        className="absolute w-[350px] h-[350px] bg-blue-200 rounded-full blur-3xl bottom-10 right-0"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold text-blue-900 text-center"
        >
          Our Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-blue-600 text-center max-w-3xl mx-auto mt-4 text-lg leading-relaxed"
        >
          We deliver a complete suite of intelligent manufacturing solutions — from
          automation and analytics to real-time production visibility — all designed
          to scale your operations effortlessly.
        </motion.p>

        {/* Cards */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 mt-16">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="group bg-white/80 border border-blue-200 backdrop-blur-xl p-8 rounded-3xl shadow-xl cursor-pointer 
              hover:shadow-2xl transition-all duration-300 hover:bg-white"
            >
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl bg-blue-100 flex justify-center items-center mb-6 
                group-hover:bg-blue-200 transition-all duration-300"
              >
                <service.icon className="text-blue-700 w-8 h-8" />
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold text-blue-900 mb-3">
                {service.title}
              </h3>
              <p className="text-blue-600 mb-4 leading-relaxed">{service.desc}</p>

              {/* Bullet List */}
              <ul className="space-y-2 text-blue-700 text-sm pl-2">
                {service.details.map((point, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    className="flex items-start gap-2"
                  >
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Bottom Accent Line */}
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                viewport={{ once: true }}
                className="h-1 bg-blue-600 rounded-full mt-6"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
