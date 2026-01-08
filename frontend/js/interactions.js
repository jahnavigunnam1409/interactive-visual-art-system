// STEP 20: Interaction logging helper

const API_URL = "http://localhost:8080/api/interaction/log";

export function sendEvent(eventData) {
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(eventData)
  }).catch((error) => {
    console.error("Failed to send interaction:", error);
  });
}
