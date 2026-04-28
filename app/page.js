"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import data from "../data/board-games.json";

export default function Home() {

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");
  const [playerCount, setPlayerCount] = useState("");
  const [publisher, setPublisher] = useState("all");
  const [descWord, setDescWord] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [expansionFilter, setExpansionFilter] = useState("all");

  const games = data.board_games;


  const uniqueCategories = useMemo(() => {
    const categories = games.map((game) => game.type);
    return ["all", ...new Set(categories)].sort();
  }, [games]);

  const uniquePublishers = useMemo(() => {
    const publishers = games.map((game) => game.publisher);
    return ["all", ...new Set(publishers)].sort();
  }, [games]);


  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = category === "all" || game.type === category;
    const matchesPrice = maxPrice === "" || game.price_pln <= parseFloat(maxPrice);
    const matchesPlayers = playerCount === "" || (game.min_players <= parseInt(playerCount, 10) && game.max_players >= parseInt(playerCount, 10));
    const matchesPublisher = publisher === "all" || game.publisher === publisher;
    const matchesDesc = descWord === "" || game.description.join(" ").toLowerCase().includes(descWord.toLowerCase());
    const matchesTime = maxTime === "" || game.avg_play_time_minutes <= parseInt(maxTime, 10);

    let matchesExpansion = true;
    if (expansionFilter === "base") {
      matchesExpansion = !game.is_expansion;
    } else if (expansionFilter === "expansion") {
      matchesExpansion = game.is_expansion;
    }

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesPlayers &&
      matchesPublisher &&
      matchesDesc &&
      matchesTime &&
      matchesExpansion
    );
  });

  return (
    <main>
      <section className="history-card filters-sidebar">
        <h2>Filtruj gry</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search-text">Nazwa gry:</label>
          <input
            type="text"
            id="search-text"
            placeholder="Np. Catan..."
            className="calc-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <label htmlFor="category">Kategoria:</label>
          <select
            id="category"
            className="calc-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "Wszystkie" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <label htmlFor="max-price">Cena do (1 - 5000 PLN):</label>
          <input
            type="number"
            id="max-price"
            min="1"
            max="5000"
            className="calc-input"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          <label htmlFor="player-count">Liczba graczy (1 - 30):</label>
          <input
            type="number"
            id="player-count"
            min="1"
            max="30"
            className="calc-input"
            placeholder="Dla ilu osób?"
            value={playerCount}
            onChange={(e) => setPlayerCount(e.target.value)}
          />

          <label htmlFor="publisher">Wydawnictwo:</label>
          <select
            id="publisher"
            className="calc-input"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          >
            {uniquePublishers.map((pub) => (
              <option key={pub} value={pub}>
                {pub === "all" ? "Wszystkie" : pub}
              </option>
            ))}
          </select>

          <label htmlFor="desc-word">Słowo w opisie:</label>
          <input
            type="text"
            id="desc-word"
            className="calc-input"
            value={descWord}
            onChange={(e) => setDescWord(e.target.value)}
          />

          <label htmlFor="max-time">Czas gry do (5 - 480 min):</label>
          <input
            type="number"
            id="max-time"
            min="5"
            max="480"
            className="calc-input"
            value={maxTime}
            onChange={(e) => setMaxTime(e.target.value)}
          />

          <label htmlFor="expansion">Rodzaj:</label>
          <select
            id="expansion"
            className="calc-input"
            value={expansionFilter}
            onChange={(e) => setExpansionFilter(e.target.value)}
          >
            <option value="all">Wszystkie</option>
            <option value="base">Tylko podstawowe</option>
            <option value="expansion">Tylko dodatki</option>
          </select>
        </form>
      </section>

      <section className="calc-card product-list">
        <h2>Dostępne pozycje ({filteredGames.length})</h2>
        <div className="products-grid">
          {filteredGames.map((game) => (
            <Link href={`/game/${game.id}`} key={game.id}>
              <div className="product-item">
                <div style={{ height: "120px", marginBottom: "1rem", overflow: "hidden", borderRadius: "8px", background: "var(--bg)" }}>
                  {game.images && game.images.length > 0 ? (
                    <img
                      src={`/${game.images[0]}`}
                      alt={game.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <div style={{ padding: "2rem", color: "var(--text-muted)", fontSize: "0.8rem" }}>Brak zdjęcia</div>
                  )}
                </div>
                <h3>{game.title}</h3>
                <p>Cena: {game.price_pln.toFixed(2)} zł</p>
                <button className="calc-button">Szczegóły</button>
              </div>
            </Link>
          ))}
          {filteredGames.length === 0 && (
            <p style={{ gridColumn: "1 / -1", textAlign: "center", padding: "2rem" }}>
              Brak gier spełniających wybrane kryteria.
            </p>
          )}
        </div>
      </section>

      <section className="history-card add-game-section">
        <h2>Dodaj nową grę</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="new-title">Tytuł:</label>
          <input type="text" id="new-title" className="calc-input" placeholder="Tytuł gry" />

          <label htmlFor="new-price">Cena:</label>
          <input type="text" id="new-price" className="calc-input" placeholder="0.00" />

          <button className="calc-button calc-button-operator">Dodaj do bazy</button>
        </form>
      </section>
    </main>
  );
}