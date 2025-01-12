export async function fetchChars() {
    const response = await fetch(
        `https://rickandmortyapi.com/api/character`
    );
    const result = await response.json();
    return result;
}
