import React, { useState } from "react";
import { Home, Leaf, ShoppingBag, CreditCard, Phone } from "lucide-react";

export default function App() {
  const [page, setPage] = useState("commander");

  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [produit, setProduit] = useState("");
  const [quantite, setQuantite] = useState("");
  const [dateCommande, setDateCommande] = useState("");
  const [paiement, setPaiement] = useState("");

  const numeroWhatsApp = "243970226689";
  const numeroAirtel = "+243991787177";
  const numeroMpesa = "0824809200";

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwFyjUpHDL4VnvW5CNH5oyXPwGGhE54zhLmllWuXaQzTs8HmwtINVZgxYtUzDfdAsA/exec";

  const aujourdHui = new Date().toISOString().split("T")[0];

  const envoyerCommande = async () => {
    if (
      !nom ||
      !telephone ||
      !adresse ||
      !produit ||
      !quantite ||
      !dateCommande ||
      !paiement
    ) {
      alert("Veuillez remplir tous les champs obligatoires avant de continuer.");
      return;
    }

    const commande = {
      nom,
      telephone,
      adresse,
      produit,
      quantite,
      dateCommande,
      paiement,
      observation: "",
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commande),
      });
    } catch (error) {
      console.log("Erreur Google Sheets :", error);
    }

    const message = `
Bonjour Saveurs de chez nous,

Je souhaite passer une commande :

Nom : ${nom}
Téléphone : ${telephone}
Adresse de livraison : ${adresse}
Produit : ${produit}
Quantité : ${quantite}
Date souhaitée : ${dateCommande}
Mode de paiement : ${paiement}

Merci.
`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#fffaf0] text-[#3b2f22] pb-24">
      <header className="bg-[#0b4b2b] text-white text-center py-6 px-4 rounded-b-3xl shadow-md">
        <h1 className="text-2xl font-bold">Saveurs de chez nous</h1>
        <p className="text-sm mt-1">Le goût authentique de chez nous 🇨🇩🌿</p>
      </header>

      <main className="px-5 py-6">
        {page === "accueil" && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0b4b2b]">Bienvenue</h2>
            <p>
              Saveurs de chez nous valorise les produits locaux congolais avec
              fraîcheur, hygiène et authenticité.
            </p>
          </section>
        )}

        {page === "produits" && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0b4b2b]">Nos produits</h2>

            <div className="bg-white rounded-3xl p-5 shadow border border-[#ead8aa]">
              <h3 className="font-bold text-lg">Sombé ya Léo</h3>
              <p className="text-sm mt-2">
                Sombé frais du jour, préparé avec soin.
              </p>
              <p className="text-sm mt-2 text-[#0b4b2b] font-semibold">
                Vente en grammes et kilogrammes.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow border border-[#ead8aa]">
              <h3 className="font-bold text-lg">Riz pilau</h3>
              <p className="text-sm mt-2">Riz pilau savoureux, fait maison.</p>
              <p className="text-sm mt-2 text-[#0b4b2b] font-semibold">
                Vente par plat.
              </p>
            </div>
          </section>
        )}

        {page === "commander" && (
          <section className="space-y-5">
            <div className="bg-[#fff3dc] rounded-3xl p-5 text-sm">
              <p>Commande 24h à l’avance obligatoire.</p>
              <p className="font-semibold mt-2">
                La commande est confirmée après paiement total.
              </p>
            </div>

            <input
              type="text"
              placeholder="Votre nom *"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full rounded-2xl border border-[#d6c28f] px-4 py-4 text-lg outline-none focus:border-[#0b4b2b]"
            />

            <input
              type="tel"
              placeholder="Votre téléphone *"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="w-full rounded-2xl border border-[#d6c28f] px-4 py-4 text-lg outline-none focus:border-[#0b4b2b]"
            />

            <input
              type="text"
              placeholder="Adresse de livraison *"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              className="w-full rounded-2xl border border-[#d6c28f] px-4 py-4 text-lg outline-none focus:border-[#0b4b2b]"
            />

            <select
              value={produit}
              onChange={(e) => {
                setProduit(e.target.value);
                setQuantite("");
              }}
              className="w-full rounded-2xl border border-[#d6c28f] px-4 py-4 text-lg outline-none focus:border-[#0b4b2b] bg-white"
            >
              <option value="">Choisissez le produit *</option>
              <option value="Sombé ya Léo">Sombé ya Léo</option>
              <option value="Riz pilau">Riz pilau</option>
            </select>

            <select
              value={quantite}
              onChange={(e) => setQuantite(e.target.value)}
              disabled={!produit}
              className="w-full rounded-2xl border border-[#d6c28f] px-4 py-4 text-lg outline-none focus:border-[#0b4b2b] bg-white"
            >
              <option value="">Choisissez la quantité *</option>

              {produit === "Sombé ya Léo" && (
                <>
                  <option value="500 g">500 g</option>
                  <option value="1 kg">1 kg</option>
                  <option value="1,5 kg">1,5 kg</option>
                  <option value="2 kg">2 kg</option>
                  <option value="3 kg">3 kg</option>
                </>
              )}

              {produit === "Riz pilau" && (
                <>
                  <option value="1 plat">1 plat</option>
                  <option value="2 plats">2 plats</option>
                  <option value="3 plats">3 plats</option>
                  <option value="4 plats">4 plats</option>
                  <option value="5 plats">5 plats</option>
                </>
              )}
            </select>

            <input
              type="date"
              min={aujourdHui}
              value={dateCommande}
              onChange={(e) => setDateCommande(e.target.value)}
              className="w-full rounded-2xl border border-[#d6c28f] px-4 py-4 text-lg outline-none focus:border-[#0b4b2b]"
            />

            <select
              value={paiement}
              onChange={(e) => setPaiement(e.target.value)}
              className="w-full rounded-2xl border border-[#d6c28f] px-4 py-4 text-lg outline-none focus:border-[#0b4b2b] bg-white"
            >
              <option value="">Choisissez le paiement *</option>
              <option value="Airtel Money">Airtel Money</option>
              <option value="M-Pesa">M-Pesa</option>
            </select>

            {paiement === "Airtel Money" && (
              <div className="bg-[#eefaf1] rounded-3xl p-5">
                <p>Numéro Airtel Money :</p>
                <p className="font-bold text-xl mt-2">{numeroAirtel}</p>
              </div>
            )}

            {paiement === "M-Pesa" && (
              <div className="bg-[#eefaf1] rounded-3xl p-5">
                <p>Numéro M-Pesa :</p>
                <p className="font-bold text-xl mt-2">{numeroMpesa}</p>
              </div>
            )}

            <button
              onClick={envoyerCommande}
              className="w-full bg-[#0b4b2b] text-white py-4 rounded-2xl text-lg font-bold shadow-md"
            >
              Confirmer la commande sur WhatsApp
            </button>
          </section>
        )}

        {page === "paiement" && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0b4b2b]">Paiement</h2>

            <div className="bg-white rounded-3xl p-5 shadow border border-[#ead8aa]">
              <p>Airtel Money :</p>
              <p className="font-bold text-xl">{numeroAirtel}</p>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow border border-[#ead8aa]">
              <p>M-Pesa :</p>
              <p className="font-bold text-xl">{numeroMpesa}</p>
            </div>
          </section>
        )}

        {page === "contact" && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0b4b2b]">Contact</h2>
            <p>WhatsApp : +243970226689</p>
            <p>Airtel Money : {numeroAirtel}</p>
            <p>M-Pesa : {numeroMpesa}</p>
          </section>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#ead8aa] flex justify-around py-3">
        <button
          onClick={() => setPage("accueil")}
          className="flex flex-col items-center text-xs"
        >
          <Home size={24} />
          Accueil
        </button>

        <button
          onClick={() => setPage("produits")}
          className="flex flex-col items-center text-xs"
        >
          <Leaf size={24} />
          Produits
        </button>

        <button
          onClick={() => setPage("commander")}
          className="flex flex-col items-center text-xs bg-[#0b4b2b] text-white px-5 py-2 rounded-2xl"
        >
          <ShoppingBag size={24} />
          Commander
        </button>

        <button
          onClick={() => setPage("paiement")}
          className="flex flex-col items-center text-xs"
        >
          <CreditCard size={24} />
          Paiement
        </button>

        <button
          onClick={() => setPage("contact")}
          className="flex flex-col items-center text-xs"
        >
          <Phone size={24} />
          Contact
        </button>
      </nav>
    </div>
  );
}
