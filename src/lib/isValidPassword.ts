export async function isValidPassword(password: string, adminPassword: string) {
  return (await hashed(password)) === (await hashed(adminPassword));
}

async function hashed(password: string) {
  const arrayBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(password)
  );
  return Buffer.from(arrayBuffer).toString("base64");
}
