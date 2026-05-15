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
    desc: "Feuilles de manioc déjà nettoyées, pilées et assaisonnées. Prêtes à cuisiner. Commande 24h à l’avance obligatoire.",
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
  const [paiement, setPaiement] = useState("");

  const whatsappLink =
    `https://wa.me/243970226689?text=${encodeURIComponent(
      `Bonjour Saveurs de chez nous 🌿

Je souhaite passer une commande.

Produit :
Quantité :
Date souhaitée :
Adresse :
Moyen de paiement choisi : ${paiement}

Je vais effectuer le paiement et envoyer la preuve de transaction.

Merci.`
    )}`;

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
                  Des produits locaux congolais, frais, propres et préparés
                  avec soin pour vous faire gagner du temps en cuisine.
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
            </section>
          )}

          {screen === "produits" && (
            <section className="space">
              <h2>Nos produits</h2>

              {products.map((p, index) => (
                <div className="productCard" key={index}>
                  <div className="emoji">{p.emoji}</div>
                  <div>
                    <h3>{p.name}</h3>
                    <strong>{p.price}</strong>
                    <p>{p.desc}</p>
                    <small>{p.note}</small>
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
              <input type="date" placeholder="Date souhaitée" />

              <select
                value={paiement}
                onChange={(e) => setPaiement(e.target.value)}
                required
              >
                <option value="">Mode de paiement</option>
                <option value="Airtel Money">Airtel Money</option>
                <option value="M-Pesa">M-Pesa</option>
              </select>

              {paiement === "Airtel Money" && (
                <p className="greenBox">
                  Numéro Airtel Money : <strong>+243991787177</strong>
                </p>
              )}

              {paiement === "M-Pesa" && (
                <p className="payBox orange">
                  Numéro M-Pesa : <strong>0824809200</strong>
                </p>
              )}

              <textarea placeholder="Adresse de livraison ou précision"></textarea>

              <p className="smallText">
                Votre commande sera confirmée uniquement après paiement et envoi
                de la preuve sur WhatsApp.
              </p>

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
                  Saveurs de chez nous valorise les produits locaux congolais à
                  travers une transformation propre, moderne et authentique.
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
