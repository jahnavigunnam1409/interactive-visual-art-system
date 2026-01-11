import { artworks } from "./artworks.js";
import { createFragments } from "./fragments.js";
import { sendEvent } from "./interactions.js";

const sessionId = crypto.randomUUID();
sessionStorage.setItem("sessionId", sessionId);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleArray(artworks);

const landingPage = document.getElementById("landing-page");
const artworkPage = document.getElementById("artwork-page");
const interactionZone = document.getElementById("interaction-zone");

const artworkList = document.getElementById("artwork-list");
const artworkTitle = document.getElementById("artwork-title");
const artworkIntro = document.getElementById("artwork-intro");
const artworkDescription = document.getElementById("artwork-description");

sendEvent({
  sessionId,
  eventType: "PAGE_VIEW",
  timestamp: new Date().toISOString()
});

artworks.forEach((artwork) => {
  const artworkItem = document.createElement("div");
  artworkItem.className = "artwork-item";

  const img = document.createElement("img");
  img.src = artwork.image;
  img.alt = artwork.title;

  const title = document.createElement("p");
  title.textContent = artwork.title;

  artworkItem.appendChild(img);
  artworkItem.appendChild(title);

  artworkItem.addEventListener("click", () => {
    sendEvent({
      sessionId,
      eventType: "ART_SELECT",
      artworkId: artwork.id,
      timestamp: new Date().toISOString()
    });
    openArtwork(artwork);
  });

  artworkList.appendChild(artworkItem);
});

function openArtwork(artwork) {
  landingPage.style.display = "none";
  artworkPage.style.display = "flex";

  artworkTitle.textContent = artwork.title;
  artworkIntro.textContent = artwork.intro;
  artworkDescription.textContent = artwork.description;

  interactionZone.innerHTML = "";

  const fragmentCount = 12;
  const fragments = createFragments(artwork.id, fragmentCount);

  const cols = Math.ceil(Math.sqrt(fragmentCount));
  const rows = Math.ceil(fragmentCount / cols);

  fragments.forEach((fragment, index) => {
    const fragDiv = document.createElement("div");
    fragDiv.className = "fragment";

    fragDiv.style.backgroundImage = `url(${artwork.image})`;

    const col = index % cols;
    const row = Math.floor(index / cols);

    const xPercent = cols > 1 ? (col / (cols - 1)) * 100 : 0;
    const yPercent = rows > 1 ? (row / (rows - 1)) * 100 : 0;

    fragDiv.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
    fragDiv.style.backgroundSize = `${cols * 100}% ${rows * 100}%`;

    fragDiv.style.left = Math.random() * 80 + "%";
    fragDiv.style.top = Math.random() * 80 + "%";

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    fragDiv.addEventListener("click", (event) => {
      sendEvent({
        sessionId,
        eventType: "FRAGMENT_CLICK",
        artworkId: artwork.id,
        fragmentId: fragment.id,
        x: event.clientX,
        y: event.clientY,
        timestamp: new Date().toISOString()
      });
    });

    fragDiv.addEventListener("mousedown", (event) => {
      isDragging = true;
      offsetX = event.offsetX;
      offsetY = event.offsetY;

      sendEvent({
        sessionId,
        eventType: "FRAGMENT_DRAG_START",
        artworkId: artwork.id,
        fragmentId: fragment.id,
        x: event.clientX,
        y: event.clientY,
        timestamp: new Date().toISOString()
      });
    });

    document.addEventListener("mousemove", (event) => {
      if (!isDragging) return;
      fragDiv.style.left = event.clientX - offsetX + "px";
      fragDiv.style.top = event.clientY - offsetY + "px";
    });

    document.addEventListener("mouseup", (event) => {
      if (!isDragging) return;
      isDragging = false;

      sendEvent({
        sessionId,
        eventType: "FRAGMENT_DROP",
        artworkId: artwork.id,
        fragmentId: fragment.id,
        x: event.clientX,
        y: event.clientY,
        timestamp: new Date().toISOString()
      });
    });

    interactionZone.appendChild(fragDiv);
  });
}

window.addEventListener("beforeunload", () => {
  sendEvent({
    sessionId,
    eventType: "SESSION_END",
    timestamp: new Date().toISOString()
  });
});
