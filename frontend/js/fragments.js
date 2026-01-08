// STEP 16: Fragment generation logic

export function createFragments(artworkId, fragmentCount) {
  return Array.from({ length: fragmentCount }, (_, index) => ({
    id: `${artworkId}_frag_${index + 1}`
  }));
}
