import { ReactNode } from "react";
import { InferGetStaticPropsType } from "next";
import SearchableLayout from "@/components/searchable-layout";
import style from "@/styles/index.module.css";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import fetechRandomBooks from "@/lib/fetch-random-books";
import Head from "next/head";

// SSR
// export const getServerSideProps = async () => {
//   const [allBooks, recommendBooks] = await Promise.all([
//     fetchBooks(),
//     fetechRandomBooks(),
//   ]);

//   return {
//     props: { allBooks, recommendBooks },
//   };
// };

// SSG
// export const getStaticProps = async () => {
//   const [allBooks, recommendBooks] = await Promise.all([
//     fetchBooks(),
//     fetechRandomBooks(),
//   ]);

//   return {
//     props: { allBooks, recommendBooks },
//   };
// };

// ISR
export const getStaticProps = async () => {
  const [allBooks, recommendBooks] = await Promise.all([
    fetchBooks(),
    fetechRandomBooks(),
  ]);

  return {
    props: { allBooks, recommendBooks },
    // revalidate: 3,
  };
};

export default function Home({
  allBooks,
  recommendBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요"
        />
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recommendBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
