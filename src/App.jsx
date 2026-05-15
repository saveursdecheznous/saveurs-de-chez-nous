import React, { useState } from "react";
import {
  Home,
  Leaf,
  ShoppingBag,
  CreditCard,
  Phone,
  MessageCircle,
  Info,
} from "lucide-react";

const products = [
  {
    name: "Sombé ya Léo",
    price: "8 500 FC / kg",
    desc: "Feuilles de manioc déjà nettoyées, pilées et assaisonnées. Prêtes à cuisiner. Commande 24h à l’avance obligatoire pour garantir la fraîcheur.",
    emoji: "🌿",
    note: "Livraison à partir de 5 kg — frais : 5 000 FC",
  },
  {
    name: "Wali pilaü + katchumbari",
    price: "25 000 FC",
    desc: "Riz épicé à la viande, accompagné d’une salade fraîche katchumbari. Commande 24h à l’avance obligatoire.",
    emoji: "🍛",
    note: "Plat local fait maison",
  },
];

export default function App() {
  const [screen, setScreen] = useState("accueil");

  const whatsappLink =
    "https://wa.me/243970226689?text=Bonjour%20Saveurs%20de%20chez%20nous,%20je%20souhaite%20commander.%0AProduit%20:%0AQuantit%C3%A9%20:%0ADate%20souhait%C3%A9e%20:%0AAdresse%20:%0APaiement%20:%20Airtel%20Money%20/%20M-Pesa%0AJ%E2%80%99ai%20not%C3%A9%20que%20la%20commande%20se%20fait%2024h%20%C3%A0%20l%E2%80%99avance%20et%20qu%E2%80%99elle%20est%20confirm%C3%A9e%20apr%C3%A8s%20paiement%20total.";

  const nav = [
    { id: "accueil", label: "Accueil", icon: Home },
    { id: "produits", label: "Produits", icon: Leaf },
    { id: "commande", label: "Commander", icon: ShoppingBag },
    { id: "paiement", label: "Paiement", icon: CreditCard },
    { id: "contact", label: "Contact", icon: Phone },
  ];

  return (
    <div className="app">
      <div className="phone">
        <header className="header">
          <div className="logoCircle">🌿</div>
          <div>
            <h1>Saveurs de chez nous 🇨🇩🌿</h1>
            <p>Le goût authentique de chez nous</p>
          </div>
        </header>

        <main className="content">
          {screen === "accueil" && (
            <section className="space">
              <div className="card">
                <h2>Bienvenue chez Saveurs de chez nous 🇨🇩🌿</h2>
                <p>
                  Des produits locaux congolais, frais, propres et préparés avec
                  soin pour vous faire gagner du temps en cuisine.
                </p>
                <p>
                  Retrouvez le goût authentique de chez nous à travers le Sombé
                  ya Léo et nos plats locaux faits maison.
                </p>

                <div className="notice">
                  <strong>À retenir</strong>
                  <span>Commande 24h à l’avance obligatoire.</span>
                  <span>Paiement total obligatoire pour confirmer la commande.</span>
                </div>

                <a href={whatsappLink} target="_blank" rel="noreferrer">
                  <button className="mainBtn">
                    <MessageCircle size={18} />
                    Commander sur WhatsApp
                  </button>
                </a>
              </div>

              <div className="grid">
                <div className="miniCard">
                  <div>✨</div>
                  <strong>Qualité</strong>
                  <p>Produits locaux préparés avec soin</p>
                </div>
                <div className="miniCard">
                  <div>🧼</div>
                  <strong>Hygiène</strong>
                  <p>Fraîcheur et préparation propre</p>
                </div>
              </div>
            </section>
          )}

          {screen === "produits" && (
            <section className="space">
              <div>
                <h2>Nos produits</h2>
                <p className="muted">
                  Catalogue de départ. D’autres produits seront ajoutés
                  progressivement.
                </p>
              </div>

              {products.map((p) => (
                <div className="productCard" key={p.name}>
                  <div className="productEmoji">{p.emoji}</div>
                  <div>
                    <h3>{p.name}</h3>
                    <p>{p.desc}</p>
                    <div className="productBottom">
                      <strong>{p.price}</strong>
                      <span>24h à l’avance</span>
                    </div>
                    <p className="smallNote">{p.note}</p>
                  </div>
                </div>
              ))}
            </section>
          )}

          {screen === "commande" && (
            <section className="card space">
              <h2>Passer commande</h2>
              <p>
                Remplissez les informations de votre commande, puis envoyez-les
                sur WhatsApp.
              </p>

              <div className="notice">
                <strong>Conditions de commande</strong>
                <span>Commande 24h à l’avance obligatoire.</span>
                <span>Paiement total obligatoire avant confirmation.</span>
              </div>

              <input placeholder="Votre nom" />
              <input placeholder="Votre téléphone" />

              <select>
                <option>Produit souhaité</option>
                <option>Sombé ya Léo</option>
                <option>Wali pilaü + katchumbari</option>
              </select>

              <input placeholder="Quantité" />
              <input placeholder="Date souhaitée" />

              <select>
                <option>Mode de paiement</option>
                <option>Airtel Money</option>
                <option>M-Pesa</option>
              </select>

              <textarea placeholder="Adresse de livraison ou précision"></textarea>

              <a href={whatsappLink} target="_blank" rel="noreferrer">
                <button className="mainBtn">Envoyer sur WhatsApp</button>
              </a>
            </section>
          )}

          {screen === "paiement" && (
            <section className="card space">
              <h2>Paiement</h2>
              <p>Pour confirmer votre commande, le paiement total est obligatoire.</p>

              <div className="greenBox">
                <strong>Après paiement</strong>
                <span>
                  Envoyez la capture ou le numéro de transaction sur WhatsApp.
                </span>
              </div>

              <div className="payBox">
                <strong>Airtel Money</strong>
                <span>+243991787177</span>
              </div>

              <div className="payBox orange">
                <strong>M-Pesa</strong>
                <span>0824809200</span>
              </div>

              <div className="notice">
                <strong>Condition de livraison</strong>
                <span>La livraison du Sombé ya Léo se fait à partir de 5 kg.</span>
                <span>Frais de livraison : 5 000 FC.</span>
                <span>Commande 24h à l’avance obligatoire.</span>
              </div>
            </section>
          )}

          {screen === "contact" && (
            <section className="space">
              <div className="card">
                <h2>Contact</h2>
                <p>
                  Pour commander, poser une question ou confirmer votre paiement,
                  contactez-nous directement sur WhatsApp.
                </p>

                <div className="greenBox">
                  <strong>WhatsApp</strong>
                  <span>+243970226689</span>
                </div>

                <a href={whatsappLink} target="_blank" rel="noreferrer">
                  <button className="mainBtn">
                    <MessageCircle size={18} />
                    Écrire sur WhatsApp
                  </button>
                </a>
              </div>

              <div className="about">
                <h3>
                  <Info size={18} /> À propos de Saveurs de chez nous
                </h3>
                <p>
                  Saveurs de chez nous est un projet agroalimentaire congolais
                  qui valorise les produits locaux à travers une préparation
                  propre, moderne et authentique. Notre mission est d’aider les
                  familles et les personnes occupées à gagner du temps et de
                  l’énergie en cuisine, tout en conservant le goût authentique
                  des recettes de chez nous.
                </p>
              </div>
            </section>
          )}
        </main>

        <nav className="bottomNav">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setScreen(item.id)}
                className={screen === item.id ? "active" : ""}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
