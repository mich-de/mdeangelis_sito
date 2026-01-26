Design System: Palette Colori "Abstract Geometric Dark"
Documentazione della palette colori derivata dal design geometrico astratto su sfondo scuro.Temi principali: Grigio Tech, Arancione Vivace, Bianco Puro.

Tabella Colori
Nome Colore	Variabile CSS	Hex Code	Descrizione
Deep Charcoal	--bg-primary	#111216	Sfondo principale del sito (Dark Mode).
Grigio Base	--gray-primary	#A0A0A0	Elementi neutrali, testi secondari.
Argento Chiaro	--gray-light	#D6D6D6	Riflessi, bordi attivi e highlights.
Slate Scuro	--gray-dark	#4A4F55	Linee di profondità, ombre interne.
Arancione Vivace	--color-primary	#FF9F1C	Colore primario (CTA, link, figure principali).
Albicocca Chiaro	--color-highlight	#FFBF69	Accenti luminosi, glow, stati hover.
Ambra Scura	--color-shade	#B87611	Ombre, elementi passivi o retro.
Arancione Intenso	--color-accent	#FF6B00	Punti focali, notifiche, dettagli piccoli.
Bianco Puro	--white-primary	#FFFFFF	Titoli, testo principale, figure chiave.
Grigio Chiaro	--white-muted	#B0B0B0	Dettagli secondari, placeholder.
Implementazione CSS
Per utilizzare questa palette nel tuo progetto, definisci le seguenti variabili nel tuo file CSS o SCSS.

:root {  /* --- SFONDO --- */  --bg-primary: #111216;  /* --- GRIGIO (SINISTRA) --- */  --gray-primary: #A0A0A0;  --gray-light:   #D6D6D6;  --gray-dark:    #4A4F55;  /* --- ARANCIONE (CENTRO) --- */  --color-primary:   #FF9F1C;  --color-highlight: #FFBF69;  --color-shade:     #B87611;  --color-accent:    #FF6B00;  /* --- BIANCO (DESTRA) --- */  --white-primary: #FFFFFF;  --white-muted:   #B0B0B0;}/* Esempio di utilizzo */body {  background-color: var(--bg-primary);  color: var(--white-primary);}h1, h2, h3 {  color: var(--color-primary);}.button-primary {  background-color: var(--color-primary);  color: var(--bg-primary);  border: 1px solid var(--color-highlight);}.button-primary:hover {  background-color: var(--color-highlight);}
Note Accessibilità
Assicurati di verificare il contrasto tra il testo e lo sfondo (#111216).

Il testo var(--white-primary) su var(--bg-primary) ha un contrasto eccellente.
Il testo var(--gray-primary) su var(--bg-primary) è adatto per paragrafi lunghi.
L'arancione var(--color-primary) è ottimo per bottoni o icone, ma usarlo per testo su sfondo scuro potrebbe richiedere una verifica del contrasto WCAG.

## Gradienti Logo (MDEANGELIS)
Il logo testuale utilizza una combinazione specifica di gradienti:
*   **M**: Arancione Intenso (`--accent`) → Ambra Scura (`--chart-3`).
*   **DE**: Slate Scuro (`--secondary`) → Grigio Chiaro (`--muted-foreground`) → Argento Chiaro (`#D6D6D6`).
*   **ANGELIS**: Bianco Puro (`--foreground`) con *glow* bianco.

## Stile Titoli Sezione (H2)
I titoli delle sezioni (Chi Sono, Interessi, Contatti) usano un gradiente coerente con il brand:
`from-accent via-chart-1 to-chart-3` (Arancione Intenso → Arancione Vivace → Ambra Scura)

## Sfondo Sezioni
Tutte le sezioni usano `bg-background` per uniformità. La Hero section include orbs sfocati (`blur-[150px]`, `opacity: 10%`) per un leggero effetto glow che sfuma dolcemente nelle sezioni successive.

