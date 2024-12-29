import { BookData } from "@/types";

export default async function fetechRandomBooks(): Promise<BookData[]> {
  const url = `https://onebite-books-server-eight-alpha.vercel.app/book/random`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error();
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
