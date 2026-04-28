import Link from "next/link";
import { notFound } from "next/navigation";
import data from "../../../data/board-games.json";


export default async function GameDetails({ params }) {

    const { id } = await params;
    const gameId = parseInt(id, 10);

    const games = data.board_games;
    const game = games.find((g) => g.id === gameId);

    if (!game) {
        notFound();
    }

    return (
        <main className="details-container">
            <section className="calc-card">
                <Link href="/" className="back-link">
                    &larr; Wróć do listy gier
                </Link>

                <h2>Szczegóły ogłoszenia</h2>
                <h3>{game.title}</h3>

                <div className="details-grid">
                    <div className="details-images">
                        {game.images && game.images.length > 0 ? (
                            game.images.map((img, index) => (
                                <div key={index} style={{ marginBottom: "1rem" }}>
                                    <img
                                        src={`/${img}`}
                                        alt={`${game.title} - zdjęcie ${index + 1}`}
                                        style={{ maxWidth: "100%", borderRadius: "8px" }}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="calc-input" style={{ textAlign: "center", padding: "2rem" }}>
                                Brak zdjęć dla tej gry
                            </div>
                        )}
                    </div>

                    <div className="details-info">
                        <p><strong>Cena:</strong> {game.price_pln.toFixed(2)} PLN</p>
                        <p><strong>Wydawca:</strong> {game.publisher}</p>
                        <p><strong>Kategoria:</strong> <span style={{ textTransform: "capitalize" }}>{game.type}</span></p>
                        <p><strong>Liczba graczy:</strong> {game.min_players} - {game.max_players}</p>
                        <p><strong>Czas gry:</strong> ok. {game.avg_play_time_minutes} min</p>
                        <p><strong>Czy to dodatek?:</strong> {game.is_expansion ? "Tak" : "Nie"}</p>

                        <button className="calc-button calc-button-equals" style={{ marginTop: "1rem" }}>
                            Kup Teraz
                        </button>
                    </div>
                </div>

                <div className="details-description">
                    <h2>Opis</h2>
                    <ul>
                        {game.description.map((line, index) => (
                            <li key={index}>{line}</li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}