import React, { useState } from "react";
import Navbar from "../../components/user/Header/Navbar";
import SearchBar from "../../components/user/SearchBar";
import Card from "../../components/user/cards/cardsList";
import Footer from "../../components/user/Footer/footer";

const Book: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Navbar />
      <SearchBar onSearch={setSearchQuery} />
      <Card searchQuery={searchQuery} />
      <Footer />
    </>
  );
}

export default Book;
