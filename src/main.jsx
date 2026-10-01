import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const menuItems = [
  { id: "car", title: "Mein Auto", subtitle: "Fahrzeug & Details", color: "red", icon: "car", side: "right" },
  { id: "repairs", title: "Reparaturen", subtitle: "Reparaturen verwalten", color: "blue", icon: "wrench", side: "right" },
  { id: "inspection", title: "Pickerl/TÜV", subtitle: "Termine & Fristen", color: "green", icon: "clock", side: "right" },
  { id: "maintenance", title: "Wartungen", subtitle: "Verschiedenes", color: "orange", icon: "tools", side: "left" },
  { id: "overview", title: "Gesamtblick", subtitle: "Die wichtigsten Infos", color: "purple", icon: "document", side: "left" },
  { id: "tires", title: "Reifen", subtitle: "Größen, Dimensionen und Alter", color: "teal", icon: "tire", side: "left" }
];

function Icon({ type }) {
  const common = { viewBox: "0 0 64 64", fill: "none", xmlns: "http://www.w3.org/2000/svg" };
  if (type === "car") return <svg {...common}><path d="M13 38l4-14c1-4 4-6 8-6h14c4 0 7 2 8 6l4 14v9H13v-9Z" stroke="currentColor" strokeWidth="4"/><path d="M18 29h28M20 47v5M44 47v5" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/><circle cx="21" cy="41" r="3" fill="currentColor"/><circle cx="43" cy="41" r="3" fill="currentColor"/></svg>;
  if (type === "wrench") return <svg {...common}><path d="M42 12a13 13 0 0 0-10 20L15 49a5 5 0 0 0 7 7l17-17a13 13 0 0 0 13-10l-8 5-7-7 5-8-0-0Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/></svg>;
  if (type === "clock") return <svg {...common}><circle cx="32" cy="32" r="21" stroke="currentColor" strokeWidth="4"/><path d="M32 18v14l9 6M32 8v5M32 51v5M8 32h5M51 32h5" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>;
  if (type === "tools") return <svg {...common}><path d="M39 12a11 11 0 0 0-9 16L14 44a5 5 0 1 0 7 7l16-16a11 11 0 0 0 15-14l-8 5-7-7 2-7Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/><path d="m35 35 7 7" stroke="currentColor" strokeWidth="4"/></svg>;
  if (type === "document") return <svg {...common}><rect x="17" y="9" width="30" height="46" rx="3" stroke="currentColor" strokeWidth="4"/><path d="M25 23h14M25 32h14M25 41h9" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>;
  return <svg {...common}><path d="M13 20h9l4-5h13l5 5h7l2 9v16H9V29l4-9Z" stroke="currentColor" strokeWidth="4"/><circle cx="21" cy="37" r="7" stroke="currentColor" strokeWidth="4"/><circle cx="43" cy="37" r="7" stroke="currentColor" strokeWidth="4"/><path d="M28 37h8" stroke="currentColor" strokeWidth="4"/></svg>;
}

function App() {
  const [selected, setSelected] = useState(null);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroDone(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="dashboard">
        <header className="topbar">
          <span className="brand-mini">AUTO CHECK</span>
          <span className="status-dot" />
        </header>

        <section className="hero" aria-label="AUTO CHECK Hauptbereich">
          <div className="hero-image" />
          <div className="hero-vignette" />
          <div className="garage-light light-left" />
          <div className="garage-light light-right" />

          <div className={`logo-overlay ${introDone ? "logo-settled" : ""}`}>
            <img src="/assets/auto-check-logo.png" alt="AUTO CHECK" className="logo-image" />
          </div>
        </section>

        <section className="menu-grid" aria-label="Hauptmenü">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              className={`menu-card tone-${item.color} enter-${item.side}`}
              style={{ "--delay": `${index * 90}ms` }}
              onClick={() => setSelected(item)}
              aria-label={item.title}
            >
              <span className="icon-orb"><Icon type={item.icon} /></span>
              <span className="card-copy">
                <span className="card-title">{item.title}</span>
                <span className="card-subtitle">{item.subtitle}</span>
              </span>
              <span className="arrow">›</span>
            </button>
          ))}
        </section>

        <footer className="footer-mark">Created by D.M. · Verliere nicht die Übersicht</footer>
      </section>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <section className={`detail-panel tone-${selected.color}`} onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelected(null)} aria-label="Schließen">×</button>
            <span className="detail-icon"><Icon type={selected.icon} /></span>
            <p className="eyebrow">AUTO CHECK</p>
            <h2>{selected.title}</h2>
            <p>{selected.subtitle}</p>
            <div className="coming-soon">Untermenü vorbereitet</div>
          </section>
        </div>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
